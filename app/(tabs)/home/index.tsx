import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


// temparary logout auth imports .......................
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";




// page main function part......................................................
function HomeScreen () {


  // temparary handleLogout function for testing purpose only.............................................
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("User logged out successfully!");

      router.push("/auth_Screens/login")

    } catch (error) {
      console.error("Error logging out: ", error);
    }
  }
  //.............................................................



  // router for navigation......................................................
  const router = useRouter();




  // retun part for page......................................................
  return (
    <View style={styles.container}>
      

      <Image source={require("../../../assets/images/Home image.jpg")} style={styles.headerImage} />

      
      
      <Text style={styles.title}>EXPENSE TRACKER</Text>
      <Text style={styles.subtitle}>We Remember For You...!</Text>
      <Text style={styles.description}>
        Record your daily expenses on a personal and organizational basis. At the end of the month, generate reports with invoices.
      </Text>

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/expenses")}>
          <Text style={styles.buttonText}>Personal Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/expenses")}>
          <Text style={styles.buttonText}>Organizational Expenses</Text>
        </TouchableOpacity>
      </View>


      {/* temarary logout button for testing purpose only.............................................*/}
      <TouchableOpacity style={styles.buttonlogout} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      
    </View>
  );
};




// all styles for the page......................................................

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
    justifyContent: "space-between",
    marginBottom: 60,
    gap: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 30,
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
