function evidenciaValidaParaRelatorio(e) {
  return Boolean(e.legenda && e.rdoId && e.cicloId && e.obraId);
}

function bloquearRev00PorPendenciaCritica(qtd) {
  return qtd > 0;
}

function consolidarRelatorioMemoria({ rdos, evidencias, pendencias }) {
  const validados = rdos.filter((r) => r.statusValidacao === 'validado' || r.statusValidacao === 'validado_com_ressalva').length;
  const bloqueados = rdos.filter((r) => r.statusValidacao === 'bloqueado').length;
  const pendentes = rdos.filter((r) => r.statusValidacao === 'pendente_correcao').length;
  const fotosValidas = evidencias.filter(evidenciaValidaParaRelatorio).length;
  return {
    totalRdos: rdos.length,
    validados,
    bloqueados,
    pendentes,
    pendenciasCriticas: pendencias.filter((p) => p.severidade === 'CRITICA' && p.status !== 'RESOLVIDA').length,
    fotosValidas,
  };
}

module.exports = { evidenciaValidaParaRelatorio, bloquearRev00PorPendenciaCritica, consolidarRelatorioMemoria };
