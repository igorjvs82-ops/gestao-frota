import { PageHeader } from '@/components/page-header';
import { bloquearRev00PorPendenciaCritica, consolidarRelatorioVivo, getCicloAtivo } from '@/lib/rmeo-service';

export default async function DashboardPage() {
  const ciclo = await getCicloAtivo();
  const relatorio = await consolidarRelatorioVivo(ciclo?.id);

  if (!ciclo || !relatorio) return <div className="card">Nenhum ciclo ativo encontrado.</div>;

  const rdosEsperados = 20;
  const rdosPreenchidos = relatorio.totalRdos;
  const percentualConsolidacao = Math.round((relatorio.validados / Math.max(relatorio.totalRdos, 1)) * 100);
  const riscoRev00 = bloquearRev00PorPendenciaCritica(relatorio.pendenciasCriticas);

  const cards = [
    ['Ciclo ativo', ciclo.numeroRmeo],
    ['RDOs esperados', String(rdosEsperados)],
    ['RDOs preenchidos', String(rdosPreenchidos)],
    ['RDOs validados', String(relatorio.validados)],
    ['Pendências críticas', String(relatorio.pendenciasCriticas)],
    ['Risco Rev00', riscoRev00 ? 'ALTO' : 'BAIXO'],
    ['Consolidação preliminar', `${percentualConsolidacao}%`],
  ];

  return (
    <div>
      <PageHeader title="Dashboard do ciclo mensal" subtitle={`Obra: ${relatorio.obraNome}`} />
      <div className="grid md:grid-cols-4 gap-3">
        {cards.map(([titulo, valor]) => (
          <div key={titulo} className="card">
            <p className="text-sm text-slate-500">{titulo}</p>
            <p className="text-2xl font-semibold">{valor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
