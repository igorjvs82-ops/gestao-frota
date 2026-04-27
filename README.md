# Sistema AGEDOCE / Aplicar — RDO + Relatório Vivo (MVP)

## Stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- Prisma + PostgreSQL
- Zod + React Hook Form

## Scripts disponíveis
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:seed`
- `npm run test`

## Variáveis de ambiente
Obrigatórias:
- `DATABASE_URL`
- `NEXT_PUBLIC_APP_NAME`
- `AUTH_MODE` (usar `mock` no MVP)

Opcionais (futuras integrações):
- `ENTRA_TENANT_ID`
- `ENTRA_CLIENT_ID`
- `ENTRA_CLIENT_SECRET`
- `SHAREPOINT_SITE_ID`
- `GRAPH_CLIENT_ID`
- `GRAPH_CLIENT_SECRET`

## Rodar localmente
```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Deploy na Vercel
1. Criar um banco PostgreSQL (Neon, Supabase, RDS ou equivalente).
2. Configurar `DATABASE_URL` no projeto da Vercel.
3. Configurar `NEXT_PUBLIC_APP_NAME` no projeto da Vercel.
4. Configurar `AUTH_MODE=mock` no projeto da Vercel.
5. Garantir que o build execute `prisma generate && next build` (já definido em `vercel.json`).
6. Após o primeiro deploy, executar migração no banco de produção:
   - localmente com a mesma `DATABASE_URL` de produção:
     ```bash
     npm run prisma:migrate
     ```
7. Popular dados iniciais (seed) no banco de produção:
   ```bash
   npm run prisma:seed
   ```
8. Fazer novo deploy se necessário.

## Checklist de validação pós-deploy
1. Abrir `/login`.
2. Abrir `/dashboard`.
3. Abrir `/tarefas`.
4. Iniciar RDO a partir de uma tarefa.
5. Enviar o RDO para D+1 em `/rdos/[id]`.
6. Validar em `/validacao-d1`.
7. Abrir `/rdo/[id]/pdf`.
8. Abrir `/relatorio-vivo`.
9. Abrir `/auditoria-pre-cobrape`.
