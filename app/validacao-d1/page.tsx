import { PageHeader } from '@/components/page-header';
import { criarPendenciaRdo, validarD1 } from '@/lib/actions';
import { prisma } from '@/lib/prisma';

export default async function ValidacaoPage() {
  const rdos = await prisma.rdo.findMany({
    where: { statusValidacao: 'enviado_d1' },
    include: { ciclo: { include: { obra: true } }, municipio: true, equipe: true },
    orderBy: { dataRdo: 'desc' },
  });

  return (
    <div>
      <PageHeader title="Validação D+1" subtitle="RDOs enviados para análise" />
      <div className="space-y-3">
        {rdos.map((rdo) => (
          <div className="card" key={rdo.id}>
            <p className="font-semibold">{rdo.numeroRdo} • {rdo.ciclo.obra.nome} • {rdo.municipio.nome} • {rdo.equipe.nome}</p>
            <form action={validarD1} className="grid md:grid-cols-4 gap-2 mt-2">
              <input type="hidden" name="rdoId" value={rdo.id} />
              <select className="input" name="acao" defaultValue="aprovar">
                <option value="aprovar">aprovar</option>
                <option value="aprovar_com_ressalva">aprovar com ressalva</option>
                <option value="solicitar_correcao">solicitar correção D+2</option>
                <option value="bloquear">bloquear</option>
              </select>
              <input className="input" name="responsavelId" placeholder="responsável" defaultValue="encarregado@aplicar.com" />
              <input className="input" name="comentario" placeholder="comentário" />
              <button className="btn" type="submit">Aplicar validação</button>
            </form>

            <form action={criarPendenciaRdo} className="grid md:grid-cols-5 gap-2 mt-2">
              <input type="hidden" name="rdoId" value={rdo.id} />
              <input className="input md:col-span-2" name="descricao" placeholder="Descrição da pendência" required />
              <select className="input" name="severidade" defaultValue="MEDIA">
                <option>BAIXA</option><option>MEDIA</option><option>ALTA</option><option>CRITICA</option>
              </select>
              <input className="input" name="responsavelId" placeholder="responsável" required />
              <button className="btn" type="submit">Criar pendência</button>
            </form>
          </div>
        ))}
        {rdos.length === 0 && <div className="card">Nenhum RDO em status enviado_d1.</div>}
      </div>
    </div>
  );
}
