import { Stack } from "expo-router";

function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:'Settings', headerShown:false}} />
      <Stack.Screen name="about" options={{title:'About'}} />
      <Stack.Screen name="appearance" options={{title:'Appearance'}} />
      <Stack.Screen name="data-backup" options={{title:'Data Backup'}} />
      <Stack.Screen name="general" options={{title:'General'}} />
      <Stack.Screen name="language-currency" options={{title:'Language & Currency'}} />
      <Stack.Screen name="security" options={{title:'Security'}} />
    </Stack>
  );
}

export default SettingsLayout;