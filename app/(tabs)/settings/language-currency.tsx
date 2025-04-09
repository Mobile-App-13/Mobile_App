import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LanguageCurrencyScreen() {
  return (
    <View style={styles.container}>

      {/* Header with Icon */}
      <View style={styles.header}>
        <Ionicons name="globe-outline" size={22} color="#4a4a4a" style={styles.headerIcon} />
        <Text style={styles.heading}>Language & Currency</Text>
      </View>

      {/* Language */}
      <TouchableOpacity style={styles.option}>
        <FontAwesome5 name="language" size={20} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Language</Text>
        <View style={styles.spacer} />
        <Text style={styles.value}>English</Text>
      </TouchableOpacity>

      {/* Currency */}
      <TouchableOpacity style={styles.option}>
        <MaterialCommunityIcons name="currency-usd" size={22} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Currency</Text>
        <View style={styles.spacer} />
        <Text style={styles.value}>EURO</Text>
      </TouchableOpacity>

      {/* Region */}
      <TouchableOpacity style={styles.option}>
        <Ionicons name="location-outline" size={22} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Region</Text>
        <View style={styles.spacer} />
        <Text style={styles.value}>Finland</Text>
      </TouchableOpacity>

      {/* Reset */}
      <TouchableOpacity style={styles.option}>
        <Ionicons name="refresh-circle-outline" size={24} color="#4a4a4a" style={styles.icon} />
        <Text style={styles.label}>Reset Preferences</Text>
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
  value: {
    fontSize: 16,
    color: '#999',
  },
});
