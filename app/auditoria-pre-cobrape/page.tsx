import { PageHeader } from '@/components/page-header';
import { registrarAuditoriaPreCobrape } from '@/lib/actions';
import { bloquearRev00PorPendenciaCritica, getCicloAtivo } from '@/lib/rmeo-service';
import { prisma } from '@/lib/prisma';

const itens = ['identificacao','estrutura','rdos','fotos','intervencoes','materiais','cronograma','imrDocumentos','apendices','linguagemRastreabilidade'] as const;

export default async function AuditoriaPage() {
  const ciclo = await getCicloAtivo();
  if (!ciclo) return <div className="card">Sem ciclo ativo.</div>;

  const [auditoria, pendenciasCriticas] = await Promise.all([
    prisma.auditoriaPreCobrape.findFirst({ where: { cicloId: ciclo.id, obraId: ciclo.obraId }, orderBy: { id: 'desc' } }),
    prisma.pendencia.count({ where: { cicloId: ciclo.id, severidade: 'CRITICA', status: { not: 'RESOLVIDA' } } }),
  ]);

  const rev00Bloqueada = bloquearRev00PorPendenciaCritica(pendenciasCriticas);

  return (
    <div>
      <PageHeader title="Checklist Pré-COBRAPE" subtitle={`Ciclo ${ciclo.numeroRmeo}`} />
      <div className="card mb-3">
        <p>Pendências críticas abertas: <strong>{pendenciasCriticas}</strong></p>
        <p>Status liberação Rev00: <strong>{rev00Bloqueada ? 'BLOQUEADO' : 'LIBERADO'}</strong></p>
      </div>

      <form action={registrarAuditoriaPreCobrape} className="card grid md:grid-cols-2 gap-3">
        <input type="hidden" name="auditoriaId" value={auditoria?.id || ''} />
        <input type="hidden" name="cicloId" value={ciclo.id} />
        <input type="hidden" name="obraId" value={ciclo.obraId} />
        <input type="hidden" name="pendenciasCriticas" value={String(pendenciasCriticas)} />

        {itens.map((item) => (
          <label key={item} className="flex items-center gap-2 border-b py-2">
            <input type="checkbox" name={item} defaultChecked={Boolean(auditoria?.[item])} />
            <span className="capitalize">{item}</span>
          </label>
        ))}

        <label className="text-sm md:col-span-2">Resultado da auditoria
          <select className="input" name="resultado" defaultValue={auditoria?.resultado || 'bloqueado'}>
            <option value="aprovado_para_rev00">aprovado_para_rev00</option>
            <option value="aprovado_com_ressalvas">aprovado_com_ressalvas</option>
            <option value="bloqueado">bloqueado</option>
          </select>
        </label>

        <label className="text-sm md:col-span-2">Observações
          <textarea className="input min-h-24" name="observacoes" defaultValue={auditoria?.observacoes || ''} />
        </label>

        <button className="btn md:col-span-2" type="submit">Registrar auditoria</button>
      </form>
    </div>
  );
}
