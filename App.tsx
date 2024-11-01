import "./zzz/gesture-handler";
import AppNavigation from "./components/navigation/app.navigation";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppProvider from "./src/context/app.context";

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
