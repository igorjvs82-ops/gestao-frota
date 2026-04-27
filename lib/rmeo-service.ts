import { prisma } from '@/lib/prisma';

export type RelatorioVivoData = {
  cicloId: string;
  obraNome: string;
  totalRdos: number;
  rascunho: number;
  enviadoD1: number;
  validados: number;
  pendentes: number;
  bloqueados: number;
  atividadesPorData: Array<{ data: string; total: number }>;
  atividadesPorMunicipio: Array<{ municipio: string; total: number }>;
  intervencoesEmAndamento: number;
  intervencoesConcluidas: number;
  ocorrenciasPorTipo: Array<{ tipo: string; total: number }>;
  pendenciasCriticas: number;
  pendenciasAltas: number;
  evidenciasPendentes: number;
  fotosValidas: number;
  resumoPreliminar: string;
};

export function evidenciaValidaParaRelatorio(e: { legenda?: string | null; rdoId?: string | null; cicloId?: string | null; obraId?: string | null }) {
  return Boolean(e.legenda && e.rdoId && e.cicloId && e.obraId);
}

export function bloquearRev00PorPendenciaCritica(quantidadePendenciaCritica: number) {
  return quantidadePendenciaCritica > 0;
}

export async function getCicloAtivo() {
  return prisma.cicloMensal.findFirst({ where: { status: 'ABERTO' }, include: { obra: true }, orderBy: { periodoInicio: 'desc' } });
}

export async function consolidarRelatorioVivo(cicloId?: string): Promise<RelatorioVivoData | null> {
  const ciclo = cicloId
    ? await prisma.cicloMensal.findUnique({ where: { id: cicloId }, include: { obra: true } })
    : await getCicloAtivo();

  if (!ciclo) return null;

  const rdos = await prisma.rdo.findMany({ where: { cicloId: ciclo.id }, include: { municipio: true, atividades: true, ocorrencias: true } });
  const pendencias = await prisma.pendencia.findMany({ where: { cicloId: ciclo.id } });
  const evidencias = await prisma.evidencia.findMany({ where: { cicloId: ciclo.id } });

  const totalRdos = rdos.length;
  const rascunho = rdos.filter((r) => r.statusValidacao === 'rascunho').length;
  const enviadoD1 = rdos.filter((r) => r.statusValidacao === 'enviado_d1').length;
  const validados = rdos.filter((r) => ['validado', 'validado_com_ressalva'].includes(r.statusValidacao)).length;
  const pendentes = rdos.filter((r) => r.statusValidacao === 'pendente_correcao').length;
  const bloqueados = rdos.filter((r) => r.statusValidacao === 'bloqueado').length;

  const atividadesFlat = rdos.flatMap((rdo) => rdo.atividades.map((a) => ({ data: rdo.dataRdo.toISOString().slice(0, 10), municipio: rdo.municipio.nome, status: a.status })));
  const atividadesPorData = Object.entries(atividadesFlat.reduce<Record<string, number>>((acc, a) => {
    acc[a.data] = (acc[a.data] || 0) + 1;
    return acc;
  }, {})).map(([data, total]) => ({ data, total }));

  const atividadesPorMunicipio = Object.entries(atividadesFlat.reduce<Record<string, number>>((acc, a) => {
    acc[a.municipio] = (acc[a.municipio] || 0) + 1;
    return acc;
  }, {})).map(([municipio, total]) => ({ municipio, total }));

  const intervencoesEmAndamento = atividadesFlat.filter((a) => a.status !== 'concluida').length;
  const intervencoesConcluidas = atividadesFlat.filter((a) => a.status === 'concluida').length;

  const ocorrenciasPorTipo = Object.entries(rdos.flatMap((r) => r.ocorrencias).reduce<Record<string, number>>((acc, o) => {
    acc[o.tipo] = (acc[o.tipo] || 0) + 1;
    return acc;
  }, {})).map(([tipo, total]) => ({ tipo, total }));

  const pendenciasCriticas = pendencias.filter((p) => p.severidade === 'CRITICA' && p.status !== 'RESOLVIDA').length;
  const pendenciasAltas = pendencias.filter((p) => p.severidade === 'ALTA' && p.status !== 'RESOLVIDA').length;
  const evidenciasPendentes = evidencias.filter((e) => e.statusValidacao !== 'validado').length;
  const fotosValidas = evidencias.filter(evidenciaValidaParaRelatorio).length;

  const resumoPreliminar = `Ciclo ${ciclo.numeroRmeo} com ${totalRdos} RDOs, ${validados} validados, ${pendenciasCriticas} pendências críticas e ${fotosValidas} evidências válidas.`;

  return {
    cicloId: ciclo.id,
    obraNome: ciclo.obra.nome,
    totalRdos,
    rascunho,
    enviadoD1,
    validados,
    pendentes,
    bloqueados,
    atividadesPorData,
    atividadesPorMunicipio,
    intervencoesEmAndamento,
    intervencoesConcluidas,
    ocorrenciasPorTipo,
    pendenciasCriticas,
    pendenciasAltas,
    evidenciasPendentes,
    fotosValidas,
    resumoPreliminar,
  };
}
