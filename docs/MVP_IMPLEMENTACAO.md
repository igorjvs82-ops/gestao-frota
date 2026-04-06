# Continuação da Especificação — Proposta Concreta de Implementação do MVP

Este documento continua a especificação mestra e traduz a visão em implementação prática inicial.

## 1) Estrutura de monorepo

Padrão: **pnpm workspaces + apps/packages**.

- `apps/web`: Next.js (produto web)
- `apps/api`: NestJS (API de domínio)
- `apps/worker`: workers de filas (BullMQ)
- `packages/contracts`: contratos compartilhados (DTOs/tipos)
- `packages/domain`: regras de negócio puras
- `packages/design-tokens`: tokens de design

## 2) Estrutura de pastas proposta

```txt
.
├─ apps/
│  ├─ web/
│  │  ├─ app/
│  │  │  ├─ (auth)/
│  │  │  ├─ dashboard/
│  │  │  ├─ studies/
│  │  │  └─ library/
│  │  ├─ components/
│  │  ├─ lib/
│  │  └─ styles/
│  ├─ api/
│  │  ├─ src/
│  │  │  ├─ modules/
│  │  │  │  ├─ auth/
│  │  │  │  ├─ studies/
│  │  │  │  ├─ slides/
│  │  │  │  ├─ reviews/
│  │  │  │  └─ exports/
│  │  │  ├─ infra/
│  │  │  └─ main.ts
│  │  └─ prisma/
│  └─ worker/
│     └─ src/jobs/
├─ packages/
│  ├─ contracts/
│  ├─ domain/
│  └─ design-tokens/
├─ prisma/
└─ docs/
```

## 3) Schema do banco com Prisma

- Implementado em `prisma/schema.prisma`.
- Cobertura de entidades do domínio: usuários, organizações, workspaces, projetos, versões, slides, templates, prompts, jobs, revisão e aprovação.
- Enumerações de modos e status padronizadas para evitar divergência entre app/API/worker.

### Decisões concretas
- PK com UUID.
- Conteúdo rico em `Json` para blocos/editor/slides.
- Índices para listagens por workspace, modo e status.
- `StudyVersion` versionado por `(studyProjectId, versionNumber, mode)`.

## 4) Modelos TypeScript

- Implementados em `packages/contracts/src/index.ts`.
- Incluem DTOs e inputs principais:
  - `CreateStudyProjectInput`
  - `StudyProjectDTO`
  - `StudyVersionDTO`
  - `GenerateStudyRequest`
  - `CreateSlideDeckRequest`
  - `ExportRequest`

## 5) Contratos de API (MVP)

### Estudos
- `POST /v1/studies` cria projeto.
- `GET /v1/studies/:id` detalha projeto.
- `POST /v1/studies/:id/generate` enfileira geração inicial.
- `GET /v1/studies/:id/versions` lista versões.

### Revisão
- `POST /v1/study-versions/:id/review` enfileira revisão.
- `GET /v1/review-jobs/:id` status e relatório.

### Slides
- `POST /v1/study-versions/:id/slides` gera deck.
- `PATCH /v1/slide-decks/:id/slides/:slideId` edita slide.

### Exportação
- `POST /v1/exports` cria export job.
- `GET /v1/exports/:id` status + URL final.

## 6) Wireframes textuais do MVP

### Tela: Dashboard
- Header: busca global + seletor de workspace.
- Coluna A: “Projetos recentes”.
- Coluna B: “Pendentes de revisão”.
- Coluna C: “Exportações recentes”.
- CTA fixo: “Novo Estudo”.

### Tela: Novo Estudo (wizard)
1. Modo e objetivo
2. Texto/tema/público/tom
3. Pré-estrutura sugerida
4. Confirmar e gerar

### Tela: Editor inicial
- Esquerda: árvore de blocos
- Centro: documento
- Direita: painel IA (gerar/revisar/transformar em slide)

### Tela: Biblioteca
- Filtros por modo, série, tags, data.
- Cards com status, autor e última atualização.

## 7) Design tokens (MVP)

Implementados em `packages/design-tokens/src/tokens.ts`:
- Cores: brand/accent/neutral/semantic.
- Tipografia: famílias, tamanhos e line-heights.
- Espaçamentos e raios.

## 8) Componentes principais (MVP)

- `StudyCreationWizard`
- `StudyCard`
- `BlockEditor`
- `TheologyReviewPanel`
- `SlideDeckPanel`
- `ExportJobList`
- `WorkspaceSwitcher`

## 9) Fluxo do gerador de conteúdo

1. Normalizar input.
2. Classificar modo e profundidade.
3. Executar prompt base + modo.
4. Executar guardrail teológico.
5. Rodar edição de clareza.
6. Persistir versão + relatório.

**Falha recuperável:** retorna rascunho + warnings + sugestões.

## 10) Fluxo do gerador de slides

1. Ler `StudyVersion`.
2. Extrair narrativa em segmentos (abertura, texto, pontos, aplicação, conclusão).
3. Mapear para tipos de slide.
4. Aplicar template.
5. Gerar deck editável.

## 11) Estratégia de exportação PPTX

- Worker dedicado `export-pptx`.
- Fonte: `SlideDeck.structure` + `slides.content`.
- Renderer: PptxGenJS.
- Output em storage S3 + URL assinada temporária.

## 12) Estratégia de prompts internos IA

Versão MVP com templates JSON:
- `prompt.exegesis.v1`
- `prompt.devotional.v1`
- `prompt.expository.v1`
- `prompt.review.theology.v1`
- `prompt.slides.mapper.v1`

Cada template inclui:
- papel, objetivo, restrições,
- formato de saída (JSON schema),
- critérios teológicos,
- checklist de qualidade.

## 13) Plano de autenticação e permissões

- Auth.js para login com email/senha (MVP).
- Sessão por workspace.
- RBAC:
  - Owner/Admin: gestão total
  - Editor: cria/edita
  - Reviewer: revisa/aprova conteúdo
  - Viewer: somente leitura

## 14) Plano de filas e jobs

Filas BullMQ:
- `study-generation`
- `theology-review`
- `slides-generation`
- `export-pptx`
- `export-pdf`

Padrões:
- idempotência por chave (`workspaceId + studyVersionId + jobType`).
- retries exponenciais.
- DLQ para falhas críticas.

## 15) Plano de observabilidade

- Logs estruturados com `requestId` e `workspaceId`.
- Métricas: latência P95, falhas por pipeline, custo por geração.
- Tracing ponta a ponta (API -> worker -> storage).
- Alertas: taxa de erro > 3% por 5 min.

## 16) Plano de testes

- Unit: regras de versionamento e autorização.
- Integração: Prisma + módulos API.
- Contrato: validação DTOs compartilhados.
- E2E: criar estudo -> gerar -> revisar -> slide -> exportar.
- Snapshot: estrutura de slides gerados.

## 17) Plano de deploy

- `dev/staging/prod` com pipelines separados.
- Migração Prisma antes de rollout.
- Web/API/worker deploy independentes.
- Estratégia blue/green para API em produção.

---

## Início de código-base (MVP)

Estruturas iniciais adicionadas:
- Monorepo (`package.json`, `pnpm-workspace.yaml`).
- Schema Prisma completo inicial.
- Pacote de contratos TypeScript.
- Pacote de design tokens.
- `package.json` base para `apps/web`, `apps/api`, `apps/worker`.

Próxima etapa imediata sugerida:
1. gerar app Next.js em `apps/web`;
2. subir NestJS em `apps/api` com módulo `studies`;
3. ligar Prisma client;
4. criar primeiro endpoint `POST /v1/studies`;
5. conectar fila `study-generation` no worker.
