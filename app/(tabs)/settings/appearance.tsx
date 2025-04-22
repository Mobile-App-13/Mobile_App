import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext'; // Make sure the path is correct

export default function AppearanceScreen() {
  const { isDarkMode, colors, toggleDarkMode } = useTheme(); // <- fixed this line
  const darkMode = isDarkMode;
  

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Eye Icon */}
      <View style={styles.header}>
        <Ionicons name="eye-outline" size={22} color={colors.text} style={styles.headerIcon} />
        <Text style={[styles.heading, { color: colors.text }]}>Appearance</Text>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.option}>
        <Ionicons name="moon-outline" size={24} color={colors.text} style={styles.icon} />
        <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
        <View style={styles.spacer} />
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode} // <- fixed here
          thumbColor={darkMode ? '#4DA6FF' : '#f4f3f4'}
          trackColor={{ false: '#ccc', true: '#B3DAFF' }}
        />
      </View>

      {/* Other options like Font Size, Theme Color, etc. */}
      {/* You can similarly update their styles */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 16,
    width: 28,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
  },
  spacer: {
    flex: 1,
  },
});

