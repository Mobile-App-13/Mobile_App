import { Stack } from "expo-router";

function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:'Settings', headerShown:false}} />
      
      <Stack.Screen name="about" options={{ headerTitle: '', headerBackTitle: 'Settings' }} />
      <Stack.Screen name="appearance" options={{ headerTitle: '', headerBackTitle: 'Settings' }} />
      <Stack.Screen name="data-backup" options={{ headerTitle: '', headerBackTitle: 'Settings' }} />
      <Stack.Screen name="general" options={{ headerTitle: '', headerBackTitle: 'Settings' }} />
      <Stack.Screen name="language-currency" options={{ headerTitle: '', headerBackTitle: 'Settings' }} />
      <Stack.Screen name="security" options={{ headerTitle: '', headerBackTitle: 'Settings' }} />
    </Stack>
  );
}

export default SettingsLayout;