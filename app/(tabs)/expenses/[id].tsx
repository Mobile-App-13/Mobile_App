import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

function individualExpenses(){
    const {id} = useLocalSearchParams();

     //Firebase mata item id ekata adala data tika fetch karala denna
     

    return(
        <View>
            <Text>Individual       {id}</Text>
        </View>
    )
}

export default individualExpenses;