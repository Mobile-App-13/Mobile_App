import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
        <Stack.Screen name='index' options={{title:"Expense Details",headerShown:false}} />
        <Stack.Screen name='[id]' options={{title:"" ,  headerBackTitle: 'Expense Details' }} />
        <Stack.Screen name='add-Org-expense' options={{title:"", headerBackTitle: 'Expense Details' }} />
    </Stack>
  )
}