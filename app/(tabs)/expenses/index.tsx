import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";  






// this is the main function for the page......................................................

export default function ExpensesScreen() {
    const [expenses, setExpenses] = useState<{ id: string; [key: string]: any }[]>([]);




    const router = useRouter();




 // fetch data of expense from database......................................................   
    const fetchExpenses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "personalExpenses"));
            const expensesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setExpenses(expensesList);
        } catch (error) {
            console.error("Error fetching expenses: ", error);
        }
    };





        // fetch data of expense from database......................................................

    useEffect(() => {
         fetchExpenses();
    }, []);

    


  // retunr part of the page......................................................

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}>
        {/* Header Image */}
            <Image
                source={require("../../../assets/images/PersonalExpenseimage.png")}
                style={{ width: "100%", height: 400, resizeMode: "cover", borderRadius: 10 }}
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


                <MaterialIcons 
                    name={item.categoryIcon} 
                    size={26} 
                    color="black" 
                    style={{ marginRight: 50, marginLeft:20 }} />

                <View style ={styles.iconRender}>
                    <Text style={styles.textRender}>{item.remark}</Text>
                    <Text style={styles.dateRender}>{item.invoiceDate}</Text>
                </View>

                <Text style={styles.priceRender}>€ {item.totalAmount}</Text>
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



