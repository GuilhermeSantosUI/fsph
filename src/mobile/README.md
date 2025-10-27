# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

Fluxo de autenticação implementado com Supabase (email/senha, recuperação, OTP e Google OAuth).

Configuração:

1. Crie um projeto no Supabase e ative o provedor Google em Authentication > Providers.
2. Adicione as Redirect URLs:
   - mobile://auth/callback
3. Crie um arquivo .env.local com:
   - EXPO_PUBLIC_SUPABASE_URL=...
   - EXPO_PUBLIC_SUPABASE_ANON_KEY=...
4. Verifique o app.json possui o scheme "mobile" e intentFilters Android.

Rotas:

- /onboarding
- /sign-in
- /sign-up
- /forgot-password
- /otp
- /(tabs)

Executar:

- npm start

In the output, you'll find options to open the app in a

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
