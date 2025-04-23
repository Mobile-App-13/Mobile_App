import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs,query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig"; 
import { getAuth } from "firebase/auth";  // for create individual collection for each user







// this is the main function for the page......................................................

export default function ExpensesScreen() {
    const [expenses, setExpenses] = useState<{ id: string; [key: string]: any }[]>([]);




    const router = useRouter();




 // fetch data of expense from database......................................................   
    const fetchExpenses = async () => {

        const auth = getAuth(); 
        const user = auth.currentUser; // Get the currently logged-in user
        if (!user) {
            return;
        }
        const userId = user.uid; // Get the user's unique ID
        
        try {
            const q = query(
                collection(db, "users", userId, "personalExpenses"), // Create a sub-collection for each user

                // order by("timestamp", "desc") when fetching data from firebase
                orderBy("timestamp", "desc")
            )
            const querySnapshot = await getDocs(q);
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
        <View style={{ flex: 1, padding: 5, backgroundColor: "#f5f5f5",  }}>
        {/* Header Image */}
            <Image
                source={require("../../../../assets/images/PersonalExpenseimage.png")}
                style={{ width: "100%", height: 330, resizeMode: "cover", borderRadius: 5, marginBottom: 10 }}
                />
            <Text style={styles.title}>PERSONEL {"\n"}           EXPENSES</Text>



        {/* Add Expense Button */}
        <TouchableOpacity 
            style={styles.button} 
            onPress={()=>router.push("/expenses/PersonalExpense/add-expense")}
            
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
                onPress={()=>router.push(`/expenses/PersonalExpense/${item.id}`)}
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
    fontSize: 40, 
    fontWeight: "bold", 
    color: "white",
    alignItems:"center",
    position:"absolute",
    top: 50,
    left: 60,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 15,
 },

  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    paddingTop: 18,
    margin: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
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



