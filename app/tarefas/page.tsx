import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { prisma } from '@/lib/prisma';

export default async function TarefasPage() {
  const encarregadoId = 'encarregado@aplicar.com';

  const tarefas = await prisma.planejamentoSemanal.findMany({
    where: {
      encarregadoId,
      status: 'ATIVO',
      rdos: { none: { statusValidacao: { in: ['enviado_d1', 'validado', 'validado_com_ressalva'] } } },
    },
    include: {
      ciclo: { include: { obra: true } },
      municipio: true,
      imovel: true,
      equipe: true,
      intervencao: true,
      etapa: true,
      veiculoPrevisto: true,
    },
    orderBy: { semanaInicio: 'asc' },
  });

  return (
    <div>
      <PageHeader title="Minhas tarefas do dia" subtitle="Planejamentos semanais pendentes do encarregado" />
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th>Obra</th><th>Município</th><th>Imóvel</th><th>Intervenção</th><th>Etapa</th><th>Equipe</th><th>Veículo previsto</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((t) => (
              <tr key={t.id} className="border-b">
                <td>{t.ciclo.obra.nome}</td>
                <td>{t.municipio.nome}</td>
                <td>{t.imovel?.codigo || '-'}</td>
                <td>{t.intervencao.tipo}</td>
                <td>{t.etapa?.nome || '-'}</td>
                <td>{t.equipe.nome}</td>
                <td>{t.veiculoPrevisto?.descricao || '-'}</td>
                <td>{t.status}</td>
                <td>
                  <Link className="btn" href={`/rdos/novo?planejamentoId=${t.id}`}>Iniciar RDO</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
