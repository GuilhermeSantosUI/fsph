# ScreenTemplate

Componente wrapper que combina SafeAreaView + KeyboardAvoidingView + ScrollView para telas que precisam de scroll e proteção contra notch/câmera.

Uso rápido:

```tsx
import ScreenTemplate from '../components/ScreenTemplate';

export default function MyScreen() {
  return (
    <ScreenTemplate className="flex-1 bg-white p-6">
      {/* seu conteúdo aqui */}
    </ScreenTemplate>
  );
}
```

Props relevantes:

- `children`: conteúdo da tela.
- `className`: classes tailwind aplicadas no SafeAreaView (ex.: `flex-1 bg-white p-6`).
- `contentContainerStyle`: estilo aplicado ao contentContainer do ScrollView.
- `edges`: array opcional (`['top','bottom','left','right']`) para SafeAreaView.
- `showsVerticalScrollIndicator`: boolean para mostrar a barra de scroll.

Observações:

- O componente já aplica `keyboardShouldPersistTaps="handled"` e `KeyboardAvoidingView` com comportamento orientado para iOS.
- Para telas sem necessidade de scroll, envolva o conteúdo em uma `View` ou passe `contentContainerStyle={{ flexGrow: 0 }}`.
