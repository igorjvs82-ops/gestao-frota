const test = require('node:test');
const assert = require('node:assert/strict');
const { validarEnvioD1, podeGerarPdfOficial } = require('../lib/rules');
const { evidenciaValidaParaRelatorio, bloquearRev00PorPendenciaCritica, consolidarRelatorioMemoria } = require('../lib/rmeo-rules');

const base = {
  turnoManha: true,
  turnoTarde: false,
  turnoNoite: false,
  maoDeObraCount: 1,
  atividadeCount: 1,
  ocorrenciaCount: 0,
  hasAtividadeParalisada: false,
  ocorrenciasInvalidas: 0,
  hasTransporteInsumo: false,
  veiculoCount: 0,
};

test('bloquear envio sem turno', () => {
  const result = validarEnvioD1({ ...base, turnoManha: false });
  assert.equal(result.ok, false);
});

test('bloquear envio sem mão de obra', () => {
  const result = validarEnvioD1({ ...base, maoDeObraCount: 0 });
  assert.equal(result.ok, false);
});

test('bloquear atividade paralisada sem ocorrência', () => {
  const result = validarEnvioD1({ ...base, hasAtividadeParalisada: true, ocorrenciaCount: 0 });
  assert.equal(result.ok, false);
});

test('bloquear ocorrência sem causa/impacto/providência', () => {
  const result = validarEnvioD1({ ...base, ocorrenciasInvalidas: 1, ocorrenciaCount: 1, atividadeCount: 0 });
  assert.equal(result.ok, false);
});

test('impedir PDF oficial com pendência crítica', () => {
  assert.equal(podeGerarPdfOficial('validado', true), false);
});

test('permitir PDF oficial quando RDO estiver validado', () => {
  assert.equal(podeGerarPdfOficial('validado', false), true);
});

test('consolidação do relatório vivo contabiliza totais', () => {
  const resumo = consolidarRelatorioMemoria({
    rdos: [{ statusValidacao: 'validado' }, { statusValidacao: 'bloqueado' }, { statusValidacao: 'pendente_correcao' }],
    evidencias: [{ legenda: 'ok', rdoId: '1', cicloId: 'c1', obraId: 'o1' }],
    pendencias: [{ severidade: 'CRITICA', status: 'ABERTA' }],
  });
  assert.equal(resumo.totalRdos, 3);
  assert.equal(resumo.validados, 1);
  assert.equal(resumo.bloqueados, 1);
});

test('bloqueio de Rev00 por pendência crítica', () => {
  assert.equal(bloquearRev00PorPendenciaCritica(1), true);
});

test('evidência sem legenda não é válida para relatório', () => {
  assert.equal(evidenciaValidaParaRelatorio({ rdoId: '1', cicloId: 'c1', obraId: 'o1', legenda: '' }), false);
});

test('RDO validado aparece no relatório vivo', () => {
  const resumo = consolidarRelatorioMemoria({
    rdos: [{ statusValidacao: 'validado' }],
    evidencias: [],
    pendencias: [],
  });
  assert.equal(resumo.validados, 1);
});

test('RDO bloqueado não entra como válido', () => {
  const resumo = consolidarRelatorioMemoria({
    rdos: [{ statusValidacao: 'bloqueado' }],
    evidencias: [],
    pendencias: [],
  });
  assert.equal(resumo.validados, 0);
});
