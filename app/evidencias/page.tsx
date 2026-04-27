import { PageHeader } from '@/components/page-header';
import { criarEvidencia } from '@/lib/actions';
import { prisma } from '@/lib/prisma';
import { evidenciaValidaParaRelatorio } from '@/lib/rmeo-service';

export default async function EvidenciasPage() {
  const [ciclos, obras, municipios, imoveis, intervencoes, etapas, rdos, evidencias] = await Promise.all([
    prisma.cicloMensal.findMany({ orderBy: { periodoInicio: 'desc' } }),
    prisma.obra.findMany(),
    prisma.municipio.findMany(),
    prisma.imovel.findMany(),
    prisma.intervencao.findMany(),
    prisma.etapaIntervencao.findMany(),
    prisma.rdo.findMany({ orderBy: { dataRdo: 'desc' } }),
    prisma.evidencia.findMany({ orderBy: { dataHora: 'desc' }, include: { ciclo: true, obra: true, rdo: true } }),
  ]);

  return (
    <div>
      <PageHeader title="Fotos / Evidências" subtitle="Cadastro manual por URL/caminho" />
      <form action={criarEvidencia} className="card grid md:grid-cols-3 gap-3 mb-4">
        <label className="text-sm">Ciclo<select className="input" name="cicloId" required>{ciclos.map((c) => <option key={c.id} value={c.id}>{c.numeroRmeo}</option>)}</select></label>
        <label className="text-sm">Obra<select className="input" name="obraId" required>{obras.map((o) => <option key={o.id} value={o.id}>{o.nome}</option>)}</select></label>
        <label className="text-sm">RDO<select className="input" name="rdoId"><option value="">-</option>{rdos.map((r) => <option key={r.id} value={r.id}>{r.numeroRdo}</option>)}</select></label>
        <label className="text-sm">Município<select className="input" name="municipioId"><option value="">-</option>{municipios.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}</select></label>
        <label className="text-sm">Imóvel<select className="input" name="imovelId"><option value="">-</option>{imoveis.map((i) => <option key={i.id} value={i.id}>{i.codigo}</option>)}</select></label>
        <label className="text-sm">Intervenção<select className="input" name="intervencaoId"><option value="">-</option>{intervencoes.map((i) => <option key={i.id} value={i.id}>{i.tipo}</option>)}</select></label>
        <label className="text-sm">Etapa<select className="input" name="etapaId"><option value="">-</option>{etapas.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}</select></label>
        <label className="text-sm">Tipo<input className="input" name="tipoEvidencia" defaultValue="foto" /></label>
        <label className="text-sm">Arquivo (URL/caminho)<input className="input" name="arquivoLink" required /></label>
        <label className="text-sm">Nome do arquivo<input className="input" name="nomeArquivo" required /></label>
        <label className="text-sm">Data/hora<input type="datetime-local" className="input" name="dataHora" /></label>
        <label className="text-sm">Legenda<input className="input" name="legenda" /></label>
        <label className="text-sm">Status validação<select className="input" name="statusValidacao"><option>rascunho</option><option>enviado_d1</option><option>validado</option><option>validado_com_ressalva</option><option>pendente_correcao</option><option>bloqueado</option></select></label>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" name="medicaoVisivel" /> Medição visível</label>
        <button className="btn md:col-span-3" type="submit">Cadastrar evidência</button>
      </form>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b"><th>Arquivo</th><th>Ciclo</th><th>Obra</th><th>RDO</th><th>Status</th><th>Legenda</th><th>Válida no relatório</th></tr></thead>
          <tbody>
            {evidencias.map((e) => (
              <tr key={e.id} className="border-b">
                <td>{e.nomeArquivo}</td>
                <td>{e.ciclo.numeroRmeo}</td>
                <td>{e.obra.nome}</td>
                <td>{e.rdo?.numeroRdo || '-'}</td>
                <td>{e.statusValidacao}</td>
                <td>{e.legenda || '-'}</td>
                <td>{evidenciaValidaParaRelatorio(e) ? 'sim' : 'não'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
