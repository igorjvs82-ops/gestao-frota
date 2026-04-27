export type RdoPdfData = {
  numeroRdo: string;
  executora: string;
  contrato: string;
  coordenador: string;
  lote: string;
  municipio: string;
  imovel: string;
  tecnico: string;
  encarregado: string;
  mesAno: string;
  data: string;
  inicio: string;
  termino: string;
  turnos: string;
  maoDeObra: string[];
  insumos: string[];
  equipamentos: string[];
  tarefas: string[];
  ocorrencias: string[];
  versaoFinal: boolean;
};

export function renderRdoHtml(data: RdoPdfData) {
  const selo = data.versaoFinal ? 'VERSÃO OFICIAL' : 'PRÉVIA PARA ANÁLISE';
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>RDO ${data.numeroRdo}</title>
<style>body{font-family:Arial,sans-serif;padding:24px;color:#1f2937}.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.title{text-align:center;font-weight:700;font-size:20px;margin-bottom:4px}.badge{text-align:center;font-size:12px;margin-bottom:12px}h3{margin-top:16px;border-bottom:1px solid #ddd}ul{margin:6px 0 0 16px}</style>
</head><body><div class="title">RELATÓRIO DIÁRIO DE OBRA (RDO) Nº ${data.numeroRdo}</div><div class="badge">${selo}</div>
<div class="grid"><div><b>EXECUTORA:</b> ${data.executora}</div><div><b>CONTRATO:</b> ${data.contrato}</div><div><b>COORDENADOR:</b> ${data.coordenador}</div><div><b>LOTE:</b> ${data.lote}</div><div><b>MUNICÍPIO:</b> ${data.municipio}</div><div><b>IMÓVEL:</b> ${data.imovel}</div><div><b>TÉCNICO:</b> ${data.tecnico}</div><div><b>ENCARREGADO:</b> ${data.encarregado}</div><div><b>MÊS/ANO:</b> ${data.mesAno}</div><div><b>DATA:</b> ${data.data}</div><div><b>INÍCIO:</b> ${data.inicio}</div><div><b>TÉRMINO:</b> ${data.termino}</div><div><b>MANHÃ / TARDE / NOITE:</b> ${data.turnos}</div></div>
<h3>MÃO DE OBRA</h3><ul>${data.maoDeObra.map((x) => `<li>${x}</li>`).join('') || '<li>Não informado</li>'}</ul>
<h3>INSUMOS</h3><ul>${data.insumos.map((x) => `<li>${x}</li>`).join('') || '<li>Não informado</li>'}</ul>
<h3>EQUIPAMENTOS</h3><ul>${data.equipamentos.map((x) => `<li>${x}</li>`).join('') || '<li>Não informado</li>'}</ul>
<h3>TAREFAS REALIZADAS</h3><ul>${data.tarefas.map((x) => `<li>${x}</li>`).join('') || '<li>Não informado</li>'}</ul>
<h3>OCORRÊNCIAS</h3><ul>${data.ocorrencias.map((x) => `<li>${x}</li>`).join('') || '<li>Sem registro</li>'}</ul>
<h3>ASSINATURAS</h3><div class="grid"><div>COORDENADOR: ____________________</div><div>ENCARREGADO: ____________________</div><div>TÉCNICO AMBIENTAL: ____________________</div></div>
</body></html>`;
}
