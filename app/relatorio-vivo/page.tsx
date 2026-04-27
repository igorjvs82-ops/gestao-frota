import { PageHeader } from '@/components/page-header';
import { consolidarRelatorioVivo } from '@/lib/rmeo-service';

export default async function RelatorioVivoPage() {
  const relatorio = await consolidarRelatorioVivo();
  if (!relatorio) return <div className="card">Nenhum ciclo ativo para consolidação.</div>;

  return (
    <div>
      <PageHeader title="Relatório vivo / pré-RMEO" subtitle={`Consolidação do ciclo ${relatorio.cicloId}`} />

      <div className="grid md:grid-cols-4 gap-3">
        <div className="card"><p>Total RDOs</p><strong>{relatorio.totalRdos}</strong></div>
        <div className="card"><p>Rascunho</p><strong>{relatorio.rascunho}</strong></div>
        <div className="card"><p>Enviados D+1</p><strong>{relatorio.enviadoD1}</strong></div>
        <div className="card"><p>Validados</p><strong>{relatorio.validados}</strong></div>
        <div className="card"><p>Pendentes</p><strong>{relatorio.pendentes}</strong></div>
        <div className="card"><p>Bloqueados</p><strong>{relatorio.bloqueados}</strong></div>
        <div className="card"><p>Pendências críticas</p><strong>{relatorio.pendenciasCriticas}</strong></div>
        <div className="card"><p>Pendências altas</p><strong>{relatorio.pendenciasAltas}</strong></div>
        <div className="card"><p>Evidências pendentes</p><strong>{relatorio.evidenciasPendentes}</strong></div>
        <div className="card"><p>Fotos válidas</p><strong>{relatorio.fotosValidas}</strong></div>
        <div className="card"><p>Intervenções em andamento</p><strong>{relatorio.intervencoesEmAndamento}</strong></div>
        <div className="card"><p>Intervenções concluídas</p><strong>{relatorio.intervencoesConcluidas}</strong></div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="card">
          <h3 className="font-semibold mb-2">Atividades por data</h3>
          <ul className="text-sm list-disc pl-5">{relatorio.atividadesPorData.map((i) => <li key={i.data}>{i.data}: {i.total}</li>)}</ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Atividades por município</h3>
          <ul className="text-sm list-disc pl-5">{relatorio.atividadesPorMunicipio.map((i) => <li key={i.municipio}>{i.municipio}: {i.total}</li>)}</ul>
        </div>
      </div>

      <div className="card mt-3">
        <h3 className="font-semibold mb-2">Ocorrências por tipo</h3>
        <ul className="text-sm list-disc pl-5">{relatorio.ocorrenciasPorTipo.map((i) => <li key={i.tipo}>{i.tipo}: {i.total}</li>)}</ul>
      </div>

      <div className="card mt-3">
        <h3 className="font-semibold">Resumo preliminar</h3>
        <p className="text-sm">{relatorio.resumoPreliminar}</p>
      </div>
    </div>
  );
}
