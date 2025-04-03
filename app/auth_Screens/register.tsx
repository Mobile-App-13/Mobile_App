// react imports 
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";



// firebase authondication imports
import {auth, db} from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {doc, serverTimestamp, setDoc} from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';



// page main function part......................................................
function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();






// user registration handle function with firebase setDoc method (automatically hash the password)....
const handleRegister = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: user.email,
      name: "new User" ,
      profile_picture: null,
      created_at: serverTimestamp(),

    });

    alert("User registered successfully!");

    router.push("/auth_Screens/login");
  } catch (error) {
    console.error("Error adding details: ", error);
  }
};





// page return part......................................................
return (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={require("../../assets/images/loginimage.png")} style={styles.image} />
      <Text style={styles.title}>EXPENSE{"\n"}        TRACKER</Text>
    </View>

    <View style={styles.inputContainer}>

      <MaterialIcons 
      name="person" 
      size={20} 
      color="#aaa" 
      style={styles.icon} />

      <TextInput 
      placeholder="Firstname Lastname" 
      value={name} onChangeText={setName} 
      style={styles.input} 
      placeholderTextColor="#aaa" />

    </View>

    <View style={styles.inputContainer}>

      <MaterialIcons 
      name="email" size={20} 
      color="#aaa" 
      style={styles.icon} />

      <TextInput 
      placeholder="Email" 
      value={email} 
      onChangeText={setEmail} 
      style={styles.input} 
      placeholderTextColor="#aaa" />

    </View>
    
    <View style={styles.inputContainer}>

      <MaterialIcons 
      name="lock" 
      size={20} 
      color="#aaa" 
      style={styles.icon} />

      <TextInput 
      placeholder="Password" 
      value={password} 
      onChangeText={setPassword} 
       style={styles.input} 
       placeholderTextColor="#aaa" />

    </View>

    <TouchableOpacity style={styles.button} onPress={handleRegister}>

      <Text style={styles.buttonText}>Sign Up</Text>

    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push('/auth_Screens/login')}>
      <Text style={styles.linkText}>I have an account already</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#000" 
  },

  imageContainer: { 
    position: "relative", 
    width: "100%" 
  },

  image: { 
    width: "100%", 
    height: 200, 
    resizeMode: "cover" 
  },

  title: { 
    position: "absolute", 
    top: "40%", 
    left: "50%", 
    transform: [{ translateX: -50 }], 
    color: "white", 
    fontSize: 24, 
    fontWeight: "bold" 
  },

  inputContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "90%", 
    backgroundColor: "#222", 
    borderRadius: 8, 
    padding: 12, 
    marginVertical: 5 
  },

  icon: { 
    marginRight: 10 
  },
  
  input: { 
    flex: 1, 
    color: "white" 
  },
  
  button: { 
    backgroundColor: "#007bff", 
    padding: 12, 
    borderRadius: 8, 
    width: "90%", 
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

export default SignupScreen;