import { PageHeader } from '@/components/page-header';
import { marcarPendenciaResolvida } from '@/lib/actions';
import { prisma } from '@/lib/prisma';

export default async function PendenciasPage() {
  const pendencias = await prisma.pendencia.findMany({ orderBy: [{ severidade: 'desc' }, { prazo: 'asc' }] });

  return (
    <div>
      <PageHeader title="Pendências D+2" subtitle="Controle por severidade, responsável, prazo e status" />
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b"><th>Descrição</th><th>Severidade</th><th>Responsável</th><th>Prazo</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {pendencias.map((p) => (
              <tr key={p.id} className="border-b">
                <td>{p.descricao}</td>
                <td>{p.severidade}</td>
                <td>{p.responsavelId}</td>
                <td>{new Date(p.prazo).toLocaleDateString('pt-BR')}</td>
                <td>{p.status}</td>
                <td>
                  {p.status !== 'RESOLVIDA' && (
                    <form action={marcarPendenciaResolvida}>
                      <input type="hidden" name="pendenciaId" value={p.id} />
                      <button className="btn" type="submit">Marcar resolvida</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
