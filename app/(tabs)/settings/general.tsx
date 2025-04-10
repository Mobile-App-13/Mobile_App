import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { FontAwesome, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';

export default function GeneralScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>

      {/* Header with Icon */}
      <View style={styles.header}>
        <Entypo name="home" size={22} color="#4a4a4a" style={styles.homeIcon} />
        <Text style={styles.heading}>General Settings</Text>
      </View>

      {/* Account*/}
      <TouchableOpacity style={styles.option}>
        <FontAwesome name="user" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Account</Text>
      </TouchableOpacity>

      {/* Notifications with Switch */}
      <View style={styles.option}>
        <Ionicons name="notifications-outline" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Notifications</Text>
        <View style={styles.spacer} />
        <Switch
             value={notificationsEnabled}
             onValueChange={setNotificationsEnabled}
             thumbColor={notificationsEnabled ? '#4DA6FF' : '#f4f3f4'}
             trackColor={{ false: '#ccc', true: '#B3DAFF' }}
/>

      </View>

      {/* Privacy Option */}
      <TouchableOpacity style={styles.option}>
        <MaterialIcons name="privacy-tip" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Privacy</Text>
      </TouchableOpacity>

      {/* Sync  */}
      <TouchableOpacity style={styles.option}>
        <MaterialIcons name="sync" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Sync Settings</Text>
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
  homeIcon: {
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
