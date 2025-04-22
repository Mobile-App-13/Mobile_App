// react imports 
import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { ThemeContext } from "../context/ThemeContext";



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
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode ?? false;

  const styles = getStyles(isDarkMode);





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
      <Text style={styles.title}>EXPENSE{"\n"} TRACKER</Text>
    </View>

    <View style={styles.inputContainer}>
      <MaterialIcons name="person" size={20} color={isDarkMode ? "#ccc" : "black"} style={styles.icon} />
      <TextInput
        placeholder="Firstname Lastname"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
      />
    </View>

    <View style={styles.inputContainer}>
      <MaterialIcons name="email" size={20} color={isDarkMode ? "#ccc" : "black"} style={styles.icon} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
      />
    </View>

    <View style={styles.inputContainer}>
      <MaterialIcons name="lock" size={20} color={isDarkMode ? "#ccc" : "black"} style={styles.icon} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
        secureTextEntry
      />
    </View>

    <TouchableOpacity style={styles.button} onPress={handleRegister}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push("/auth_Screens/login")}>
      <Text style={styles.linkText}>I have an account already</Text>
    </TouchableOpacity>
  </View>
);
}

const getStyles = (isDarkMode: boolean) =>
StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: isDarkMode ? "#000" : "#fff",
    paddingHorizontal: 10,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: isDarkMode ? "#555" : "gray",
    backgroundColor: isDarkMode ? "#111" : "#fff",
    marginVertical: 5,
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
    marginTop: 20,
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

export default SignupScreen;