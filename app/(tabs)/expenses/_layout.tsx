// app/(tabs)/expenses/_layout.tsx
import { Stack } from "expo-router";

export default function ExpensesLayout() {

    
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
