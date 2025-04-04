import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
//import { Picker } from "@react-native-picker/picker";
//import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

function addExpenses(){
     

    const [invoiceDate, setInvoiceDate] = useState("");
    const [remark, setRemark] = useState("");
    const [invoiceDetails, setInvoiceDetails] = useState({
        company: "",
        address: "",
        referenceNumber: "",
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [amountWithoutTax, setAmountWithoutTax] = useState("");
    const [taxPercentage, setTaxPercentage] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [imageUri, setImageUri] = useState(null);





// defined categories for the Dropdown menu...................................
    const categories = [
        { name: "Shopping", icon: "shopping-cart" },
        { name: "Food", icon: "restaurant" },
        { name: "Transport", icon: "directions-car" },
        { name: "Utilities", icon: "lightbulb" },
        { name: "Health & Fitness", icon: "fitness-center" },
        { name: "Travel", icon: "flight" },
        { name: "Miscellaneous", icon: "more-horiz" },
      ];

      

// Category Picker function..................................................
    const handleSelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false);
    };
      
    
    
    /* Image Picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        if (!result.canceled) {
            setImageUri(result.uri);
          }
        }; 
        */    



      
        // Calculate Total Amount
        const calculateTotal = (amount, tax) => {
          if (amount && tax) {
            const total = parseFloat(amount) + (parseFloat(amount) * parseFloat(tax)) / 100;
            setTotalAmount(total.toFixed(2));
          }
        };


     /* 
        // Submit Expense to Firestore
        const handleSubmit = async () => {
            if (!invoiceDate || !remark || !category || !amountWithoutTax || !taxPercentage) {
                Alert.alert("Error", "Please fill in all required fields");
                return;
            }
      
            try {
                await addDoc(collection(db, "personalExpenses"), {
                    invoiceDate,
                    remark,
                    invoiceDetails,
                    category: selectedCategory.name,
                    categoryIcon: selectedCategory.icon,
                    amountWithoutTax: parseFloat(amountWithoutTax),
                    taxPercentage: parseFloat(taxPercentage),
                    totalAmount: parseFloat(totalAmount),
                    image: imageUri,
                    timestamp: serverTimestamp(),
                });
                Alert.alert("Success", "Expense added successfully");
            } catch (error) {
                console.error("Error adding document: ", error);
                Alert.alert("Error", "Failed to add expense");
            }
        };               
*/
    
      





// return part for loading the page......................................................
    return (


          <ScrollView style={{ padding: 20 }}>
            <Image
                            source={require("../../../assets/images/AddExpense.jpg")}
                            style={{ width: "100%", height: 350, resizeMode: "cover", borderRadius: 10 }}
                            />
            <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", paddingBottom: 20 }}>Add Expense</Text>
      
      



            {/* Invoice Date */}
            <TextInput
              placeholder="Invoice Date"
              value={invoiceDate}
              onChangeText={setInvoiceDate}
              style={styles.input}
            />


      
            {/* Remark */}
            <TextInput
              placeholder="Remark"
              value={remark}
              onChangeText={setRemark}
              style={styles.input}
            />

      
            {/* Invoice Details */}
            <TextInput placeholder="Company" value={invoiceDetails.company} onChangeText={(text) => setInvoiceDetails({ ...invoiceDetails, company: text })} style={styles.input} />
            <TextInput placeholder="Address" value={invoiceDetails.address} onChangeText={(text) => setInvoiceDetails({ ...invoiceDetails, address: text })} style={styles.input} />
            <TextInput placeholder="Ref. Number" value={invoiceDetails.referenceNumber} onChangeText={(text) => setInvoiceDetails({ ...invoiceDetails, referenceNumber: text })} style={styles.input} />
      





            {/* Dropdown Button  */}
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsOpen(!isOpen)}>
                <View style={styles.selectedItem}>
                    {selectedCategory ? (
                    <>
                        <Image source={selectedCategory.icon} style={styles.icon} />
                        <Text style={styles.selectedText}>{selectedCategory.name}</Text>
                    </>
                    ) : (
                    <Text style={styles.selectedText}>Choose a category</Text>
                    
                    )}
                    <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="black" />
                </View>
        
                
            </TouchableOpacity>



            {/* 🔽 Dropdown List */}
            {isOpen && (
                <View style={styles.dropdownMenu}>
                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelect(category)}>
                            <Image source={category.icon} style={styles.icon} />
                            <Text style={styles.optionText}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}




      
            {/* Amount Inputs */}
            <TextInput
              placeholder="Amount Without Tax"
              keyboardType="numeric"
              value={amountWithoutTax}
              onChangeText={(value) => {
                setAmountWithoutTax(value);
                calculateTotal(value, taxPercentage);
              }}
              style={styles.input}
            />
      



            <TextInput
              placeholder="Tax Percentage"
              keyboardType="numeric"
              value={taxPercentage}
              onChangeText={(value) => {
                setTaxPercentage(value);
                calculateTotal(amountWithoutTax, value);
              }}
              style={styles.input}
            />




      
            {/* Total Amount */}
            <TextInput placeholder="Total Amount" value={totalAmount} editable={false} style={styles.input} />



      
            {/* Image Picker */}
            <TouchableOpacity onPress={() => setImageUri(null)} style={styles.uploadButton}>
                <Text style={{ color: "blue", textAlign: "center" }}>Upload Document/Image 📤</Text>
            </TouchableOpacity>



      
            {/* Submit Button  onPress={handleSubmit}   */}
            <TouchableOpacity  style={styles.submitButton}>
              <Text style={{ color: "white", textAlign: "center" }}>Enter</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      };




      
      // all styles for the page......................................................

      const styles = StyleSheet.create({
        input: {
          height: 50,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        },
        uploadButton: {
          padding: 10,
          borderWidth: 1,
          borderColor: "#2196F3",
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 10,
        },
        submitButton: {
          backgroundColor: "#2196F3",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        },
        dropdownButton: { 
            backgroundColor: "#ddd", 
            padding: 10, 
            borderRadius: 5, 
            width: 200, 
            alignItems: "center" 
        },
        selectedText: { 
            fontSize: 16, 
            color: "#333", 
            marginRight: 8 
        },
        selectedItem: { 
            flexDirection: "row", 
            alignItems: "center" 
        },
        dropdownMenu: { 
            backgroundColor: "#fff", 
            borderRadius: 5, 
            elevation: 3, 
            marginTop: 5, 
            borderWidth: 1, 
            borderColor: "#ccc" 
        },
        option: { 
            flexDirection: "row", 
            alignItems: "center", 
            padding: 10, 
            borderBottomWidth: 1, 
            borderBottomColor: "#eee" 
        },
        optionText: { 
            fontSize: 16, 
            marginLeft: 10 
        },
        icon: { 
            width: 24, 
            height: 24 
        },
      });




export default addExpenses;