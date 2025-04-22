// react imports 
import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { Theme, ThemeContext } from "../context/ThemeContext"; // adjust path based on your project structure

// firebase authondication imports

import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";




// page main function part......................................................
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode ?? false;

  const styles = getStyles(isDarkMode);



  // handle loging function with firebase authentication.............
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // for get the token only 
      const user = userCredential.user;
      const token = await getIdToken(user);

      //alert("User logged in successfully!");

      router.push("/(tabs)/home");


    } catch (error) {
      console.error("Error logging or invalid authondication: ", error);
    }
  }





  return (
    <View style={styles.container}>
      <View style={{ flex: 4 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/loginimage.png")}
            style={styles.image}
          />
          <Text style={styles.title}>EXPENSE{"\n"} TRACKER</Text>
        </View>
      </View>

      <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={isDarkMode ? "#ccc" : "black"}
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={isDarkMode ? "#aaa" : "gray"}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={isDarkMode ? "#ccc" : "black"}
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={isDarkMode ? "#aaa" : "gray"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth_Screens/register")}>
          <Text style={styles.linkText}>I don't have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#000" : "#fff",
      paddingHorizontal: 10,
    },
    image: {
      width: 500,
      height: 400,
      resizeMode: "cover",
      borderRadius: 5,
    },
    title: {
      fontSize: 60,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
      position: "absolute",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "90%",
      borderWidth: 1,
      borderColor: isDarkMode ? "#555" : "gray",
      borderRadius: 8,
      paddingHorizontal: 10,
      marginVertical: 5,
      backgroundColor: isDarkMode ? "#111" : "#fff",
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      padding: 12,
      color: isDarkMode ? "#fff" : "#000",
    },
    button: {
      backgroundColor: "#007bff",
      padding: 15,
      borderRadius: 8,
      width: 200,
      alignItems: "center",
      marginTop: 40,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    linkText: {
      marginTop: 15,
      color: "#007bff",
      fontSize: 15,
    },
  });

export default LoginScreen

// Removed the custom useContext function as it is unnecessary.
