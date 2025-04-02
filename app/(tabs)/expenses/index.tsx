import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";



// initial trial data set for delete....................................................................
const expensesData = [
    { id: "1", name: "Groceries", price: "$ 50", date:"19.03.2025", icon: "shopping-cart" },
    { id: "2", name: "Utilities", price: "$ 100", date:"20.03.2025", icon: "lightbulb" },
    { id: "3", name: "Transportation", price: "$ 30", date:"22.03.2025", icon: "directions-car" },
    { id: "4", name: "Entertainment", price: "$ 70", date:"24.03.2025", icon: "movie" },
    { id: "5", name: "Dining Out", price: "$ 40", date:"26.03.2025", icon: "restaurant" },
    { id: "6", name: "Shopping", price: "$ 80", date:"26.03.2025", icon: "shopping-bag" }, 
    { id: "7", name: "Health & Fitness", price: "$60", date:"26.03.2025", icon: "fitness-center" },
    { id: "8", name: "Travel", price: "$ 200", date:"26.03.2025", icon: "flight" },
    { id: "9", name: "Miscellaneous", price: "$ 20", date:"26.03.2025", icon: "more-horiz" },   
];




// this is the main function for the page......................................................

export default function ExpensesScreen() {
    const [expenses, setExpenses] = useState(expensesData);




    const router = useRouter();

    


  // retunr part of the page......................................................

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}>
        {/* Header Image */}
            <Image
                source={require("../../../assets/images/Expenseimage.png")}
                style={{ width: "100%", height: 200, resizeMode: "cover", borderRadius: 10 }}
                />
            <Text style={styles.title}>PERSONEL EXPENSES</Text>



        {/* Add Expense Button */}
        <TouchableOpacity 
            style={styles.button} 
            onPress={()=>router.push("/(tabs)/expenses/add-expense")}
            
            >
              <Text style={styles.buttonText}>Add a new Expense</Text>
        </TouchableOpacity>            




        {/* Expense List  rendering to a flat list*/}
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={styles.detailrow}
                onPress={()=>router.push(`/(tabs)/expenses/${item.id}`)}
            >


                <MaterialIcons name={item.icon} size={26} color="black" style={{ marginRight: 50, marginLeft:20 }} />

                <View style ={styles.iconRender}>
                    <Text style={styles.textRender}>{item.name}</Text>
                    <Text style={styles.dateRender}>{item.date}</Text>
                </View>

                <Text style={styles.priceRender}>{item.price}</Text>
            </TouchableOpacity>
        )}
        />
    </View>
    );
}





// all styles for the page......................................................

const styles = StyleSheet.create({
  title: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginVertical: 10 },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  detailrow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconRender: { 
    flex: 1, 
    flexDirection: "column",
    alignItems: "flex-start",
    },
    textRender: {
        flex: 1, 
        fontSize: 16 
    },
    dateRender: {
        flex: 1, 
        fontSize: 12, 
        color: "#666" 
    },
    priceRender: {
        flex: 1, 
        fontSize: 16, 
        color: "black", 
        fontWeight: "bold", 
        textAlign: "right" 
    },
    

 
  
});



