import { NavigationContainer } from "@react-navigation/native";
import "./zzz/gesture-handler";
import AppNavigation from "./components/navigation/app.navigation";
import { SafeAreaView } from "react-native";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
