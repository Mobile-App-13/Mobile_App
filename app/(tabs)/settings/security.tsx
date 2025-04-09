import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function SecurityScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  return (
    <View style={styles.container}>
        
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark-outline" size={22} color="#4a4a4a" style={styles.headerIcon} />
        <Text style={styles.heading}>Security Settings</Text>
      </View>

      {/* Biometric Unlock */}
      <View style={styles.option}>
        <FontAwesome5 name="fingerprint" size={20} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Biometric Unlock</Text>
        <View style={styles.spacer} />
        <Switch
          value={biometricEnabled}
          onValueChange={setBiometricEnabled}
          thumbColor={biometricEnabled ? '#4DA6FF' : '#f4f3f4'}
          trackColor={{ false: '#ccc', true: '#B3DAFF' }}
        />
      </View>

      {/* Change PIN  */}
      <TouchableOpacity style={styles.option}>
        <MaterialIcons name="pin" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Change PIN</Text>
      </TouchableOpacity>

      {/* Two-Factor Authentication */}
      <TouchableOpacity style={styles.option}>
        <Ionicons name="lock-closed-outline" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Two-Factor Authentication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    marginRight: 8,
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  icon: {
    marginRight: 16,
    width: 28,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#4a4a4a',
  },
  spacer: {
    flex: 1,
  },
});
