import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";




function HomeScreen () {


  const router = useRouter();

  return (
    <View style={styles.container}>
      

      <Image source={require("../../../assets/images/Home image.jpg")} style={styles.headerImage} />

      
      
      <Text style={styles.title}>EXPENSE TRACKER</Text>
      <Text style={styles.subtitle}>We Remember For You...!</Text>
      <Text style={styles.description}>
        Record your daily expenses on a personal and organizational basis. At the end of the month, generate reports with invoices.
      </Text>

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Personal Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Organizational Expenses</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};





export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 14,
    color: "#444",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  }
  
});
