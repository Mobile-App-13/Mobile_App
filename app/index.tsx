import { Redirect } from "expo-router";
import { ThemeProvider } from "./context/ThemeContext"; // Adjusted the path

function App() {
  return (
    <ThemeProvider>
      <Redirect href="/auth_Screens/login" />
    </ThemeProvider>
  );
}

export default App;
