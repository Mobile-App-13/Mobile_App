import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/loginimage.png")} style={styles.image} />
      <Text style={styles.title}>EXPENSE TRACKER</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress ={() => router.push('/(tabs)/home')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth_Screens/register")}>
        <Text style={styles.linkText}>I don't have an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: "center", 
    padding: 20 },

  image: { 
    width: "100%", 
    height: 200, 
    resizeMode: "cover" },

  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginVertical: 10 },

  input: { 
    width: "90%", 
    padding: 12, 
    borderWidth: 1, 
    borderRadius: 8, 
    marginVertical: 5 },

  button: { 
    backgroundColor: "#007bff", 
    padding: 12, 
    borderRadius: 8, 
    width: "90%", 
    alignItems: "center", 
    marginTop: 10 },

  buttonText: { 
    color: "white", 
    fontWeight: "bold" },

  linkText: { 
    marginTop: 10, 
    color: "#007bff" },

});

export default LoginScreen;
