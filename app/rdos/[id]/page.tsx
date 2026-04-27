import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { enviarRdoParaD1 } from '@/lib/actions';
import { prisma } from '@/lib/prisma';

export default async function RdoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rdo = await prisma.rdo.findUnique({
    where: { id },
    include: { maoDeObra: true, insumos: true, veiculos: true, atividades: true, ocorrencias: true },
  });

  if (!rdo) return <div className="card">RDO não encontrado.</div>;

  async function submitD1() {
    'use server';
    await enviarRdoParaD1(id);
  }

  return (
    <div>
      <PageHeader title={`RDO ${rdo.numeroRdo}`} subtitle={`Status: ${rdo.statusValidacao}`} />
      <div className="card space-y-2">
        <p>Mão de obra: {rdo.maoDeObra.length} | Insumos: {rdo.insumos.length} | Veículos: {rdo.veiculos.length}</p>
        <p>Atividades: {rdo.atividades.length} | Ocorrências: {rdo.ocorrencias.length}</p>
        <div className="flex gap-2 flex-wrap">
          <form action={submitD1}><button className="btn" type="submit">Enviar para D+1</button></form>
          <Link href="/validacao-d1" className="btn">Validação D+1</Link>
          <Link href={`/rdo/${id}/pdf`} className="btn">Prévia PDF</Link>
        </div>
      </div>
    </div>
  );
}
