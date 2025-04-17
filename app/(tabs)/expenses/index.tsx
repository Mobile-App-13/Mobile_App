import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";



export default function ExpensesIndex() {
  const { type } = useLocalSearchParams();
  const router = useRouter();




  useEffect(() => {
    if (type === "org") {
      router.replace("/(tabs)/expenses/OrganizationalExpense");
    } else {
      router.replace("/(tabs)/expenses/PersonalExpense");
    }
  }, [type]);

  return null; 
}
