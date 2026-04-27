import { z } from 'zod';

export const rdoStatusValues = [
  'rascunho',
  'enviado_d1',
  'validado',
  'validado_com_ressalva',
  'pendente_correcao',
  'bloqueado',
] as const;

export const ocorrenciaSchema = z.object({
  evento: z.string().min(1),
  causa: z.string().min(1),
  impacto: z.string().min(1),
  providencia: z.string().min(1),
});

export const envioD1Schema = z.object({
  dataRdo: z.string().min(1),
  municipioId: z.string().min(1),
  equipeId: z.string().min(1),
  encarregadoId: z.string().min(1),
  tecnicoId: z.string().min(1),
  turnoManha: z.boolean(),
  turnoTarde: z.boolean(),
  turnoNoite: z.boolean(),
  maoDeObraCount: z.number().int().min(1),
  atividadeCount: z.number().int().min(0),
  ocorrenciaCount: z.number().int().min(0),
  hasAtividadeParalisada: z.boolean(),
  hasTransporteInsumo: z.boolean(),
  veiculoCount: z.number().int().min(0),
  ocorrenciasInvalidas: z.number().int().min(0),
});

export type EnvioD1Input = z.infer<typeof envioD1Schema>;

export function validarEnvioD1(input: EnvioD1Input) {
  const parsed = envioD1Schema.safeParse(input);
  if (!parsed.success) return { ok: false, motivo: 'Campos obrigatórios inválidos.' };
  if (!input.turnoManha && !input.turnoTarde && !input.turnoNoite) return { ok: false, motivo: 'RDO sem turno informado.' };
  if (input.maoDeObraCount < 1) return { ok: false, motivo: 'RDO sem mão de obra.' };
  if (input.atividadeCount < 1 && input.ocorrenciaCount < 1) return { ok: false, motivo: 'RDO sem atividade ou ocorrência.' };
  if (input.hasAtividadeParalisada && input.ocorrenciaCount < 1) return { ok: false, motivo: 'Atividade paralisada exige ocorrência.' };
  if (input.ocorrenciasInvalidas > 0) return { ok: false, motivo: 'Ocorrência sem causa/impacto/providência.' };
  if (input.hasTransporteInsumo && input.veiculoCount < 1) return { ok: false, motivo: 'Transporte de insumo exige veículo/equipamento.' };
  return { ok: true };
}

export function podeGerarPdfOficial(status: string, haPendenciaCritica: boolean) {
  if (haPendenciaCritica) return false;
  return status === 'validado' || status === 'validado_com_ressalva';
}
