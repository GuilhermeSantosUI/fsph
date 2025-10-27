# Funcionalidade de Carteira Digital

Esta implementação adiciona a funcionalidade de adicionar o cartão de doador de sangue FSPH à carteira digital do smartphone (Apple Wallet no iOS e Google Pay no Android).

## ✨ Funcionalidades Implementadas

### 🔘 Modal de Apresentação

- Modal em estilo presentation sheet que se abre ao clicar no botão "CARTEIRA"
- Design nativo seguindo as diretrizes de cada plataforma
- Preview do cartão antes de adicionar à carteira

### 📱 Suporte Multi-plataforma

- **iOS**: Integração com Apple Wallet
- **Android**: Integração com Google Pay
- **Compartilhamento**: Opção universal para compartilhar dados do cartão

### 🎨 Interface do Modal

- Header com botões "Cancelar" e "Adicionar"
- Preview do cartão FSPH com os dados do usuário
- Botões específicos para cada plataforma
- Seção informativa sobre como funciona
- Design responsivo e acessível

## 🔧 Componentes Criados

### `AddToWalletModal.tsx`

Componente principal do modal que gerencia:

- Estado de visibilidade do modal
- Interações com as plataformas de carteira digital
- Interface de usuário adaptativa

### `walletService.ts`

Serviço que contém:

- Tipos TypeScript para passes do Apple Wallet
- Funções para adicionar aos diferentes tipos de carteira
- Simulação das integrações (pronto para implementação real)
- Função de compartilhamento de dados

## 🚀 Como Usar

1. **Abrir Modal**: Clique no botão "CARTEIRA" no cartão principal
2. **Escolher Plataforma**:
   - iOS: "Adicionar ao Apple Wallet"
   - Android: "Adicionar ao Google Pay"
   - Universal: "Compartilhar Cartão"
3. **Confirmar**: O modal mostra informações sobre próximos passos

## 🔮 Implementação Completa (Próximos Passos)

### Para Apple Wallet:

```typescript
// Necessário para produção:
1. Certificado de desenvolvedor Apple
2. Configurar Pass Type ID no Apple Developer
3. Servidor backend para gerar arquivos .pkpass assinados
4. Biblioteca react-native-wallet-manager
```

### Para Google Pay:

```typescript
// Necessário para produção:
1. Conta Google Pay API for Passes
2. Service Account configurado
3. JWT token assinado
4. Configuração de classes de passes
```

## 📋 Dados do Cartão

O cartão contém as seguintes informações:

- **Nome**: GUILHERME SANTOS
- **Tipo Sanguíneo**: A+
- **CPF**: **\*.424.945-**
- **Próxima Doação**: 33 dias
- **Organização**: Fundação de Saúde Parreiras Horta

## 🛠️ Dependências Adicionadas

```json
{
  "expo-sharing": "^11.0.1"
}
```

## 🔗 Arquivos Modificados

- `app/(tabs)/index.tsx` - Adicionado estado e botão para abrir modal
- `components/AddToWalletModal.tsx` - Novo componente de modal
- `lib/walletService.ts` - Novo serviço para gerenciar carteiras digitais

## 💡 Funcionalidades Atuais

- ✅ Modal de apresentação nativo
- ✅ Preview do cartão
- ✅ Detecção de plataforma (iOS/Android)
- ✅ Interface adaptativa
- ✅ Simulação das funcionalidades
- ✅ Compartilhamento básico
- ✅ Feedback visual e informativo

## 🎯 Próximas Melhorias

- [ ] Implementação real do Apple Wallet (.pkpass)
- [ ] Implementação real do Google Pay (JWT tokens)
- [ ] Adicionar animações de transição
- [ ] Suporte a múltiplos cartões
- [ ] Sincronização com backend
- [ ] Notificações push quando elegível para doação
