import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function DataBackupScreen() {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);

  return (
    <View style={styles.container}>
        
      {/* Header with Icon */}
      <View style={styles.header}>
        <Ionicons name="cloud-outline" size={22} color="#4a4a4a" style={styles.headerIcon} />
        <Text style={styles.heading}>Data & Backup</Text>
      </View>

      {/* Auto Backup */}
      <View style={styles.option}>
        <Ionicons name="cloud-upload-outline" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Automatic Backup</Text>
        <View style={styles.spacer} />
        <Switch
          value={autoBackupEnabled}
          onValueChange={setAutoBackupEnabled}
          thumbColor={autoBackupEnabled ? '#4DA6FF' : '#f4f3f4'}
          trackColor={{ false: '#ccc', true: '#B3DAFF' }}
        />
      </View>

      {/* Export Data */}
      <TouchableOpacity style={styles.option}>
        <MaterialCommunityIcons name="file-export" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Export Data</Text>
      </TouchableOpacity>

      {/* Import Data */}
      <TouchableOpacity style={styles.option}>
        <MaterialCommunityIcons name="file-import" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Import Data</Text>
      </TouchableOpacity>

      {/* Clear Cache */}
      <TouchableOpacity style={styles.option}>
        <FontAwesome name="trash" size={22} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Clear Cache</Text>
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
    fontSize: 22,
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
