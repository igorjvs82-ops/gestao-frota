# Core Editorial-Teológico e Engenharia de Prompts

## 1) Princípios hermenêuticos

1. **Sola Scriptura funcional**: Escritura interpreta Escritura.
2. **Sentido histórico-gramatical**: prioridade ao significado autoral no contexto original.
3. **Leitura canônica**: cada texto é lido na unidade da história da redenção.
4. **Progressão da revelação**: Antigo e Novo Testamento em continuidade e cumprimento em Cristo.
5. **Aplicação derivada da interpretação**: aplicação nunca contradiz o sentido do texto.

## 2) Princípios exegéticos

- Delimitar perícope e gênero literário.
- Identificar estrutura argumentativa/narrativa.
- Mapear termos-chave e paralelismos.
- Distinguir:
  - observação,
  - interpretação,
  - doutrina,
  - aplicação.
- Formular ideia central exegética em uma sentença.

## 3) Guardrails doutrinários

### Obrigatórios
- Alta visão das Escrituras.
- Centralidade do evangelho.
- Cristocentrismo orgânico (não artificial).
- Ênfase em arrependimento, fé, graça, santificação, discipulado e missão.

### Proibições
- Prosperidade como promessa normativa.
- Triunfalismo sem cruz.
- Alegoria arbitrária sem base textual.
- Sensacionalismo espiritual e manipulação emocional.
- Afirmações históricas não verificáveis como fatos.

## 4) Filtros de qualidade editorial

1. Clareza (frases objetivas, sem jargão desnecessário).
2. Fidelidade (sem extrapolar além do texto).
3. Coerência interna (sem contradições entre seções).
4. Densidade adequada ao público.
5. Aplicabilidade pastoral real.

## 5) Estruturas por modo

## 5.1 Devocional
- título
- texto base
- ideia central
- explicação breve
- caráter de Deus revelado
- conexão com Cristo
- aplicação pessoal
- pergunta reflexiva
- oração final
- frase memorável

## 5.2 Estudo diário
- título
- tema do dia
- texto principal
- contexto histórico-literário
- observações
- doutrina envolvida
- conexão com evangelho
- aplicações
- exercício espiritual
- perguntas de autoavaliação
- oração

## 5.3 Pequenos grupos
- objetivo do encontro
- quebra-gelo (opcional)
- leitura bíblica
- panorama
- verdade central
- perguntas de observação (5–10)
- perguntas de interpretação (5–10)
- perguntas de aplicação (5–10)
- compromisso da semana
- oração em grupo

## 5.4 Pregação expositiva
- título
- texto base
- proposição
- ideia exegética
- ideia homilética
- objetivo do sermão
- contexto histórico/canônico
- divisão em pontos
- explicação verso a verso
- aplicações por ponto
- chamada à fé e arrependimento
- conclusão

## 5.5 Estudo temático doutrinário
- definição
- problema humano
- base bíblica principal
- textos de apoio
- síntese doutrinária
- tensões interpretativas
- erros comuns
- aplicações pastorais
- implicações para igreja/família/missão

## 6) Checklists de revisão

## 6.1 Checklist teológico
- O texto respeita contexto imediato e canônico?
- Há conexão cristocêntrica legítima?
- A aplicação decorre da exegese?
- Há linguagem triunfalista/prosperidade?
- Há promessas indevidas?

## 6.2 Checklist editorial
- Linguagem está clara e pastoral?
- Estrutura está completa para o modo?
- Existe redundância excessiva?
- Tempo de leitura está adequado ao formato?

## 6.3 Checklist pastoral
- Há sensibilidade com sofrimento humano?
- Existe chamado à obediência sem moralismo?
- O tom é reverente e esperançoso?

## 7) Taxonomia de temas

- Deus e seus atributos
- Cristo e obra redentora
- Espírito Santo e vida cristã
- pecado e queda
- graça e salvação
- santificação
- oração e vida devocional
- igreja local
- discipulado
- missão e evangelização
- sofrimento, luto e esperança
- família e relacionamentos
- trabalho, vocação e ética
- justiça, compaixão e misericórdia

## 8) Taxonomia de doutrinas

- Bibliologia
- Teologia própria
- Cristologia
- Pneumatologia
- Antropologia bíblica
- Hamartiologia
- Soteriologia
- Eclesiologia
- Escatologia
- Sacramentos/ordenanças
- Providência
- Aliança

## 9) Taxonomia de aplicações pastorais

- Arrependimento prático
- Consolação em sofrimento
- Reconciliação relacional
- Disciplina espiritual
- Integridade no trabalho
- Hospitalidade e serviço
- Missão pessoal
- Vida comunitária
- Generosidade
- Perseverança na provação

## 10) Taxonomia de perfis de público

- novos convertidos
- adolescentes/jovens
- casais
- líderes de pequeno grupo
- professores de EBD
- pregadores/pastores
- igreja em geral
- pessoas em crise (luto, ansiedade, culpa)

## 11) Conexão cristocêntrica: formas corretas

1. Cumprimento de promessas e tipos segundo o cânon.
2. Relação com pessoa/obra de Cristo (vida, morte, ressurreição, mediação).
3. Aplicação em termos de união com Cristo e discipulado.
4. Chamado à fé e arrependimento fundamentado no evangelho.

## 12) Conexão cristocêntrica: formas incorretas

- Forçar Cristo em detalhes arbitrários do texto.
- Ignorar sentido original para “mensagens motivacionais”.
- Alegorizar personagens/objetos sem sustentação bíblica.
- Transformar texto em autoajuda sem evangelho.

## 13) Validações automáticas (tom, coerência, fidelidade)

### 13.1 Tom
- Bloquear termos de manipulação (“vitória garantida hoje”, “milagre financeiro imediato”).
- Sinalizar excesso de imperativos sem base na graça.

### 13.2 Coerência
- Verificar consistência entre ideia central e aplicações.
- Verificar contradições entre seções.

### 13.3 Fidelidade bíblica
- Conferir referência bíblica válida.
- Conferir alinhamento com contexto declarado.
- Exigir distinção explícita entre interpretação e opinião pastoral.

## 14) Arquitetura de prompts internos (modular)

Cada modo usa 6 camadas:
1. `system.base` (papel + limites)
2. `task.mode` (objetivo do formato)
3. `style.voice` (tom pastoral)
4. `guardrail.theology` (proibições + checklist)
5. `review.quality` (crítica e reescrita)
6. `export.format` (JSON estruturado para editor/slides)

## 15) Contrato de saída estruturada

```json
{
  "mode": "EXPOSITORY_SERMON",
  "metadata": {
    "theme": "string",
    "passage": "string",
    "audience": "string",
    "tone": "string"
  },
  "sections": [],
  "theologyChecks": {
    "context": "pass|warn|fail",
    "christocentric": "pass|warn|fail",
    "application": "pass|warn|fail"
  },
  "warnings": []
}
```

## 16) Pipeline operacional do motor teológico

`Input -> Exegese -> Composição por modo -> Guardrails -> Revisão editorial -> Validação automática -> Persistência versão`

Saídas possíveis:
- `APPROVED`
- `APPROVED_WITH_WARNINGS`
- `REQUIRES_REWRITE`

## 17) Critérios de aceite do core teológico

- 100% das saídas incluem distinção observação/interpretação/aplicação.
- 0% de afirmações explícitas de prosperidade como promessa normativa.
- >= 95% das saídas com conexão cristocêntrica avaliada como `pass` ou `warn` revisável.
- >= 90% de aprovação humana em revisão pastoral interna.
