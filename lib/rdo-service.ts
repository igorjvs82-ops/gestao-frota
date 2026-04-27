import { prisma } from '@/lib/prisma';
import { podeGerarPdfOficial } from '@/lib/validators';

export async function podeExibirRdoFinal(rdoId: string) {
  const rdo = await prisma.rdo.findUnique({ where: { id: rdoId } });
  if (!rdo) return false;
  const pendenciaCritica = await prisma.pendencia.count({ where: { rdoId, severidade: 'CRITICA', status: { not: 'RESOLVIDA' } } });
  return podeGerarPdfOficial(rdo.statusValidacao, pendenciaCritica > 0);
}
