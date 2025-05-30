import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext"; // Adjusted path based on project structure





// page main function part......................................................
function HomeScreen () {


  // router for navigation......................................................
  const router = useRouter();

  const { isDarkMode } = useTheme(); // Use your custom theme hook

  const styles = getStyles(isDarkMode);

  // retun part for page......................................................
  return (
    <View style={styles.container}>
      

      <Image source={require("../../../assets/images/Home image.jpg")} style={styles.headerImage} />

      
      
      <Text style={styles.title}>EXPENSE {"\n"}     TRACKER</Text>
      <Text style={styles.subtitle}>We Remember For You...!</Text>
      <Text style={styles.description}>
        Record your daily expenses on a personal and organizational basis. At the end of the month, generate reports with invoices.
      </Text>

      
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/expenses?type=personal")}>
          <Text style={styles.buttonText}>Personal {"\n"} Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/expenses?type=org")}>
          <Text style={styles.buttonText}>Organizational {"\n"} Expenses</Text>
        </TouchableOpacity>
      </View>


      
    </View>
  );
};




// all styles for the page......................................................

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : "#fff",
      alignItems: "center",
      paddingTop: 5,
      padding: 5,
    },
    headerImage: {
      width: "100%",
      height: 300,
      resizeMode: "cover",
      borderRadius: 5,
      shadowColor: "#000",
    },
    title: {
      fontSize: 50,
      fontWeight: "bold",
      color: "white",
      alignItems: "center",
      position: "absolute",
      padding: 20,
      top: 65,
      left: 40,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      borderRadius: 15,
    },
    subtitle: {
      fontSize: 18,
      color: "white",
      alignItems: "center",
      position: "absolute",
      top: 210,
      left: 155,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    description: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      padding: 20,
      marginVertical: 20,
      marginHorizontal: 60,
      borderRadius: 10,
      backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0, 0, 0, 0.1)",
      shadowColor: "black",
      shadowOpacity: 0.9,
      color: isDarkMode ? "#ddd" : "#444",
    },
    buttonContainer: {
      flexDirection: "row",
      width: "100%",
      marginTop: 30,
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 18,
      gap: 18,
    },
    button: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#007BFF",
      padding: 18,
      borderColor: "rgba(36, 24, 143, 0.66)",
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: "center",
      shadowColor: "black",
      shadowOpacity: 0.8,
      height: 150,
    },
    buttonText: {
      fontSize: 18,
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
    buttonlogout: {
      backgroundColor: "#FF0000",
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
    },
  });


export default HomeScreen;
