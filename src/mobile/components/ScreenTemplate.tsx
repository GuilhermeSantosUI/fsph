import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

type ScreenTemplateProps = {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  showsVerticalScrollIndicator?: boolean;
  scrollViewProps?: Partial<ScrollViewProps>;
  className?: string;
};

export default function ScreenTemplate({
  children,
  contentContainerStyle,
  edges = ['top', 'bottom'],
  showsVerticalScrollIndicator = false,
  scrollViewProps,
  className,
}: ScreenTemplateProps) {
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <SafeAreaView
      edges={edges}
      className={className ?? 'flex-1'}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardBehavior as any}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
