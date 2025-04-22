import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext } from '../../context/ThemeContext';

export default function SecurityScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode ?? false;
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark-outline" size={22} color={styles.icon.color} style={styles.headerIcon} />
        <Text style={styles.heading}>Security Settings</Text>
      </View>

      {/* Biometric Unlock */}
      <View style={styles.option}>
        <FontAwesome5 name="fingerprint" size={20} color={styles.icon.color} style={styles.icon} />
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
        <MaterialIcons name="pin" size={24} color={styles.icon.color} style={styles.icon} />
        <Text style={styles.label}>Change PIN</Text>
      </TouchableOpacity>

      {/* Two-Factor Authentication */}
      <TouchableOpacity style={styles.option}>
        <Ionicons name="lock-closed-outline" size={24} color={styles.icon.color} style={styles.icon} />
        <Text style={styles.label}>Two-Factor Authentication</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: isDarkMode ? '#000' : '#fff',
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
      color: isDarkMode ? '#fff' : '#333',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#444' : '#e0e0e0',
    },
    icon: {
      marginRight: 16,
      width: 28,
      textAlign: 'center',
      color: isDarkMode ? '#ccc' : '#4a4a4a',
    },
    label: {
      fontSize: 16,
      color: isDarkMode ? '#ccc' : '#4a4a4a',
    },
    spacer: {
      flex: 1,
    },
  });
