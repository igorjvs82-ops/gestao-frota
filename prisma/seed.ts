import { PrismaClient, RoleNome } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.auditLog.deleteMany();
  await prisma.auditoriaPreCobrape.deleteMany();
  await prisma.pendencia.deleteMany();
  await prisma.evidencia.deleteMany();
  await prisma.rdoOcorrencia.deleteMany();
  await prisma.rdoAtividade.deleteMany();
  await prisma.rdoVeiculoEquipamento.deleteMany();
  await prisma.rdoInsumo.deleteMany();
  await prisma.rdoMaoDeObra.deleteMany();
  await prisma.rdo.deleteMany();
  await prisma.planejamentoSemanal.deleteMany();
  await prisma.etapaIntervencao.deleteMany();
  await prisma.intervencao.deleteMany();
  await prisma.colaborador.deleteMany();
  await prisma.equipe.deleteMany();
  await prisma.veiculoEquipamento.deleteMany();
  await prisma.imovel.deleteMany();
  await prisma.municipio.deleteMany();
  await prisma.cicloMensal.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.obra.deleteMany();

  const roles = await Promise.all(Object.values(RoleNome).map((nome) => prisma.role.create({ data: { nome } })));

  const obra = await prisma.obra.create({
    data: {
      nome: 'AGEDOCE SUAÇUÍ',
      contrato: '03/2023',
      atoConvocatorio: '16/2022',
      lote: '04 — CH DO4 Suaçuí',
      contratante: 'AGEDOCE',
      fiscalizadora: 'COBRAPE',
      objeto: 'Restauração de paisagens e saneamento rural',
      pastaSharepoint: 'https://sharepoint.local/agedoce-suacui',
      status: 'ATIVO',
    },
  });

  const ciclo = await prisma.cicloMensal.create({
    data: {
      obraId: obra.id,
      numeroRmeo: 'RMEO-2026-04',
      periodoInicio: new Date('2026-04-01'),
      periodoFim: new Date('2026-04-30'),
      revisao: 'Rev00',
      finalidade: 'Relatório Mensal de Execução de Obras',
      status: 'ABERTO',
      dataLimiteEnvio: new Date('2026-05-05'),
    },
  });

  const municipioAguaBoa = await prisma.municipio.create({ data: { obraId: obra.id, nome: 'Água Boa', uf: 'MG' } });
  const municipioColuna = await prisma.municipio.create({ data: { obraId: obra.id, nome: 'Coluna', uf: 'MG' } });
  await prisma.municipio.create({ data: { obraId: obra.id, nome: 'Franciscópolis', uf: 'MG' } });
  await prisma.municipio.create({ data: { obraId: obra.id, nome: 'Serra Azul de Minas', uf: 'MG' } });

  const imovel1 = await prisma.imovel.create({ data: { obraId: obra.id, municipioId: municipioColuna.id, codigo: 'M193.I027', proprietario: 'Proprietário 01', status: 'ATIVO' } });
  await prisma.imovel.create({ data: { obraId: obra.id, municipioId: municipioAguaBoa.id, codigo: 'M100.I010', proprietario: 'Proprietário 02', status: 'ATIVO' } });

  const equipeColuna = await prisma.equipe.create({ data: { obraId: obra.id, nome: 'Equipe Coluna', municipioBaseId: municipioColuna.id, status: 'ATIVO' } });

  await prisma.colaborador.createMany({
    data: [
      { nome: 'Carlos Encarregado', funcao: 'Encarregado', vinculo: 'CLT', obraId: obra.id, equipeId: equipeColuna.id, status: 'ATIVO', dataInicio: new Date('2026-01-10') },
      { nome: 'Ana Técnica', funcao: 'Técnica Ambiental', vinculo: 'CLT', obraId: obra.id, equipeId: equipeColuna.id, status: 'ATIVO', dataInicio: new Date('2026-01-10') },
      { nome: 'João Servente', funcao: 'Servente', vinculo: 'CLT', obraId: obra.id, equipeId: equipeColuna.id, status: 'ATIVO', dataInicio: new Date('2026-01-10') },
    ],
  });

  const veiculo = await prisma.veiculoEquipamento.create({ data: { obraId: obra.id, tipo: 'Veículo', descricao: 'Caminhonete 4x4', placa: 'XYZ-1234', status: 'ATIVO' } });

  const tevap = await prisma.intervencao.create({ data: { grupo: 'Saneamento', tipo: 'TEVAP', descricao: 'Tanque de evapotranspiração', exigeFotos: true } });
  const etapaTevap = await prisma.etapaIntervencao.create({ data: { intervencaoId: tevap.id, nome: 'Escavação com medição', ordem: 1, exigeFoto: true, exigeMedicao: true } });
  await prisma.intervencao.create({ data: { grupo: 'Saneamento', tipo: 'Círculo de Bananeiras', descricao: 'Tratamento biológico', exigeFotos: true } });
  await prisma.intervencao.create({ data: { grupo: 'Conservação', tipo: 'Cercamento', descricao: 'Proteção de APP' } });
  await prisma.intervencao.create({ data: { grupo: 'Conservação', tipo: 'Barraginha', descricao: 'Captação de enxurrada' } });

  await Promise.all([
    ['encarregado@aplicar.com', 'Encarregado Campo', 'ENCARREGADO'],
    ['tecnico@aplicar.com', 'Técnico Ambiental', 'TECNICO_AMBIENTAL'],
    ['coordenador@aplicar.com', 'Coordenador', 'COORDENADOR'],
    ['rh@aplicar.com', 'Administrativo RH', 'ADMINISTRATIVO_RH'],
    ['planejamento@aplicar.com', 'Planejamento', 'PLANEJAMENTO'],
    ['auditor@aplicar.com', 'Auditor Interno', 'AUDITOR_INTERNO'],
    ['consulta@aplicar.com', 'Consulta', 'CONSULTA'],
  ].map(([email, nome, role]) => prisma.user.create({
    data: { email, nome, senhaHash: 'mock', obraId: obra.id, roleId: roles.find((r) => r.nome === role)!.id },
  })));

  const planejamento = await prisma.planejamentoSemanal.create({
    data: {
      cicloId: ciclo.id,
      semanaInicio: new Date('2026-04-27'),
      semanaFim: new Date('2026-05-03'),
      municipioId: municipioColuna.id,
      equipeId: equipeColuna.id,
      imovelId: imovel1.id,
      intervencaoId: tevap.id,
      etapaId: etapaTevap.id,
      encarregadoId: 'encarregado@aplicar.com',
      tecnicoId: 'tecnico@aplicar.com',
      veiculoPrevistoId: veiculo.id,
      status: 'ATIVO',
    },
  });

  await prisma.rdo.create({
    data: {
      cicloId: ciclo.id,
      planejamentoId: planejamento.id,
      numeroRdo: 'RDO-001',
      dataRdo: new Date('2026-04-28'),
      municipioId: municipioColuna.id,
      imovelId: imovel1.id,
      equipeId: equipeColuna.id,
      tecnicoId: 'tecnico@aplicar.com',
      encarregadoId: 'encarregado@aplicar.com',
      coordenadorId: 'coordenador@aplicar.com',
      turnoManha: true,
      turnoTarde: true,
      statusValidacao: 'enviado_d1',
      maoDeObra: { create: [{ funcao: 'Pedreiro', quantidade: 1 }, { funcao: 'Servente', quantidade: 2 }] },
      insumos: { create: [{ descricao: 'Areia', quantidade: 2, unidade: 'm³', origem: 'local' }] },
      veiculos: { create: [{ veiculoEquipamentoId: veiculo.id, descricao: 'Caminhonete 4x4', quantidade: 1, situacao: 'operando' }] },
      atividades: { create: [{ categoria: 'execucao', intervencaoId: tevap.id, etapaId: etapaTevap.id, descricao: 'Escavação de vala', status: 'executada' }] },
    },
  });

  const rdoValidado = await prisma.rdo.create({
    data: {
      cicloId: ciclo.id,
      numeroRdo: 'RDO-002',
      dataRdo: new Date('2026-04-29'),
      municipioId: municipioColuna.id,
      imovelId: imovel1.id,
      equipeId: equipeColuna.id,
      tecnicoId: 'tecnico@aplicar.com',
      encarregadoId: 'encarregado@aplicar.com',
      coordenadorId: 'coordenador@aplicar.com',
      turnoManha: true,
      statusValidacao: 'validado',
      maoDeObra: { create: [{ funcao: 'Pedreiro', quantidade: 1 }] },
      atividades: { create: [{ categoria: 'execucao', intervencaoId: tevap.id, etapaId: etapaTevap.id, descricao: 'Instalação de tubulação', status: 'executada' }] },
      ocorrencias: { create: [{ tipo: 'registro', evento: 'Sem ocorrências relevantes', causa: 'N/A', impacto: 'N/A', providencia: 'N/A', severidade: 'BAIXA' }] },
    },
  });

  await prisma.evidencia.createMany({
    data: [
      {
        rdoId: rdoValidado.id,
        cicloId: ciclo.id,
        obraId: obra.id,
        municipioId: municipioColuna.id,
        imovelId: imovel1.id,
        intervencaoId: tevap.id,
        etapaId: etapaTevap.id,
        tipoEvidencia: 'foto',
        arquivoLink: '/evidencias/tevap-01.jpg',
        nomeArquivo: 'tevap-01.jpg',
        dataHora: new Date('2026-04-29T10:00:00Z'),
        medicaoVisivel: true,
        legenda: 'Escavação e medição inicial.',
        statusValidacao: 'validado',
      },
      {
        cicloId: ciclo.id,
        obraId: obra.id,
        tipoEvidencia: 'foto',
        arquivoLink: '/evidencias/sem-legenda.jpg',
        nomeArquivo: 'sem-legenda.jpg',
        dataHora: new Date('2026-04-29T11:00:00Z'),
        statusValidacao: 'enviado_d1',
      },
    ],
  });

  await prisma.pendencia.create({
    data: {
      obraId: obra.id,
      cicloId: ciclo.id,
      rdoId: rdoValidado.id,
      origem: 'RDO',
      origemId: rdoValidado.id,
      descricao: 'Aguardar conferência final do as-built.',
      severidade: 'CRITICA',
      responsavelId: 'coordenador@aplicar.com',
      prazo: new Date('2026-05-02'),
      status: 'ABERTA',
      impactoRmeo: true,
    },
  });

  await prisma.auditoriaPreCobrape.create({
    data: {
      obraId: obra.id,
      cicloId: ciclo.id,
      identificacao: true,
      estrutura: true,
      rdos: true,
      fotos: false,
      resultado: 'bloqueado',
      observacoes: 'Pendência crítica impede liberação da Rev00.',
    },
  });
}

main().finally(() => prisma.$disconnect());
