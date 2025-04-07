import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function AppearanceScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header with Eye Icon */}
      <View style={styles.header}>
        <Ionicons name="eye-outline" size={22} color="#4a4a4a" style={styles.headerIcon} />
        <Text style={styles.heading}>Appearance</Text>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.option}>
        <Ionicons name="moon-outline" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Dark Mode</Text>
        <View style={styles.spacer} />
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? '#4DA6FF' : '#f4f3f4'}
          trackColor={{ false: '#ccc', true: '#B3DAFF' }}
        />
      </View>

      {/* Font Size Option */}
      <TouchableOpacity style={styles.option}>
        <MaterialIcons name="format-size" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Font Size</Text>
      </TouchableOpacity>

      {/* Theme Color Option */}
      <TouchableOpacity style={styles.option}>
        <FontAwesome5 name="palette" size={20} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Theme Color</Text>
      </TouchableOpacity>

      {/* Reset to Default */}
      <TouchableOpacity style={styles.option}>
        <Ionicons name="refresh-circle-outline" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Reset Appearance</Text>
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
