export type StudyMode =
  | "DEVOTIONAL"
  | "DAILY_STUDY"
  | "SMALL_GROUP"
  | "EXPOSITORY_SERMON"
  | "DOCTRINAL_STUDY";

export interface TheologicalValidationResult {
  status: "APPROVED" | "APPROVED_WITH_WARNINGS" | "REQUIRES_REWRITE";
  warnings: string[];
  failures: string[];
}

export const HERMENEUTIC_PRINCIPLES = [
  "Sola Scriptura funcional",
  "Sentido histórico-gramatical",
  "Leitura canônica",
  "Progressão da revelação",
  "Aplicação derivada da interpretação"
] as const;

export const EXEGETICAL_PRINCIPLES = [
  "Delimitar perícope e gênero",
  "Identificar estrutura textual",
  "Mapear termos-chave",
  "Distinguir observação/interpretação/doutrina/aplicação",
  "Sintetizar ideia exegética em uma sentença"
] as const;

export const DOCTRINAL_GUARDRAILS = {
  required: [
    "Alta visão das Escrituras",
    "Centralidade do evangelho",
    "Cristocentrismo orgânico",
    "Ênfase em arrependimento, fé, graça e santificação"
  ],
  forbidden: [
    "Prosperidade como promessa normativa",
    "Triunfalismo sem cruz",
    "Alegoria arbitrária",
    "Sensacionalismo espiritual",
    "Manipulação emocional",
    "Afirmações históricas não verificáveis"
  ]
} as const;

export const TOPIC_TAXONOMY = [
  "Deus e atributos",
  "Cristo e obra redentora",
  "Espírito Santo e vida cristã",
  "Pecado e queda",
  "Graça e salvação",
  "Santificação",
  "Oração e devoção",
  "Igreja local",
  "Discipulado",
  "Missão e evangelização",
  "Sofrimento e esperança",
  "Família e relacionamentos",
  "Trabalho, vocação e ética"
] as const;

export const DOCTRINE_TAXONOMY = [
  "Bibliologia",
  "Teologia própria",
  "Cristologia",
  "Pneumatologia",
  "Antropologia bíblica",
  "Hamartiologia",
  "Soteriologia",
  "Eclesiologia",
  "Escatologia",
  "Sacramentos/ordenanças",
  "Providência",
  "Aliança"
] as const;

export const PASTORAL_APPLICATION_TAXONOMY = [
  "Arrependimento prático",
  "Consolação em sofrimento",
  "Reconciliação relacional",
  "Disciplina espiritual",
  "Integridade no trabalho",
  "Hospitalidade e serviço",
  "Missão pessoal",
  "Vida comunitária",
  "Generosidade",
  "Perseverança na provação"
] as const;

export const AUDIENCE_TAXONOMY = [
  "novos_convertidos",
  "jovens",
  "casais",
  "lideres_pequeno_grupo",
  "professores_ebd",
  "pastores_pregadores",
  "igreja_geral",
  "pessoas_em_crise"
] as const;

export const VALID_CHRISTOCENTRIC_PATTERNS = [
  "cumprimento_canonico",
  "obra_redentora_de_cristo",
  "uniao_com_cristo",
  "chamado_a_fe_e_arrependimento"
] as const;

export const INVALID_SPIRITUALIZATION_PATTERNS = [
  "alegoria_arbitraria",
  "motivacionalismo_sem_evangelho",
  "forcar_cristo_em_detalhes",
  "ignorar_contexto_original"
] as const;

const FORBIDDEN_TONE_PATTERNS = [
  /milagre financeiro imediato/i,
  /vit[oó]ria garantida hoje/i,
  /determine sua bênção/i,
  /deus te deve/i
];

export const validateTheologicalTone = (content: string): string[] => {
  const warnings: string[] = [];

  for (const pattern of FORBIDDEN_TONE_PATTERNS) {
    if (pattern.test(content)) {
      warnings.push(`Linguagem inadequada detectada: ${pattern.toString()}`);
    }
  }

  return warnings;
};

export const validateStructuralCompleteness = (
  mode: StudyMode,
  sections: string[]
): string[] => {
  const requiredByMode: Record<StudyMode, string[]> = {
    DEVOTIONAL: ["titulo", "texto_base", "ideia_central", "oracao_final"],
    DAILY_STUDY: ["titulo", "texto_principal", "contexto", "aplicacoes"],
    SMALL_GROUP: ["objetivo", "texto_biblico", "perguntas_observacao", "oracao"],
    EXPOSITORY_SERMON: ["titulo", "texto_base", "proposicao", "aplicacoes", "conclusao"],
    DOCTRINAL_STUDY: ["definicao", "base_biblica", "sintese_doutrinaria", "aplicacoes"]
  };

  return requiredByMode[mode].filter((item) => !sections.includes(item));
};

export const runTheologicalValidation = (
  mode: StudyMode,
  content: string,
  sections: string[]
): TheologicalValidationResult => {
  const warnings = validateTheologicalTone(content);
  const missing = validateStructuralCompleteness(mode, sections);

  const failures = missing.length
    ? [`Seções obrigatórias ausentes: ${missing.join(", ")}`]
    : [];

  if (failures.length > 0) {
    return {
      status: "REQUIRES_REWRITE",
      warnings,
      failures
    };
  }

  if (warnings.length > 0) {
    return {
      status: "APPROVED_WITH_WARNINGS",
      warnings,
      failures
    };
  }

  return {
    status: "APPROVED",
    warnings,
    failures
  };
};
