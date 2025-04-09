// react imports 
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

// firebase authondication imports

import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";




// page main function part......................................................
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();




  // handle loging function with firebase authentication.............
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // for get the token only 
      const user = userCredential.user;
      const token = await getIdToken(user);

      alert("User logged in successfully!");

      router.push("/(tabs)/home");


    } catch (error) {
      console.error("Error logging or invalid authondication: ", error);
    }
  }





  return (
    <View style={styles.container}>
      {/* 1st Half*/}
      <View style={{ flex:4}}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
          <Image source={require("../../assets/images/loginimage.png")} style={styles.image} />
          <Text style={styles.title}>EXPENSE{"\n"}        TRACKER</Text>
        </View>
      </View>

      {/* 2nd Half*/}
      <View style={{ flex:6, justifyContent:"center", alignItems:"center"}}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="black" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
      
        <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="black" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
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
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor:"white"
  },
  imageContainer: {
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { 
    width: 500,
    height: 400,
    resizeMode: "cover",
    
  },
  title: { 
    fontSize: 60, 
    fontWeight: "bold", 
    color: "white",
    textAlign: "center",
    position:"absolute"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10
  },
  input: { 
    flex: 1,
    padding: 12, 
    color: "black"
  },
  button: { 
    backgroundColor: "#007bff", 
    padding: 12, 
    borderRadius: 8, 
    width: 200, 
    alignItems: "center", 
    marginTop: 10 
  },
  buttonText: { 
    color: "white", 
    fontWeight: "bold" 
  },
  linkText: { 
    marginTop: 10, 
    color: "#007bff" 
  },
});

export default LoginScreen