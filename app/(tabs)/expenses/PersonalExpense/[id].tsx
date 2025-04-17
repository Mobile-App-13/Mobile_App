import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig"; 




export default function IndividualExpenses() {
    const { id } = useLocalSearchParams();


    interface Expense {
        invoiceDate?: string;
        invoiceDetails?: {
            company?: string;
            address?: string;
            referenceNumber?: string;
        };
        category?: string;
        categoryIcon?: string;
        amountWithoutTax?: number;
        taxPercentage?: number;
        totalAmount?: number;
        image?: string;
    }



    const [expense, setExpense] = useState<Expense | null>(null);
    const [loading, setLoading] = useState(true);





    // Fetch the specific expense from Firestore
    useEffect(() => {
        const fetchExpense = async () => {
            try {
                if (!id) return;
                const docRef = doc(db, "personalExpenses", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setExpense(docSnap.data());
                } else {
                    console.log("No such expense found!");
                }
            } catch (error) {
                console.error("Error fetching expense:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExpense();
    }, [id]);

    // Show loading indicator while fetching data
    if (loading) {
        return <ActivityIndicator size="large" color="#007BFF" style={{ flex: 1, justifyContent: "center" }} />;
    }

    // If no data is found
    if (!expense) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Expense Not Found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Debugging: Display Expense ID 
            <Text>Expense ID: {id}</Text> */}

            {/* Header */}
            <Text style={styles.header}>Expense Details</Text>

            {/* Date & Currency */}
            <View style={styles.row}>
                <Text style={styles.label}>Date :</Text>
                <Text style={styles.value}>{expense.invoiceDate || "N/A"}</Text>
                <Text style={styles.label}>Currency :</Text>
                <Text style={styles.value}>€ Euro</Text>
            </View>

            {/* Invoice Details */}
            <Text style={styles.subHeader}>Invoice Details & Notes :</Text>
            <View style={styles.invoiceBox}>
                <Text style={styles.invoiceText}>{expense.invoiceDetails?.company || "N/A"}</Text>
                <Text style={styles.invoiceText}>{expense.invoiceDetails?.address || "N/A"}</Text>
                <Text style={styles.invoiceText}>Ref No: {expense.invoiceDetails?.referenceNumber || "N/A"}</Text>
            </View>

            {/* Category */}
            <View style={styles.row}>
                <Text style={styles.label}>Category :</Text>
                <Text style={styles.value}>{expense.category || "N/A"}</Text>
                <MaterialIcons name={expense.categoryIcon } size={20} color="black" />
            </View>

            {/* Amounts */}
            <View style={styles.row}>
                <Text style={styles.label}>Amount Without Taxes :</Text>
                <Text style={styles.value}>{expense.amountWithoutTax?.toFixed(2)}€</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Tax Percentage :</Text>
                <Text style={styles.value}>{expense.taxPercentage} %</Text>
            </View>

            <View style={styles.row}>
                <Text style={[styles.label, styles.boldText]}>Total Amount :</Text>
                <Text style={[styles.value, styles.boldText]}>{expense.totalAmount?.toFixed(2)}€</Text>
            </View>

            {/* Attachment */}
            <View style={styles.row}>
                <Text style={styles.label}>Attachment :</Text>
                {expense.image ? (
                    <Image source={{ uri: expense.image }} style={styles.image} />
                ) : (
                    <MaterialIcons name="insert-drive-file" size={24} color="blue" />
                )}
            </View>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 5,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(1, 36, 77, 0.92)",
        borderRadius: 10,
        padding: 15,
        marginBottom: 25,
        color: "white",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA", // Light separator
    },
    label: {
        fontSize: 16,
        color: "#666",
    },
    value: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    subHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        color: "#444",
    },
    invoiceBox: {
        backgroundColor: "#F0F0F0",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 22,
    },
    invoiceText: {
        fontSize: 16,
        color: "#333",
    },
    boldText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#DDD",
    },
});
