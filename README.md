## 1 - Passo a Passo para execução do MVP

Este passo a passo descreve, de forma completa, como configurar e executar localmente os três projetos: `server`, `webapp` e `mobile`.

Pré-requisitos (macOS, shell `zsh`):

- Node.js (recomendo LTS 18.x ou 20.x)
- npm (vem com o Node)
- git
- Para mobile: Expo (pode usar `npx expo`) e, se necessário, Android Studio / Xcode para emuladores
- JDK (para builds Android quando usar `expo run:android`)

1. Clonar o repositório

```bash
cd ~/onde/voce/guarda/projetos
git clone https://github.com/GuilhermeSantosUI/fsph.git
cd fsph
```

2. Server (API)

- Diretório: `src/server`
- O projeto usa Fastify, Prisma e SQLite por padrão. Porta padrão: `3000`.

- Variáveis de ambiente (crie `src/server/.env`):
  - `JWT_SECRET` — segredo para tokens JWT
  - `GOOGLE_CLIENT_ID` — (opcional) OAuth Google
  - `GOOGLE_CLIENT_SECRET` — (opcional) OAuth Google
  - `NODE_ENV` — `development` (opcional)
  - `VITE_FPSH_API_URL` — (opcional) URL do serviço externo FPSH

Exemplo `src/server/.env`:

```
JWT_SECRET=dev-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=development
VITE_FPSH_API_URL=https://api.exemplo-fpsh.com
```

- Instalar e preparar Prisma:

```bash
cd src/server
npm install
# gerar Prisma Client
npx prisma generate --schema=prisma/schema.prisma
# criar migration e banco SQLite (dev.db)
npx prisma migrate dev --name init --schema=prisma/schema.prisma
```

- Rodar em desenvolvimento:

```bash
npm run dev
```

O servidor estará em `http://localhost:3000`. A documentação Swagger fica em `http://localhost:3000/docs`.

3. Web (frontend)

- Diretório: `src/webapp`
- Variáveis de ambiente (arquivo `src/webapp/.env`):
  - `VITE_API_URL` — URL da API (ex: `http://localhost:3000`)
  - `VITE_GOOGLE_KEY` — (opcional)

Exemplo `src/webapp/.env`:

```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_KEY=your-google-key
```

- Instalar e rodar:

```bash
cd src/webapp
npm install
npm run dev
```

O Vite mostrará a URL local (por exemplo `http://localhost:5173`). Para build de produção:

```bash
npm run build
npm run preview
```

4. Mobile (Expo)

- Diretório: `src/mobile`
- O app usa Supabase para autenticação (email/password, OTP e Google OAuth).

- Variáveis de ambiente (crie `src/mobile/.env` ou `.env.local`):
  - `EXPO_PUBLIC_SUPABASE_URL` — URL do projeto Supabase
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY` — anon/public key do Supabase

Exemplo `src/mobile/.env`:

```
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

- Verifique `src/mobile/app.json` para garantir que existe `scheme: "mobile"` (necessário para redirect OAuth `mobile://auth/callback`).

- Instalar e rodar:

```bash
cd src/mobile
npm install
npm start          # inicia Metro / Expo
# ou para Android/iOS (emulador ou dispositivo configurado)
npm run android
npm run ios
```

Observações: para testar autenticação com Google no mobile, adicione `mobile://auth/callback` em Redirect URLs no painel do Supabase e no console do Google Cloud (OAuth Client).

5. Teste de integração local (fluxo sugerido)

- Inicie o server:

```bash
cd src/server
npm run dev
```

- Ajuste `src/webapp/.env` para `VITE_API_URL=http://localhost:3000` e rode o web:

```bash
cd src/webapp
npm run dev
```

- Rode o mobile em outro terminal:

```bash
cd src/mobile
npm start
```

6. Deploy (resumo rápido)

- Server: para produção, prefira Postgres — atualize `prisma/schema.prisma` e use `DATABASE_URL` em `.env`. Use PM2, Docker ou provider Cloud.
- Web: build (`npm run build`) e hospede em Vercel/Netlify/S3+CloudFront.
- Mobile: use EAS/Expo para builds nativas e publique nas lojas.

7. Problemas comuns e soluções rápidas

- Erro Prisma: rode `npx prisma generate` e `npx prisma migrate dev`.
- Porta em uso: ajuste porta em `src/server/src/shared/infra/http/server.ts`.
- Erros com `expo run:android`: verifique Android Studio, SDK, `JAVA_HOME` e emulador.