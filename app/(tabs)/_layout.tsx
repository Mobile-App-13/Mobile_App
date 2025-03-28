import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';


function TabLayOut(){

    return(
        <Tabs>
            <Tabs.Screen name="home" options={{
                title:'home',
                tabBarIcon: ({size,color})=>(<Ionicons name="wallet-outline" size={size} color={color} />),
                headerShown:false
                }} />
            <Tabs.Screen name="expenses" options={{
                title:'Expenses',
                tabBarIcon: ({size,color})=>(<Ionicons name="wallet-outline" size={size} color={color} />),
                headerShown:false
                }} />
            <Tabs.Screen name="analysis" options={{
                title:'Analysis',
                tabBarIcon: ({size,color})=>(<AntDesign name="linechart" size={size} color={color} />),
                headerShown:false
                }} />
            <Tabs.Screen name="settings" options={{
                title:'Settings',
                tabBarIcon: ({size,color})=>(<Feather name="settings" size={size} color={color} />),
                headerShown:false
                }} />
        </Tabs>
    )
}

export default TabLayOut;