function validarEnvioD1(input) {
  if (!input.turnoManha && !input.turnoTarde && !input.turnoNoite) return { ok: false, motivo: 'RDO sem turno informado.' };
  if (input.maoDeObraCount < 1) return { ok: false, motivo: 'RDO sem mão de obra.' };
  if (input.atividadeCount < 1 && input.ocorrenciaCount < 1) return { ok: false, motivo: 'RDO sem atividade ou ocorrência.' };
  if (input.hasAtividadeParalisada && input.ocorrenciaCount < 1) return { ok: false, motivo: 'Atividade paralisada exige ocorrência.' };
  if (input.ocorrenciasInvalidas > 0) return { ok: false, motivo: 'Ocorrência sem causa/impacto/providência.' };
  if (input.hasTransporteInsumo && input.veiculoCount < 1) return { ok: false, motivo: 'Transporte de insumo exige veículo/equipamento.' };
  return { ok: true };
}

function podeGerarPdfOficial(status, haPendenciaCritica) {
  if (haPendenciaCritica) return false;
  return status === 'validado' || status === 'validado_com_ressalva';
}

module.exports = { validarEnvioD1, podeGerarPdfOficial };
