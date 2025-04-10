import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

//  logout auth imports .......................
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";


export default function SettingsScreen() {
    const router = useRouter();



      // handleLogout function for testing purpose only.............................................
      const handleLogout = async () => {
        try {
          await signOut(auth);
          alert("User logged out successfully!");
    
          router.push("/auth_Screens/login")
    
        } catch (error) {
          console.error("Error logging out: ", error);
        }
      }
      //.............................................................




    return (
        <ScrollView
        style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 5,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        >
        {/* Header */}
        <View style={{ position: 'relative', width: '100%', height: 150 }}>
            <Image
                source={require('@/assets/images/Settings.png')} 
                style={{
                width: '100%',
                height: '100%',
                borderRadius: 5,
                resizeMode: 'cover',
                }}
            />
            <View
                style={{
                position: 'absolute',
                top: '40%',
                left: 0,
                right: 0,
                alignItems: 'center',
                transform: [{ translateY: -10 }],
                }}
            >
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
                Settings
                </Text>
            </View>
        </View>

        {/* Buttons */}
        <View style={{ padding: 20 }}>
            {/* General */}
            <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#F6F7FB',
                borderRadius: 12,
                marginBottom: 12,
            }}
            onPress={() => router.push('/(tabs)/settings/general')}
            >
            <Ionicons name="home-outline" size={20} color="#5A5A89" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, color: '#2D2D2D' }}>General</Text>
            </TouchableOpacity>

            {/* Language & Currency */}
            <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#F6F7FB',
                borderRadius: 12,
                marginBottom: 12,
            }}
            onPress={() => router.push('/(tabs)/settings/language-currency')}
            >
            <Ionicons name="globe-outline" size={20} color="#5A5A89" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, color: '#2D2D2D' }}>Language & Currency</Text>
            </TouchableOpacity>

            {/* Security */}
            <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#F6F7FB',
                borderRadius: 12,
                marginBottom: 12,
            }}
            onPress={() => router.push('/(tabs)/settings/security')}
            >
            <Ionicons name="shield-checkmark-outline" size={20} color="#5A5A89" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, color: '#2D2D2D' }}>Security</Text>
            </TouchableOpacity>

            {/* Data & Backup */}
            <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#F6F7FB',
                borderRadius: 12,
                marginBottom: 12,
            }}
            onPress={() => router.push('/(tabs)/settings/data-backup')}
            >
            <Ionicons name="cloud-upload-outline" size={20} color="#5A5A89" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, color: '#2D2D2D' }}>Data & Backup</Text>
            </TouchableOpacity>

            {/* Appearance */}
            <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#F6F7FB',
                borderRadius: 12,
                marginBottom: 12,
            }}
            onPress={() => router.push('/(tabs)/settings/appearance')}
            >
            <Ionicons name="color-palette-outline" size={20} color="#5A5A89" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, color: '#2D2D2D' }}>Appearance</Text>
            </TouchableOpacity>

            {/* About & Updates */}
            <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#F6F7FB',
                borderRadius: 12,
                marginBottom: 12,
            }}
            onPress={() => router.push('/(tabs)/settings/about')}
            >
            <Ionicons name="information-circle-outline" size={20} color="#5A5A89" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, color: '#2D2D2D' }}>About & Updates</Text>
            </TouchableOpacity>

            {/* Log Out Button */}
            <TouchableOpacity
            style={{
                marginTop: 20,
                backgroundColor: '#1D7FF7',
                paddingVertical: 12,
                borderRadius: 24,
                alignItems: 'center',
            }} 
            
            onPress={handleLogout}
            >
                
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Log Out</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
}
