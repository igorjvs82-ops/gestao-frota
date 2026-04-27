import { NextResponse } from 'next/server';
import { podeExibirRdoFinal } from '@/lib/rdo-service';
import { prisma } from '@/lib/prisma';
import { renderRdoHtml } from '@/lib/rdo-pdf-template';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rdo = await prisma.rdo.findUnique({
    where: { id },
    include: { ciclo: { include: { obra: true } }, municipio: true, imovel: true, maoDeObra: true, insumos: true, veiculos: true, atividades: true, ocorrencias: true },
  });

  if (!rdo) return new NextResponse('RDO não encontrado', { status: 404 });

  const html = renderRdoHtml({
    numeroRdo: rdo.numeroRdo,
    executora: 'Aplicar Engenharia',
    contrato: rdo.ciclo.obra.contrato,
    coordenador: rdo.coordenadorId || '-',
    lote: rdo.ciclo.obra.lote,
    municipio: rdo.municipio.nome,
    imovel: rdo.imovel?.codigo || '-',
    tecnico: rdo.tecnicoId,
    encarregado: rdo.encarregadoId,
    mesAno: `${String(rdo.dataRdo.getMonth() + 1).padStart(2, '0')}/${rdo.dataRdo.getFullYear()}`,
    data: rdo.dataRdo.toLocaleDateString('pt-BR'),
    inicio: '07:00',
    termino: '17:00',
    turnos: [rdo.turnoManha && 'Manhã', rdo.turnoTarde && 'Tarde', rdo.turnoNoite && 'Noite'].filter(Boolean).join(' / '),
    maoDeObra: rdo.maoDeObra.map((m) => `${m.funcao} (${m.quantidade})`),
    insumos: rdo.insumos.map((i) => `${i.descricao} (${i.quantidade} ${i.unidade})`),
    equipamentos: rdo.veiculos.map((v) => v.descricao),
    tarefas: rdo.atividades.map((a) => `${a.descricao} - ${a.status}`),
    ocorrencias: rdo.ocorrencias.map((o) => `${o.evento} / ${o.causa} / ${o.impacto} / ${o.providencia}`),
    versaoFinal: await podeExibirRdoFinal(rdo.id),
  });

  return new NextResponse(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}
