import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { v4 as uuidv4 } from 'uuid'; // for unique filename



import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from "expo-image-picker";

function addExpenses(){
     

    const [invoiceDate, setInvoiceDate] = useState<Date | string>("");
    //const [showDatePicker, setShowDatePicker] = useState(false);

    const [remark, setRemark] = useState("");
    const [invoiceDetails, setInvoiceDetails] = useState({
        company: "",
        address: "",
        referenceNumber: "",
    });
    const [selectedCategory, setSelectedCategory] = useState<{ name: string; icon: string } | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [amountWithoutTax, setAmountWithoutTax] = useState("");
    const [taxPercentage, setTaxPercentage] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [firebaseImageUrl, setFirebaseImageUrl] = useState<string | null>(null);



    const router = useRouter();





// defined categories for the Dropdown menu...................................
    const categories = [
        { name: "Shopping", icon: "shopping-cart" },
        { name: "Food", icon: "restaurant" },
        { name: "Fuel", icon: "local-gas-station" },
        { name: "Utilities", icon: "lightbulb" },
        { name: "Health & Fitness", icon: "fitness-center" },
        { name: "Travel", icon: "flight" },
        { name: "Miscellaneous", icon: "more-horiz" },
      ];



   // Function to validate and update date
   const handleDateChange = (text: string) => {
      const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/; // Matches DD.MM.YYYY format

      if (regex.test(text)) {
        setInvoiceDate(text);
      } else {
        setInvoiceDate(text); 
      }
  };





  // Open Image Picker..................................................................
  const openCameraAndUpload = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  const mediaPermission = await MediaLibrary.requestPermissionsAsync();

  if (permissionResult.granted === false || mediaPermission.granted === false) {
    Alert.alert("Permission required", "Camera and storage access are needed.");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.5,
  });

  if (!result.canceled && result.assets?.[0]?.uri) {
    const uri = result.assets[0].uri;
    setImageUri(uri);

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uuidv4() + ".jpg";

      const storageRef = ref(storage, `receipts/${filename}`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      setFirebaseImageUrl(downloadURL); // Save the download URL to state or Firestore
      console.log("Uploaded to Firebase:", downloadURL);

      Alert.alert("Upload Success", "Receipt uploaded successfully!");
      // Optional: save downloadURL in your Firestore expense document
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Upload Error", "Something went wrong!");
    }
  }
  };

  // camera function end................................................

      




// Category Picker function..................................................
    const handleSelect = (category: { name: string; icon: string }) => {
        setSelectedCategory(category);
        setIsOpen(false);
    };
      
    


      
        // Calculate Total Amount
        const calculateTotal = (amount: string, tax: string) => {
          if (amount && tax) {
            const total = parseFloat(amount) + (parseFloat(amount) * parseFloat(tax)) / 100;
            setTotalAmount(total.toFixed(2));
          }
        };


     
        // Submit Expense to Firestore
        const handleSubmit = async () => {
            if ( !remark || !selectedCategory || !taxPercentage) {
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
                    image: firebaseImageUrl || null,
                    timestamp: serverTimestamp(),
                });
                alert("Expense added successfully");
                router.push("/expenses/PersonalExpense");
            } catch (error) {
                console.error("Error adding document: ", error);
                Alert.alert("Error", "Failed to add expense");
            }
        };               

    
      







// return part for loading the page......................................................
    return (


          <ScrollView style={{ padding: 10 }}>
            <Image
                            source={require("../../../../assets/images/AddExpense.jpg")}
                            style={{ width: "100%", height: 300, resizeMode: "cover", borderRadius: 5 }}
                            />
            <Text style={{ fontSize: 40, top:75, left:80, color: "white",alignItems:"center",    position:"absolute",fontWeight: "bold", textAlign: "left", padding: 10, backgroundColor: "rgba(24, 22, 112, 0.23)", }}>ADD {"\n"}       EXPENSE</Text>

            <Text style={{ fontSize: 20, color: "black",alignItems:"center",   fontWeight: "bold", textAlign: "left", paddingBottom: 25,  }}>Enter Your Expense Details Here..</Text>
      
      


        <TextInput
            style={styles.input}
            placeholder="Invoice Date - DD.MM.YYYY"
            keyboardType="numeric"
            value={invoiceDate}
            onChangeText={handleDateChange}
            maxLength={10} 
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
            <TouchableOpacity onPress={openCameraAndUpload} style={styles.uploadButton}>
                <Text style={{ color: "blue", textAlign: "center",fontSize:16 }}>Upload a receipt</Text>
            </TouchableOpacity>


            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 200, height: 200, marginTop: 10, borderRadius: 10 }}
              />
            )}



      
            {/* Submit Button    */}
            <TouchableOpacity  style={styles.submitButton} onPress={handleSubmit} >
              <Text style={{ color: "white",fontWeight: "bold" , textAlign: "center", fontSize: 17 }}>Enter</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      };




      
      // all styles for the page......................................................

      const styles = StyleSheet.create({
        input: {
          height: 55,
          borderColor: "#ccc",
          fontSize: 16,
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 16,
        },
        uploadButton: {
          padding: 10,
          borderWidth: 1,
          borderColor: "#2196F3",
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 10,
        },
        label: {
          fontSize: 16,
          fontWeight: "bold",
        },
        submitButton: {
          backgroundColor: "#2196F3",
          padding: 16,
          marginBottom: 30,
          marginTop: 20,
          borderRadius: 10,
          alignItems: "center",
        },
        dropdownButton: { 
            backgroundColor: "#ddd", 
            padding: 10, 
            marginBottom: 16,
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