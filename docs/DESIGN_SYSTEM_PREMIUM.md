# Design System Premium — Plataforma de Estudos Bíblicos

## 1. Posicionamento visual

**Essência visual:** “clareza reverente com excelência editorial”.

A linguagem visual combina:
- sobriedade teológica,
- modernidade de produto digital,
- calor pastoral,
- performance de apresentação em telão.

**Arquétipo de marca visual:**
- 60% editorial/minimal,
- 25% cinematográfico moderado,
- 15% litúrgico contemporâneo.

---

## 2. Princípios de design

1. **Cristocêntrico sem clichê visual**: destaque à mensagem, não a ornamentos religiosos.
2. **Legibilidade radical**: toda decisão favorece leitura rápida e compreensão.
3. **Hierarquia inequívoca**: títulos, subtítulos e apoio sempre previsíveis.
4. **Consistência sistêmica**: componentes e layouts previsíveis em todo o produto.
5. **Afeto reverente**: visual acolhedor, sem sentimentalismo exagerado.
6. **Acessibilidade por padrão**: contraste, foco visível, navegação por teclado.
7. **Telão-first para apresentações**: slides com densidade textual controlada.

---

## 3. Moodboard textual

### Palavras-chave visuais
- profundo, elegante, limpo, contemplativo, firme, editorial, luminoso.

### Referências abstratas
- páginas editoriais com grandes margens,
- fotografia documental de luz natural,
- geometria simples com ritmo tipográfico,
- contraste escuro-claro com ponto de acento.

### Evitar
- gradientes neon agressivos,
- ícones caricatos religiosos,
- fundos com cruzes óbvias como watermark,
- excesso de brilhos, lens flare, texturas kitsch.

---

## 4. Direção de arte

### Linguagem de superfícies
- **Base:** neutros densos e texturização mínima.
- **Acento:** violeta pastoral e azul profundo para autoridade/serenidade.
- **Destaque:** uso econômico de cor para CTA e pontos teológicos centrais.

### Linguagem de forma
- cantos médios (12–16px), sem “glassmorphism”.
- sombras suaves e profundas, nunca dramáticas.
- divisores discretos para organização editorial.

### Linguagem de imagem
- fotografia com pessoas reais, contexto comunitário e luz orgânica.
- cenas simbólicas com composição limpa.
- evitar stock óbvio e poses artificiais.

---

## 5. Estilo tipográfico

## Font stack
- **UI/Interface:** Inter
- **Texto bíblico/citação:** Source Serif 4

## Escala tipográfica (desktop)
- `display-2`: 64/72
- `display-1`: 56/64
- `h1`: 40/48
- `h2`: 32/40
- `h3`: 24/32
- `h4`: 20/28
- `body-lg`: 18/30
- `body-md`: 16/26
- `body-sm`: 14/22
- `caption`: 12/18

## Regras
- versículo em serif, explicação em sans.
- máximo 2 famílias por tela.
- largura ideal de parágrafo: 60–75 caracteres.

---

## 6. Paleta de cores

### Núcleo (brand)
- `brand.deep.900` `#0B1020`
- `brand.deep.800` `#111933`
- `brand.deep.700` `#1E2A52`
- `brand.deep.600` `#2A3A73`

### Acento ministerial
- `accent.pastoral.500` `#8B5CF6`
- `accent.pastoral.400` `#A78BFA`
- `accent.pastoral.300` `#C4B5FD`

### Neutros
- `neutral.0` `#FFFFFF`
- `neutral.50` `#FAFAFA`
- `neutral.100` `#F4F4F5`
- `neutral.300` `#D4D4D8`
- `neutral.500` `#71717A`
- `neutral.700` `#3F3F46`
- `neutral.900` `#18181B`
- `neutral.950` `#09090B`

### Semânticas
- `success.500` `#22C55E`
- `warning.500` `#F59E0B`
- `error.500` `#EF4444`
- `info.500` `#3B82F6`

### Roles de superfície
- `bg.canvas`
- `bg.elevated`
- `bg.inverse`
- `text.primary`
- `text.secondary`
- `border.subtle`
- `border.strong`

---

## 7. Escala de espaçamento

Sistema em 4pt:
- `space-1 = 4`
- `space-2 = 8`
- `space-3 = 12`
- `space-4 = 16`
- `space-5 = 20`
- `space-6 = 24`
- `space-8 = 32`
- `space-10 = 40`
- `space-12 = 48`
- `space-16 = 64`
- `space-20 = 80`

Regra: layouts principais usam múltiplos de 8.

---

## 8. Grid

### App (desktop)
- 12 colunas, gutter 24px, margens 32px.

### App (tablet)
- 8 colunas, gutter 20px, margens 24px.

### App (mobile)
- 4 colunas, gutter 16px, margens 16px.

### Slide (16:9)
- zona segura de 8% em cada borda.
- baseline grid de 8px.

---

## 9. Componentes base

- `Button` (primary, secondary, ghost, danger)
- `Input`, `Textarea`, `Select`, `Combobox`
- `Checkbox`, `Switch`, `Radio`
- `Tabs`, `Accordion`, `Tooltip`
- `Badge`, `Tag`, `Avatar`
- `Card`, `Divider`, `Skeleton`
- `Modal`, `Drawer`, `Popover`

### Estados obrigatórios
`default`, `hover`, `active`, `focus-visible`, `disabled`, `error`, `loading`.

---

## 10. Componentes compostos

- `WorkspaceSwitcher`
- `StudyCreationWizard`
- `StudyCard`
- `BlockEditorShell`
- `TheologyReviewPanel`
- `VersionDiffPanel`
- `SlideDeckTimeline`
- `TemplatePicker`
- `ExportJobTable`
- `PromptAuditDrawer`

---

## 11. Padrões de dashboard

- Header com busca global + atalhos.
- Grid de cards com densidade baixa (respiro visual).
- KPI strip com no máximo 4 métricas principais.
- Blocos: “recentes”, “pendentes”, “atividade da equipe”.

---

## 12. Padrões de editor

- Layout tripartido: estrutura / conteúdo / inteligência.
- Barra superior fixa com autosave + status de revisão.
- Blocos arrastáveis com alça discreta.
- Modo foco para escrita (esconde painéis laterais).

---

## 13. Padrões de biblioteca

- Filtros persistentes (modo, série, tags, data).
- Visualização em grid e tabela.
- Ordenação padrão por atualização recente.
- Quick actions: abrir, duplicar, exportar, arquivar.

---

## 14. Padrões de telas vazias

Cada empty state deve conter:
1. título orientativo,
2. texto breve de valor,
3. CTA primário,
4. CTA secundário opcional,
5. ilustração abstrata discreta.

Tom de texto: encorajador e objetivo.

---

## 15. Padrões de feedback

- Toasts para ações rápidas (salvo, exportado, erro transitório).
- Banners para alertas persistentes.
- Estados de loading com skeleton e progress step.
- Erros com causa + ação sugerida.

---

## 16. Padrões de navegação

- Sidebar principal por domínio (Dashboard, Estudos, Biblioteca, Slides, Equipe, Configurações).
- Breadcrumb em rotas profundas.
- Command palette (`Cmd/Ctrl + K`) para navegação e ações.

---

## 17. Padrões de apresentação PowerPoint

### Tipos de slide
- capa,
- transição,
- leitura bíblica,
- ponto,
- aplicação,
- pergunta,
- oração,
- conclusão.

### Regras
- máximo 36 palavras por slide de conteúdo.
- títulos com 48–64px no telão.
- versículos com destaque serifado.
- mínimo de contraste 3:1 para texto grande e 4.5:1 para texto pequeno.

---

## 18. Contraste para telão

- Proibir texto cinza claro sobre imagem sem overlay.
- Overlay obrigatório de 28%–45% em imagens de fundo.
- Usar sombra de texto somente em fundos complexos.
- Testar em simulador de baixa luminosidade.

---

## 19. Versões dark/light

### Dark (padrão)
- fundo profundo,
- alto contraste,
- leitura noturna e auditório.

### Light
- para impressão, estudo diurno e leitura longa.

Regra: ambos os temas compartilham mesma hierarquia, espaçamento e componentes.

---

## 20. Regras de uso de imagem

- Priorizar imagens com narrativa humana e contexto real.
- Evitar simbolismos literais excessivos.
- Não usar imagens de baixa resolução (<1920x1080 para slides).
- Sempre validar legibilidade com blur/overlay quando houver texto.

---

## 21. Guidelines de consistência visual

1. Nunca alterar raio/sombra localmente sem token.
2. Não criar cor nova sem passar por roles semânticos.
3. Não usar mais de 2 pesos tipográficos por bloco.
4. Garantir alinhamento em grid e baseline.
5. Revisar contraste antes de publicar templates.
6. Reutilizar componentes compostos antes de criar novos.
7. Nomear variações com padrão `Componente/Contexto/Estado`.

---

## 22. Nomenclatura de tokens

Padrão recomendado:
- `color.{role}.{scale}`
- `space.{n}`
- `radius.{size}`
- `shadow.{level}`
- `font.{family|size|weight|lineHeight}`

Exemplo:
- `color.bg.canvas`
- `color.text.primary`
- `color.border.subtle`
- `font.size.h3`

---

## 23. Governança do design system

- Conselho quinzenal: produto + design + engenharia.
- Critério para novos componentes:
  1) recorrência de uso,
  2) impacto em consistência,
  3) custo de manutenção.
- Versionamento semântico para tokens e componentes.
- Changelog obrigatório para breaking changes.
