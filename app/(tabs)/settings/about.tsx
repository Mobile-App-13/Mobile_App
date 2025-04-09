import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title with Icon */}
      <View style={styles.titleRow}>
        <Icon name="info" size={28} color="#333" style={styles.titleIcon} />
        <Text style={styles.title}>About</Text>
      </View>

    
        {/* Info Rows */}
      <View style={styles.infoRow}>
        <Icon name="app-settings-alt" size={20} color="#555" style={styles.infoIcon} />
        <Text style={styles.info}>App version: 1.0.0</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="engineering" size={20} color="#555" style={styles.infoIcon} />
        <Text style={styles.info}>Developed by: SL-G13</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="email" size={20} color="#555" style={styles.infoIcon} />
        <Text style={styles.info}>Contact: support@slg13.com</Text>
      </View>

      
      <View style={styles.box}>
        <Text style={styles.paragraph}>
          Welcome to Expense Tracker, 
          
           
          {"\n\n"}

          your all-in-one solution for managing daily finances with ease and clarity. 
          We built this app to help individuals and businesses track personal and organizational expenses, ensuring every penny is accounted for. 
          Whether you're keeping tabs on fuel costs, office spending, or just your everyday budget, our intuitive features make it simple and stress-free.

          
          {"\n\n"}


          Our goal is to empower you with tools that give financial clarity, insightful analytics, and easy data management—anytime, anywhere.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 40,
  },
  
  titleIcon: {
    marginRight: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2a2a2a',
    alignSelf: 'center',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  infoIcon: {
    marginRight: 8,
  },

  info: {
    fontSize: 16,
    color: '#555',
  },

  box: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    textAlign: 'justify',
  },
  
});

export default AboutUs;
