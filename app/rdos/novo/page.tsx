import { PageHeader } from '@/components/page-header';
import { criarRdoD0 } from '@/lib/actions';
import { prisma } from '@/lib/prisma';

export default async function NovoRdoPage({ searchParams }: { searchParams: Promise<{ planejamentoId?: string }> }) {
  const { planejamentoId } = await searchParams;
  const planejamento = planejamentoId
    ? await prisma.planejamentoSemanal.findUnique({ include: { ciclo: true }, where: { id: planejamentoId } })
    : null;

  const equipes = await prisma.equipe.findMany({ where: { status: 'ATIVO' } });
  const municipios = await prisma.municipio.findMany({ where: { ativo: true } });
  const imoveis = await prisma.imovel.findMany({ where: { status: 'ATIVO' } });
  const intervencoes = await prisma.intervencao.findMany({ where: { status: 'ATIVO' }, include: { etapas: true } });

  return (
    <div>
      <PageHeader title="RDO D0" subtitle="Formulário operacional diário" />
      <form action={criarRdoD0} className="space-y-4">
        <input type="hidden" name="planejamentoId" value={planejamento?.id || ''} />
        <div className="card grid md:grid-cols-3 gap-3">
          <h3 className="md:col-span-3 font-semibold">1) Identificação</h3>
          <label className="text-sm">Ciclo<input className="input" name="cicloId" defaultValue={planejamento?.cicloId} required /></label>
          <label className="text-sm">Nº RDO<input className="input" name="numeroRdo" required /></label>
          <label className="text-sm">Data<input type="date" className="input" name="dataRdo" required /></label>
        </div>

        <div className="card grid md:grid-cols-3 gap-3">
          <h3 className="md:col-span-3 font-semibold">2) Local de execução</h3>
          <label className="text-sm">Município<select className="input" name="municipioId" defaultValue={planejamento?.municipioId} required>{municipios.map((m)=><option key={m.id} value={m.id}>{m.nome}</option>)}</select></label>
          <label className="text-sm">Imóvel<select className="input" name="imovelId" defaultValue={planejamento?.imovelId || ''}>{imoveis.map((i)=><option key={i.id} value={i.id}>{i.codigo}</option>)}</select></label>
          <label className="text-sm">Equipe<select className="input" name="equipeId" defaultValue={planejamento?.equipeId} required>{equipes.map((e)=><option key={e.id} value={e.id}>{e.nome}</option>)}</select></label>
        </div>

        <div className="card grid md:grid-cols-3 gap-3">
          <h3 className="md:col-span-3 font-semibold">3) Responsáveis e turnos</h3>
          <label className="text-sm">Encarregado (id/login)<input className="input" name="encarregadoId" defaultValue={planejamento?.encarregadoId || 'encarregado@aplicar.com'} required /></label>
          <label className="text-sm">Técnico (id/login)<input className="input" name="tecnicoId" defaultValue={planejamento?.tecnicoId || 'tecnico@aplicar.com'} required /></label>
          <label className="text-sm">Coordenador (id/login)<input className="input" name="coordenadorId" defaultValue="coordenador@aplicar.com" /></label>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" name="turnoManha" /> Manhã</label>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" name="turnoTarde" /> Tarde</label>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" name="turnoNoite" /> Noite</label>
          <label className="text-sm">Clima<input className="input" name="clima" /></label>
          <label className="text-sm">Condição de acesso<input className="input" name="condicaoAcesso" /></label>
          <label className="text-sm">Intervenção<select className="input" name="intervencaoId" defaultValue={planejamento?.intervencaoId || ''}>{intervencoes.map((i)=><option key={i.id} value={i.id}>{i.tipo}</option>)}</select></label>
          <label className="text-sm md:col-span-2">Etapa<select className="input" name="etapaId" defaultValue={planejamento?.etapaId || ''}><option value="">-</option>{intervencoes.flatMap((i)=>i.etapas).map((e)=><option key={e.id} value={e.id}>{e.nome}</option>)}</select></label>
        </div>

        <div className="card grid gap-3">
          <h3 className="font-semibold">4) Recursos e produção</h3>
          <label className="text-sm">Mão de obra (1 por linha)<textarea className="input min-h-20" name="maoDeObra" placeholder="Pedreiro\nServente" required /></label>
          <label className="text-sm">Insumos (1 por linha, use palavra transporte quando aplicável)<textarea className="input min-h-20" name="insumos" placeholder="Areia\nTransporte de brita" /></label>
          <label className="text-sm">Veículos/equipamentos (1 por linha)<textarea className="input min-h-20" name="veiculos" placeholder="Caminhonete" /></label>
          <label className="text-sm">Atividades realizadas (1 por linha; use palavra paralisada quando aplicável)<textarea className="input min-h-20" name="atividades" placeholder="Escavação da vala" required /></label>
          <label className="text-sm">Ocorrências (1 por linha)<textarea className="input min-h-20" name="ocorrencias" placeholder="Chuva interrompeu etapa" /></label>
        </div>

        <button className="btn" type="submit">Salvar RDO D0</button>
      </form>
    </div>
  );
}
