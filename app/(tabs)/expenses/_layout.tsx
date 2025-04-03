import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
        <Stack.Screen name='index' options={{title:"Expense Details", headerShown:false}} />
        <Stack.Screen name='[id]' options={{title:"Expense Summery"}} />
        <Stack.Screen name='add-expense' options={{title:"Add Expense", headerShown:true}} />
    </Stack>
  )
}