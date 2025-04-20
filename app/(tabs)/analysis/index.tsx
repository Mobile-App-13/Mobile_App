import React, { useState } from "react";
import { useEffect } from "react";
import {View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; 




/* Pie chart data..............................................................


const data = [
    {
        name: "Food", 
        cost: 215,
        color: "rgb(0, 50, 124)",
        legendFontColor: "rgba(0, 0, 0, 0.92)",
        legendFontSize: 15,
    },
    {   name: "Transport",
        cost: 120,
        color: "rgba(0, 50, 124, 0.87)",
        legendFontColor: "rgba(0, 0, 0, 0.92)",
        legendFontSize: 15,
    },
    {
        name: "Utilities",
        cost: 80,
        color: "rgba(0, 50, 124, 0.78)",
        legendFontColor: "rgba(0, 0, 0, 0.92)",
        legendFontSize: 15,
    },
    {
        name: "Health & Fitness",
        cost: 60,
        color: "rgba(0, 50, 124, 0.66)",
        legendFontColor: "rgba(0, 0, 0, 0.92)",
        legendFontSize: 15,
    },
    {
        name: "Travel",
        cost: 100,
        color: "rgba(0, 50, 124, 0.48)",
        legendFontColor: "rgba(0, 0, 0, 0.92)",
        legendFontSize: 15,
    },
    {
        name: "Miscellaneous",
        cost: 50,
        color: "rgba(0, 50, 124, 0.28)",
        legendFontColor: "rgba(0, 0, 0, 0.92)",
        legendFontSize: 15,
    }
];   */


/* data set for bar chart here..............................................
const barchartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [200, 120, 90, 110, 160, 210],
            
        },
    ],
};*/


// Pie chart component..........................................................

const AnalysisScreen = () => {
    const screenWidth  = Dimensions.get('window').width;

// Pie chart data set here..............................................
    const [chartData, setChartData] = useState<{ name: string; cost: number; color: string; legendFontColor: string; legendFontSize: number; }[]>([]);

  // Bar chart data set here..............................................
    const [barchartData, setBarchartData] = useState({
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0],
            },
        ],
    });  



    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Category", value: "category" },
        { label: "Amount", value: "amount" },
    ]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "personalExpenses"));
    
                const categoryTotals: Record<string, number> = {};
    
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const { category, totalAmount } = data;
    
                    if (category && typeof totalAmount === "number") {
                        if (!categoryTotals[category]) {
                            categoryTotals[category] = 0;
                        }
                        categoryTotals[category] += totalAmount;
                    }
                });

    
                // Optional: assign unique colors per category
                const categoryColors = {
                    Shopping: "rgba(0, 50, 124, 0.74)",
                    Food: "rgba(0, 50, 124, 0.86)",
                    Fuel: "rgba(0, 50, 124, 0.54)",
                    Utilities: "rgba(0, 50, 124, 0.28)",
                    "Health & Fitness": "rgba(0, 50, 124, 0.61)",
                    Travel: "rgba(0, 50, 124, 0.94)",
                    Miscellaneous: "rgba(0, 50, 124, 0.39)",
                
                };
    
                const formattedData = Object.entries(categoryTotals).map(
                    ([category, amount], index) => ({
                        name: category,
                        cost: amount,
                        color: categoryColors[category as keyof typeof categoryColors] || `rgba(0, 50, 124, ${0.2 + index * 0.1})`,
                        legendFontColor: "rgba(0, 0, 0, 0.92)",
                        legendFontSize: 15,
                    })
                );
    
                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching chart data: ", error);
            }
        };
    
        fetchData();
    }, []);



    useEffect(() => {
        const fetchBarChartData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "personalExpenses"));
    
                // Initialize sums for Jan–Jun
                const monthlySums = Array(6).fill(0); // [Jan, Feb, Mar, Apr, May, Jun]
    
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const { invoiceDate, totalAmount } = data;
    
                    if (invoiceDate && typeof totalAmount === "number") {
                        // Extract month from 'dd.mm.yyyy' string

                        const parts = invoiceDate.split(".");
                        if (parts.length === 3) {
                            const month = parseInt(parts[1], 10); // get 1-based month
    
                            // Only sum months 1–6 (Jan–Jun)
                            if (month >= 1 && month <= 6) {
                                monthlySums[month - 1] += totalAmount;
                            }
                        }
                    }
                });
    
                
                setBarchartData({
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [{ data: monthlySums }],
                });
            } catch (error) {
                console.error("Error fetching bar chart data: ", error);
            }
        };
    
        fetchBarChartData();
    }, []);








    
    const chartConfig = {
        backgroundColor: "rgb(255, 255, 255)",
        backgroundGradientFrom: "rgb(134, 180, 223)",
        backgroundGradientTo: "rgb(51, 87, 121)",
        
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
            shadowColor: "black",
            shadowOpacity: 0.9,

        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
        },
    };

    // pie chart end here......................................................





    // page return part......................................................

    return (

        <ScrollView style={{ flex: 1, padding: 5, backgroundColor: "rgba(226, 239, 253, 0.92)", borderColor: "rgba(0, 0, 0, 0.86)", borderWidth: 1, borderRadius: 10, shadowColor: "black", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5 }}>

            <Text style={styles.title}>REPORT & ANALYTICS</Text>




            
            {/*   pie chart return in page ...................................... */}
                <Text style={styles.piechartHeader}>Current Month Expenses{"\n"}</Text>
                <PieChart
                    data={chartData}
                    width={screenWidth - 12}
                    height={250}
                    chartConfig={chartConfig}
                    accessor="cost"
                    backgroundColor="rgb(195, 209, 231)"
                    paddingLeft="15"
                    absolute

                />
            {/* Pie chart code end here..........................................*/}


            {/*   bar chart return in page ...................................... */}
                <Text style={styles.barchartHeader}>Monthly Expenses Comparison</Text>
                <BarChart
                    data={barchartData}
                    width={screenWidth-12 }
                    height={250}
                    //withCustomBarColorFromData={true}
                    chartConfig={{
                        backgroundGradientFrom: "rgb(169, 202, 240)",
                        backgroundGradientTo: "rgb(56, 100, 141)",
                        color: (opacity = 1) => `rgba(40, 0, 120, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        barPercentage: 0.93,
                        
                        style: {
                            borderRadius: 16,
                            
                        },
                        propsForLabels: {
                            fontSize: 11,
                            fontWeight: "bold",
                            color: "rgba(0, 0, 0, 0.92)",
                        },
                                                
                        
                        
                    }}
                />
                    
            {/* bar chart code end here..........................................*/}

            <View style={styles.bottomcontainer}>
      {/* Start Date */}
                <Text style={styles.label}>Start Date</Text>
                    <TouchableOpacity style={styles.input} onPress={() => setShowStartPicker(true)}>
                        <Ionicons name="calendar" size={24} color="#0054b4" />
                        <Text style={styles.inputText}>
                        {startDate ? startDate.toDateString() : " "}
                        </Text>
                    </TouchableOpacity>

                {showStartPicker && (
                    <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                        setShowStartPicker(false);
                        if (date) setStartDate(date);
                    }}
                    />
                )}

            {/* End Date */}
                <Text style={styles.label}>End Date</Text>
                <TouchableOpacity style={styles.input} onPress={() => setShowEndPicker(true)}>
                    <Ionicons name="calendar" size={24} color="#0054b4" />
                    <Text style={styles.inputText}>
                    {endDate ? endDate.toDateString() : " "}
                    </Text>
                </TouchableOpacity>
                {showEndPicker && (
                    <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                        setShowEndPicker(false);
                        if (date) setEndDate(date);
                    }}
                    />
                )}

                    {/* Dropdown Filter */}
                    <Text style={styles.label}>Filter By</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select..."
                        style={styles.dropdown}
                        dropDownContainerStyle={{ borderColor: "#ccc" }}
                    />

                    {/* Button */}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Generate Report</Text>
                    </TouchableOpacity>
            </View>
            

        </ScrollView>
    );
}








const styles = StyleSheet.create({

  title: { 
    fontSize: 40, 
    fontWeight: "bold",
    color: "white", 
    alignItems:"center",
    textAlign:"center",
    backgroundColor: "rgba(1, 36, 77, 0.92)",
    padding: 12,
 },
   piechartHeader: { 
    fontSize: 20, 
    fontWeight: "bold", 
    textAlign: "left",
    paddingTop: 15,
    backgroundColor: "rgba(87, 129, 177, 0.92)",
 },
   
    piechartcontainer:{ 
     backgroundColor: "rgb(60, 120, 168)",
     borderRadius: 5, 
     marginVertical: 5,
     shadowColor: "black",
     borderWidth: 5,
     borderColor: "rgba(0, 0, 0, 0.86)",
     shadowOpacity: 0.1,
     shadowOffset: { width: 0, height: 2 },
     shadowRadius: 5,
     },
     barchartHeader: {
        fontSize: 20, 
        fontWeight: "bold", 
        textAlign: "left",
        paddingTop: 15,
        backgroundColor: "rgba(42, 83, 110, 0.92)",
 },

  bottomcontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(226, 239, 253, 0.92)",
  },
 
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "purple",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#e0e7f1",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  dropdown: {
    backgroundColor: "#e0e7f1",
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#1890ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

})







export default AnalysisScreen;