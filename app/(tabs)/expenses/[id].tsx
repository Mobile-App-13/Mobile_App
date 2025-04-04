
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

function individualExpenses(){
    const {id} = useLocalSearchParams();



    
     
// return part for loading page .............................................
    
  return (


    <View style={styles.container}>

        <Text>Individual       {id}</Text>
      {/* Header */}
        <Text style={styles.header}>Expenses Summary</Text>

      {/* Date & Currency */}
      <View style={styles.row}>
            <Text style={styles.label}>Date :</Text>
            <Text style={styles.value}>04 March 2025</Text>
            <Text style={styles.label}>Currency :</Text>
            <Text style={styles.value}>€ Euro</Text>
      </View>

      {/* Invoice Details */}
      <Text style={styles.subHeader}>Invoice Details & Notes :</Text>
      <View style={styles.invoiceBox}>
        <Text style={styles.invoiceText}>Shell Express Oulu</Text>
        <Text style={styles.invoiceText}>Valivainio, 90530 - Oulu</Text>
        <Text style={styles.invoiceText}>Ref No : 02244-011-456</Text>
      </View>

      {/* Category */}
      <View style={styles.row}>
        <Text style={styles.label}>Category :</Text>
        <Text style={styles.value}>Fuel</Text>
        <FontAwesome5 name="gas-pump" size={20} color="black" />
      </View>

      {/* Amounts */}
      <View style={styles.row}>
        <Text style={styles.label}>Amount Without Taxes :</Text>
        <Text style={styles.value}>50,00€</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tax Percentage :</Text>
        <Text style={styles.value}>12 %</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, styles.boldText]}>Total Expense :</Text>
        <Text style={[styles.value, styles.boldText]}>56,00€</Text>
      </View>

      {/* Attachment */}
      <View style={styles.row}>
        <Text style={styles.label}>Attachment :</Text>
        <MaterialIcons name="insert-drive-file" size={24} color="blue" />
      </View>
    </View>
  );
};




// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  invoiceBox: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  invoiceText: {
    fontSize: 14,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});



export default individualExpenses;