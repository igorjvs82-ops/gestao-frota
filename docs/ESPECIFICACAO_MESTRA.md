# Especificação Mestra — Plataforma de Estudos Bíblicos (PT-BR)

## 1. Visão executiva do produto

**Nome de trabalho:** Logos Studio (interno)

Plataforma SaaS para criação, revisão, versionamento e distribuição de conteúdos bíblicos em português com cinco modos editoriais principais (Devocional, Estudo Diário, Pequenos Grupos, Pregação Expositiva, Estudo Doutrinário), além de geração automática de apresentações premium em PPTX e PDF.

**Problema resolvido:** líderes cristãos gastam muito tempo para consolidar conteúdo bíblico fiel, didático e visualmente excelente; ferramentas atuais fragmentam teologia, edição e apresentação.

**Proposta:** unificar pipeline de exegese → estruturação pedagógica → revisão teológica → edição colaborativa → geração visual.

**Princípios de produto:**
- Fidelidade bíblica com centralidade do evangelho.
- Clareza pedagógica e aplicação pastoral.
- Padrão visual premium para telão e mídia.
- Colaboração por igreja/equipe com workflow de aprovação.
- Escalabilidade técnica e governança de IA.

---

## 2. Proposta de valor

1. **Produtividade ministerial:** de horas para minutos na primeira versão.
2. **Qualidade doutrinária:** guardrails teológicos + revisão automática.
3. **Consistência editorial:** templates por modo e por público.
4. **Excelência visual:** slides modernos, legíveis e reutilizáveis.
5. **Governança:** versionamento, histórico, aprovação e auditoria.

---

## 3. Perfis de usuário

- **Devocional individual:** busca crescimento pessoal com profundidade moderada.
- **Líder de pequeno grupo:** precisa de roteiro participativo com tempo controlado.
- **Professor de EBD:** necessita estrutura didática e perguntas progressivas.
- **Pastor/pregador:** demanda exegese, homilética e aplicação pastoral robustas.
- **Equipe de comunicação:** transforma conteúdo em slides, snippets e PDFs.
- **Administrador de igreja/rede:** gerencia acesso, templates e biblioteca institucional.

---

## 4. Arquitetura geral

Arquitetura modular orientada a domínio:

- **Camada de Interface:** app web (Next.js) + editor + gerador de slides.
- **Camada de Aplicação:** casos de uso (criar estudo, revisar, exportar, aprovar).
- **Camada de Domínio:** entidades, regras teológicas, políticas de versionamento.
- **Infraestrutura:** PostgreSQL, Redis/BullMQ, storage S3, serviço de IA, observabilidade.

### Contextos de domínio (DDD)
- Identity & Access
- Study Authoring
- Theological Review
- Visual Presentation
- Asset Library
- Collaboration & Workflow
- Export & Distribution
- Analytics

### Estilo de execução
- HTTP para operações síncronas.
- Filas para geração IA, imagens, PPTX/PDF e revisões pesadas.
- Event-driven interno para auditoria e analytics.

---

## 5. Escolha da stack e justificativa

- **Frontend:** Next.js (App Router) + TypeScript estrito.
- **UI:** Tailwind + shadcn/ui + design tokens próprios.
- **Editor:** TipTap (blocos customizados para conteúdo bíblico).
- **Backend:** NestJS (módulos bem definidos, filas, DI forte).
- **Banco:** PostgreSQL + Prisma ORM.
- **Busca:** PostgreSQL FTS + pgvector para similaridade semântica.
- **Auth:** Auth.js com suporte a SSO opcional para organizações.
- **Filas:** BullMQ + Redis.
- **Storage:** S3 compatível para assets/exportações.
- **IA:** Orquestrador multi-provider com policy engine e fallback.
- **PPTX:** PptxGenJS com templates JSON versionáveis.
- **PDF:** HTML-to-PDF (Playwright em worker dedicado).
- **Observabilidade:** OpenTelemetry + Sentry + logs estruturados.

**Justificativa:** stack madura, produtiva, com grande adoção, excelente ecossistema e boa separação entre app interativo e jobs assíncronos.

---

## 6. Módulos do sistema

1. Autenticação, perfis, organizações e workspaces.
2. Dashboard com projetos recentes, pendências e métricas.
3. Criador de estudo por prompt guiado.
4. Biblioteca com filtros por modo, texto bíblico, tema e tags.
5. Editor avançado em blocos com DnD.
6. Pipeline de IA (10 motores especializados).
7. Revisor teológico/editorial automático + revisão humana.
8. Gerador de slides e editor de deck.
9. Repositórios: Bíblia, temas, doutrinas, séries, templates.
10. Exportações (PPTX, PDF, DOCX/MD).
11. Workflow de aprovação (autor → revisor → aprovador).
12. Administração, auditoria, analytics e billing (futuro).

---

## 7. Fluxos de usuário

### Fluxo principal
1. Usuário entra no dashboard.
2. Cria `StudyProject` (tema/passagem/público/tom).
3. Seleciona um ou múltiplos modos.
4. Recebe estrutura sugerida por modo.
5. Gera versão inicial (job assíncrono).
6. Edita em blocos + comentários.
7. Executa revisão automática.
8. Ajusta e envia para aprovação.
9. Escolhe template visual.
10. Gera slides/PDF/PPTX.
11. Publica/compartilha.

### Fluxos secundários
- Clonar estudo para nova série.
- Transformar trecho em slide/image prompt.
- Comparar versões lado a lado.
- Reutilizar deck em outro projeto.

---

## 8. Modelo de dados (alto nível)

### Entidades obrigatórias
- `User`, `Organization`, `Workspace`
- `StudyProject`, `StudyVersion`, `StudyMode`
- `BiblicalPassage`, `DoctrineTopic`, `Series`
- `SlideDeck`, `Slide`, `VisualTemplate`, `ImageAsset`
- `PromptTemplate`, `TheologyProfile`, `AudienceProfile`
- `ExportJob`, `ReviewJob`
- `Tag`, `Note`, `Comment`, `ApprovalWorkflow`

### Regras de versionamento
- `StudyProject` é agregador.
- `StudyVersion` imutável após publish.
- `SlideDeck` referencia versão específica.
- Histórico completo de prompts e revisões.

### Índices críticos
- `(workspaceId, updatedAt)` para listagens.
- FTS em título/resumo/conteúdo.
- `pgvector` para busca semântica.
- Índices por `mode`, `status`, `seriesId`, `passageRef`.

---

## 9. Design system (textual)

### Princípios visuais
- Reverente, contemporâneo, editorial.
- Alto contraste para telão.
- Minimalista com calor humano.

### Tokens
- **Cores primárias:** `brand.900 #0B1020`, `brand.700 #1E2A52`, `accent.500 #8B5CF6`.
- **Neutros:** escala de `gray.50` a `gray.950`.
- **Feedback:** success/warning/error acessíveis WCAG AA.
- **Tipografia:** Inter (UI), Source Serif 4 (citações/versículos).
- **Escala:** 12/14/16/20/24/32/40/56.
- **Raios:** 8/12/16.
- **Sombras:** `sm/md/lg` com blur moderado.
- **Espaçamento:** escala 4px (4, 8, 12, 16...).

### Componentes base
- Botões, inputs, selects, combobox bíblico, cards, tabs, accordions.
- Blocos editoriais (versículo, aplicação, oração, pergunta, callout).
- Navegação: sidebar responsiva + command palette.

---

## 10. Estrutura de IA e prompts internos

### Motores
1. Exegético
2. Devocional
3. Pequenos Grupos
4. Homilético
5. Doutrinário
6. Editorial
7. Slides
8. Imagens (prompting)
9. Revisão
10. Personalização

### Contrato de prompt (versionável)
- `role`, `objective`, `context`, `constraints`, `format`, `qualityChecklist`, `theologyChecklist`, `visualChecklist`.
- Registro de `model`, `temperature`, `seed`, custo e latência.

### Pipeline recomendado
`Input Normalizer -> Exegetical Pass -> Mode Composer -> Theology Guard -> Editorial Pass -> Slide Mapper -> Review Gate -> Export`

---

## 11. Guardrails teológicos

- Distinção explícita: observação / interpretação / doutrina / aplicação.
- Bloqueio de linguagem triunfalista, promessas materiais indevidas e alegorias arbitrárias.
- Necessidade de conexão cristocêntrica orgânica.
- Proibição de invenções históricas sem base.

### Checklist automático
- Contexto bíblico respeitado?
- Aplicação deriva do texto?
- Cristo apresentado sem forçar tipologia?
- Há tom pastoral reverente?
- Existe afirmação não verificável?

Resultado: `PASS`, `PASS_WITH_WARNINGS`, `FAIL` com motivos e sugestões.

---

## 12. Especificação do gerador de PowerPoint

### Arquitetura
- `Slide Narrative Builder`: transforma estrutura teológica em narrativa visual.
- `Template Resolver`: aplica tema dark/light e identidade da igreja.
- `Slide Composer`: monta slides em JSON intermediário.
- `PPTX Renderer`: gera `.pptx` editável.

### Tipos de slide
- Capa, transição, leitura bíblica, ponto principal, aplicação, pergunta, oração, conclusão, chamado.

### Regras de composição
- Máx. 28–36 palavras por slide de conteúdo.
- Hierarquia H1/H2/body fixa.
- Safe area para telão 16:9.
- Contraste mínimo 4.5:1 em textos pequenos; 3:1 títulos grandes.

### Saída
- `.pptx`, `.pdf`, assets e manifesto JSON do deck.

---

## 13. Mapa de telas

1. Login/Cadastro
2. Onboarding
3. Dashboard
4. Novo Estudo (wizard)
5. Biblioteca
6. Editor de Estudo
7. Painel de Versões
8. Gerador de Slides
9. Editor de Slides
10. Biblioteca de Templates
11. Visualização Final
12. Exportações
13. Perfil
14. Configurações
15. Administração
16. Equipe/Permissões

---

## 14. Plano de implementação em fases

### Fase 0 (Fundação)
- Monorepo, CI, auth básica, schema inicial, observabilidade mínima.

### Fase 1 (MVP)
- Projeto + versão + 2 modos (Devocional e Pregação).
- Editor de blocos mínimo.
- Geração de slides básica e exportação PPTX.

### Fase 2
- 5 modos completos + revisão teológica automática.
- Workflow de aprovação e comentários.

### Fase 3
- Multiworkspace avançado, analytics, personalização profunda.

### Fase 4
- Ecossistema enterprise (rede de igrejas, SSO, compliance).

---

## 15. MVP

**Escopo obrigatório do MVP (10–12 semanas):**
- Auth + workspace + perfis.
- Criar projeto por tema/passagem.
- Geração inicial para Devocional e Pregação.
- Editor de blocos (texto/versículo/aplicação/pergunta).
- Revisão automática básica.
- Slides com 6 layouts essenciais.
- Exportar PPTX/PDF.

**Métrica de sucesso:** tempo de criação de sermão reduzido em 60% com satisfação > 8/10.

---

## 16. Roadmap V1 / V2 / V3

- **V1:** robustez dos 5 modos + colaboração.
- **V2:** personalização por igreja, plano de leitura/pregação, snippets sociais.
- **V3:** marketplace de templates, IA adaptativa por histórico, app mobile companion.

---

## 17. Critérios de aceitação (amostra)

- Geração de estudo com estrutura correta por modo >= 95%.
- Revisão detecta violações teológicas críticas >= 90% recall.
- Exportação PPTX íntegra em PowerPoint/Keynote/Google Slides.
- Tempo de geração < 90s (P95) para saída padrão.

---

## 18. Estratégia de testes

- **Unitários:** regras de domínio e mapeadores.
- **Integração:** API + DB + filas.
- **E2E:** fluxos de criação, revisão e exportação.
- **Visual regression:** templates de slide e UI crítica.
- **Editorial/Theology QA:** suíte de prompts dourados + checklist automatizado.

---

## 19. Estratégia de deploy

- Ambientes: `dev`, `staging`, `prod`.
- CI/CD com migrations controladas e feature flags.
- Workers separados para jobs pesados.
- Backups diários + retenção + restore testado mensalmente.

---

## 20. Estratégia de escalabilidade

- Escala horizontal de API e workers.
- Cache por chave de prompt + deduplicação de jobs.
- Banco com particionamento lógico por organização (futuro).
- Rate limits por workspace e quotas de IA.

---

## 21. Exemplos de saída (resumidos)

### Devocional (João 15:5)
- Título: “Permanecer para Frutificar”
- Ideia central: sem Cristo, não há fruto duradouro.
- Aplicação: priorizar comunhão diária e obediência prática.

### Estudo Diário (Romanos 8)
- Contexto, observações do texto, doutrina da adoção, exercício de oração.

### Pequenos Grupos (Efésios 2:1-10)
- Objetivo do encontro, perguntas em três camadas, desafio semanal.

### Pregação Expositiva (Marcos 4:35-41)
- Proposição: o Senhor da tempestade é digno de fé.
- 3 pontos expositivos + aplicações + chamada final.

### Estudo Doutrinário (Justificação)
- Definição, base bíblica, distorções comuns, implicações pastorais.

---

## 22. Estrutura de pastas do projeto (proposta)

```txt
/apps
  /web (Next.js)
  /api (NestJS)
  /worker (BullMQ processors)
/packages
  /domain
  /application
  /infra
  /ui
  /design-tokens
  /prompt-kits
  /theology-rules
  /pptx-engine
  /config
/docs
  ESPECIFICACAO_MESTRA.md
```

---

## 23. Schema inicial do banco (resumo)

- `users`, `organizations`, `workspaces`, `workspace_members`
- `study_projects`, `study_versions`, `study_modes`
- `biblical_passages`, `doctrine_topics`, `series`
- `slide_decks`, `slides`, `visual_templates`
- `prompt_templates`, `review_jobs`, `export_jobs`
- `tags`, `study_tags`, `notes`, `comments`, `approval_workflows`

---

## 24. Endpoints / ações / serviços (amostra)

- `POST /v1/studies` criar projeto
- `POST /v1/studies/:id/generate` iniciar geração
- `POST /v1/study-versions/:id/review` revisão teológica/editorial
- `POST /v1/study-versions/:id/slides` gerar deck
- `POST /v1/slide-decks/:id/export/pptx` exportar
- `GET /v1/library/search?q=` busca híbrida
- `POST /v1/workflows/:id/approve` aprovação

---

## 25. Componentes de UI necessários

- `StudyCreationWizard`
- `BlockEditor`
- `VersionDiffPanel`
- `TheologyReviewPanel`
- `SlideTimeline`
- `TemplatePicker`
- `ExportCenter`
- `PromptAuditDrawer`
- `WorkspaceMemberManager`

---

## 26. Exemplo de template de slides

**Template: “Gospel Night / Dark”**
- Fundo gradiente profundo (`#090D1A -> #1A2240`).
- Título em Inter Semibold 64.
- Versículo em Source Serif 4 44 itálico.
- Destaque em barra lateral `accent.500`.
- Área de imagem com overlay 35% para legibilidade.

Slides incluídos: capa, texto bíblico, ponto principal, aplicação, oração, conclusão.

---

## 27. Checklist final de qualidade

- [ ] Estrutura bíblica fiel ao contexto.
- [ ] Distinção observação/interpretação/doutrina/aplicação.
- [ ] Conexão cristocêntrica legítima.
- [ ] Linguagem pastoral, reverente e clara.
- [ ] Densidade adequada ao público.
- [ ] Slides legíveis em telão e visualmente consistentes.
- [ ] Exportações íntegras.
- [ ] Versionamento, revisão e auditoria registrados.

---

## Entregáveis adicionais solicitados

### A) Wireframes textuais (resumo)

1. **Dashboard:** sidebar esquerda, cards de projetos, fila de revisões, botão “Novo estudo”.
2. **Novo Estudo (wizard 4 passos):** modo, entrada bíblica/tema, audiência/tom, prévia de estrutura.
3. **Editor:** painel blocos (esq), documento (centro), revisão/IA (dir).
4. **Editor de Slides:** miniaturas (esq), canvas (centro), propriedades (dir).
5. **Exportações:** lista de jobs com status e download.

### B) Plano em sprints (12 semanas)

- **Sprint 1–2:** fundação, auth, organizações/workspaces, DB baseline.
- **Sprint 3–4:** criação de estudo + geração IA inicial.
- **Sprint 5–6:** editor de blocos + versionamento.
- **Sprint 7–8:** revisão teológica + comentários + aprovação.
- **Sprint 9–10:** gerador de slides + templates + exportação.
- **Sprint 11:** QA completo e hardening.
- **Sprint 12:** go-live assistido e observabilidade.

### C) Design system textual (resumo executivo)

- Escalas tipográficas e espaciais fixas.
- Paletas dark/light equivalentes.
- Componentes com estados (default/hover/focus/disabled/error).
- Acessibilidade (teclado, contraste, aria, foco visível).
- Padrões de composição por tipo de conteúdo bíblico.

### D) Modelagem de banco (diretriz)

- UUID como PK.
- `createdAt`, `updatedAt`, `deletedAt` em entidades auditáveis.
- Colunas `jsonb` para conteúdo estruturado de blocos/slides.
- Controle de concorrência otimista em edição (`versionNumber`).

---

## Próximo passo

Se desejar, continuo para a **próxima etapa de código** com:
1) monorepo base,
2) schema Prisma inicial,
3) API de criação de estudo,
4) editor de blocos mínimo.
