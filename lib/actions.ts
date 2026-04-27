'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { validarEnvioD1 } from '@/lib/validators';

function getLines(value: FormDataEntryValue | null) {
  return String(value || '')
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}

export async function criarRdoD0(formData: FormData) {
  const planejamentoId = String(formData.get('planejamentoId') || '');
  const cicloId = String(formData.get('cicloId') || '');
  const numeroRdo = String(formData.get('numeroRdo') || '');
  const dataRdo = String(formData.get('dataRdo') || '');
  const municipioId = String(formData.get('municipioId') || '');
  const imovelId = String(formData.get('imovelId') || '') || null;
  const equipeId = String(formData.get('equipeId') || '');
  const encarregadoId = String(formData.get('encarregadoId') || '');
  const tecnicoId = String(formData.get('tecnicoId') || '');
  const coordenadorId = String(formData.get('coordenadorId') || '') || null;
  const turnoManha = formData.get('turnoManha') === 'on';
  const turnoTarde = formData.get('turnoTarde') === 'on';
  const turnoNoite = formData.get('turnoNoite') === 'on';
  const clima = String(formData.get('clima') || '');
  const condicaoAcesso = String(formData.get('condicaoAcesso') || '');

  const maoDeObra = getLines(formData.get('maoDeObra'));
  const insumos = getLines(formData.get('insumos'));
  const veiculos = getLines(formData.get('veiculos'));
  const atividades = getLines(formData.get('atividades'));
  const ocorrencias = getLines(formData.get('ocorrencias'));

  const rdo = await prisma.rdo.create({
    data: {
      planejamentoId: planejamentoId || null,
      cicloId,
      numeroRdo,
      dataRdo: new Date(dataRdo),
      municipioId,
      imovelId,
      equipeId,
      tecnicoId,
      encarregadoId,
      coordenadorId,
      turnoManha,
      turnoTarde,
      turnoNoite,
      clima,
      condicaoAcesso,
      statusValidacao: 'rascunho',
      maoDeObra: { create: maoDeObra.map((item) => ({ funcao: item, quantidade: 1 })) },
      insumos: {
        create: insumos.map((item) => ({
          descricao: item,
          quantidade: 1,
          unidade: 'un',
          origem: item.toLowerCase().includes('transporte') ? 'transporte' : 'local',
        })),
      },
      veiculos: { create: veiculos.map((item) => ({ descricao: item, quantidade: 1, situacao: 'operando' })) },
      atividades: {
        create: atividades.map((item) => ({
          categoria: 'execucao',
          intervencaoId: String(formData.get('intervencaoId') || ''),
          etapaId: String(formData.get('etapaId') || '') || null,
          descricao: item,
          status: item.toLowerCase().includes('paralisada') ? 'paralisada' : 'executada',
        })),
      },
      ocorrencias: {
        create: ocorrencias.map((item) => ({
          tipo: 'campo',
          evento: item,
          causa: 'Informada em campo',
          impacto: 'Operacional',
          providencia: 'Tratativa pela equipe',
          severidade: 'MEDIA',
        })),
      },
    },
  });

  await prisma.auditLog.create({ data: { entidade: 'Rdo', entidadeId: rdo.id, acao: 'CRIADO_D0' } });
  redirect(`/rdos/${rdo.id}`);
}

export async function enviarRdoParaD1(rdoId: string) {
  const rdo = await prisma.rdo.findUnique({
    where: { id: rdoId },
    include: { maoDeObra: true, atividades: true, ocorrencias: true, insumos: true, veiculos: true },
  });
  if (!rdo) throw new Error('RDO não encontrado.');

  const ocorrenciasInvalidas = rdo.ocorrencias.filter((o) => !o.causa || !o.impacto || !o.providencia).length;
  const hasAtividadeParalisada = rdo.atividades.some((a) => a.status === 'paralisada');
  const hasTransporteInsumo = rdo.insumos.some((i) => i.origem.toLowerCase().includes('transporte'));

  const check = validarEnvioD1({
    dataRdo: rdo.dataRdo.toISOString(),
    municipioId: rdo.municipioId,
    equipeId: rdo.equipeId,
    encarregadoId: rdo.encarregadoId,
    tecnicoId: rdo.tecnicoId,
    turnoManha: rdo.turnoManha,
    turnoTarde: rdo.turnoTarde,
    turnoNoite: rdo.turnoNoite,
    maoDeObraCount: rdo.maoDeObra.length,
    atividadeCount: rdo.atividades.length,
    ocorrenciaCount: rdo.ocorrencias.length,
    hasAtividadeParalisada,
    hasTransporteInsumo,
    veiculoCount: rdo.veiculos.length,
    ocorrenciasInvalidas,
  });

  if (!check.ok) throw new Error(check.motivo);

  await prisma.rdo.update({ where: { id: rdoId }, data: { statusValidacao: 'enviado_d1' } });
  await prisma.auditLog.create({ data: { entidade: 'Rdo', entidadeId: rdoId, acao: 'ENVIADO_D1' } });
}

export async function validarD1(formData: FormData) {
  const rdoId = String(formData.get('rdoId'));
  const acao = String(formData.get('acao'));
  const comentario = String(formData.get('comentario') || '');
  const responsavelId = String(formData.get('responsavelId') || 'tecnico@aplicar.com');

  const statusMap: Record<string, string> = {
    aprovar: 'validado',
    aprovar_com_ressalva: 'validado_com_ressalva',
    solicitar_correcao: 'pendente_correcao',
    bloquear: 'bloqueado',
  };

  const novoStatus = statusMap[acao];
  if (!novoStatus) throw new Error('Ação inválida.');

  const rdo = await prisma.rdo.findUnique({ where: { id: rdoId } });
  if (!rdo) throw new Error('RDO não encontrado.');

  await prisma.rdo.update({ where: { id: rdoId }, data: { statusValidacao: novoStatus } });
  await prisma.auditLog.create({ data: { entidade: 'Rdo', entidadeId: rdoId, acao: `VALIDACAO_${novoStatus.toUpperCase()}`, dados: { comentario } } });

  if (acao === 'solicitar_correcao' || acao === 'bloquear') {
    await prisma.pendencia.create({
      data: {
        obraId: (await prisma.cicloMensal.findUnique({ where: { id: rdo.cicloId } }))!.obraId,
        cicloId: rdo.cicloId,
        rdoId,
        origem: 'RDO',
        origemId: rdoId,
        descricao: comentario || `Pendência criada na validação D+1 (${acao}).`,
        severidade: acao === 'bloquear' ? 'CRITICA' : 'MEDIA',
        responsavelId,
        prazo: new Date(Date.now() + 2 * 24 * 3600 * 1000),
      },
    });
  }

  redirect('/validacao-d1');
}

export async function criarPendenciaRdo(formData: FormData) {
  const rdoId = String(formData.get('rdoId'));
  const descricao = String(formData.get('descricao'));
  const severidade = String(formData.get('severidade')) as 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';
  const responsavelId = String(formData.get('responsavelId'));

  const rdo = await prisma.rdo.findUnique({ where: { id: rdoId } });
  if (!rdo) throw new Error('RDO não encontrado.');
  const ciclo = await prisma.cicloMensal.findUnique({ where: { id: rdo.cicloId } });
  if (!ciclo) throw new Error('Ciclo não encontrado.');

  await prisma.pendencia.create({
    data: {
      obraId: ciclo.obraId,
      cicloId: ciclo.id,
      rdoId,
      origem: 'RDO',
      origemId: rdoId,
      descricao,
      severidade,
      responsavelId,
      prazo: new Date(Date.now() + 2 * 24 * 3600 * 1000),
    },
  });

  await prisma.auditLog.create({ data: { entidade: 'Pendencia', entidadeId: rdoId, acao: 'CRIADA_D1' } });
  redirect('/pendencias');
}

export async function marcarPendenciaResolvida(formData: FormData) {
  const pendenciaId = String(formData.get('pendenciaId'));
  await prisma.pendencia.update({ where: { id: pendenciaId }, data: { status: 'RESOLVIDA' } });
  redirect('/pendencias');
}

export async function criarEvidencia(formData: FormData) {
  const cicloId = String(formData.get('cicloId') || '');
  const obraId = String(formData.get('obraId') || '');
  const rdoId = String(formData.get('rdoId') || '') || null;
  const municipioId = String(formData.get('municipioId') || '') || null;
  const imovelId = String(formData.get('imovelId') || '') || null;
  const intervencaoId = String(formData.get('intervencaoId') || '') || null;
  const etapaId = String(formData.get('etapaId') || '') || null;

  await prisma.evidencia.create({
    data: {
      cicloId,
      obraId,
      rdoId,
      municipioId,
      imovelId,
      intervencaoId,
      etapaId,
      tipoEvidencia: String(formData.get('tipoEvidencia') || 'foto'),
      arquivoLink: String(formData.get('arquivoLink') || ''),
      nomeArquivo: String(formData.get('nomeArquivo') || ''),
      dataHora: new Date(String(formData.get('dataHora') || new Date().toISOString())),
      medicaoVisivel: formData.get('medicaoVisivel') === 'on',
      legenda: String(formData.get('legenda') || ''),
      statusValidacao: (String(formData.get('statusValidacao') || 'enviado_d1') as 'rascunho' | 'enviado_d1' | 'validado' | 'validado_com_ressalva' | 'pendente_correcao' | 'bloqueado'),
    },
  });

  await prisma.auditLog.create({ data: { entidade: 'Evidencia', entidadeId: obraId, acao: 'CRIADA' } });
  redirect('/evidencias');
}

export async function registrarAuditoriaPreCobrape(formData: FormData) {
  const cicloId = String(formData.get('cicloId'));
  const obraId = String(formData.get('obraId'));
  const pendenciasCriticas = Number(formData.get('pendenciasCriticas') || 0);
  const resultado = String(formData.get('resultado')) as 'aprovado_para_rev00' | 'aprovado_com_ressalvas' | 'bloqueado';
  const observacoes = String(formData.get('observacoes') || '');

  const resultadoFinal = pendenciasCriticas > 0 && resultado === 'aprovado_para_rev00' ? 'bloqueado' : resultado;

  const auditoriaId = String(formData.get('auditoriaId') || '');
  const payload = {
    identificacao: formData.get('identificacao') === 'on',
    estrutura: formData.get('estrutura') === 'on',
    rdos: formData.get('rdos') === 'on',
    fotos: formData.get('fotos') === 'on',
    intervencoes: formData.get('intervencoes') === 'on',
    materiais: formData.get('materiais') === 'on',
    cronograma: formData.get('cronograma') === 'on',
    imrDocumentos: formData.get('imrDocumentos') === 'on',
    apendices: formData.get('apendices') === 'on',
    linguagemRastreabilidade: formData.get('linguagemRastreabilidade') === 'on',
    resultado: resultadoFinal,
    observacoes,
  };

  if (auditoriaId) {
    await prisma.auditoriaPreCobrape.update({
      where: { id: auditoriaId },
      data: payload,
    });
  } else {
    await prisma.auditoriaPreCobrape.create({
      data: {
        obraId,
        cicloId,
        ...payload,
      },
    });
  }

  redirect('/auditoria-pre-cobrape');
}
