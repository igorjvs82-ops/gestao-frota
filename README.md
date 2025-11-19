# Gestão de Frota

Aplicação 100% estática construída com HTML, CSS e JavaScript moderno para monitorar indicadores da frota, alertas de manutenção e detalhes de cada veículo. O objetivo é prover um dashboard leve que funcione sem dependências externas (ideal para ambientes restritivos).

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run lint` | Executa `node --check` em todos os arquivos JS para garantir que não haja erros de sintaxe. |
| `npm test` | Roda a suíte de testes unitários com o runner nativo do Node (`node --test`). |
| `npm run build` | Copia os arquivos da pasta `src/` para `dist/`, gerando a versão para deploy. |
| `npm start` | Sobe um servidor HTTP simples que serve o conteúdo gerado em `dist/`. |

> Obs.: como não existem dependências externas, o `npm install` apenas gera o `package-lock.json` – útil em pipelines CI/CD sem acesso ao registro NPM.

## Estrutura principal

```
├── src
│   ├── index.html        # Estrutura do dashboard
│   ├── styles.css        # Estilos responsivos
│   ├── main.js           # Lógica de filtros, métricas e interações
│   └── data/             # Dados mockados da frota
├── scripts
│   ├── build.mjs         # Build estático (copia src → dist)
│   ├── lint.mjs          # Lint sintático via node --check
│   └── serve.mjs         # Servidor HTTP simples
└── tests                 # Testes unitários para filtros e métricas
```

## Próximos passos sugeridos

- Integrar os dados a uma API real (REST ou GraphQL) para substituir o mock local.
- Persistir as preferências de filtro no `localStorage`.
- Exportar relatórios em CSV/Excel usando o conjunto filtrado de veículos.
