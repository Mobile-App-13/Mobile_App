import React, { useState } from "react";
import {View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";




// Pie chart data..............................................................


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
];


// data set for bar chart here..............................................
const barchartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [200, 120, 90, 110, 160, 210],
            
        },
    ],
};


// Pie chart component..........................................................

const AnalysisScreen = () => {
    const screenWidth  = Dimensions.get('window').width;


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

    const chartConfig = {
        backgroundColor: "rgb(46, 178, 201)",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        
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
                    data={data}
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
                        backgroundGradientFrom: "rgb(143, 184, 231)",
                        backgroundGradientTo: "rgb(35, 62, 87)",
                        color: (opacity = 1) => `rgba(0, 10, 87, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        barPercentage: 0.9,
                        
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