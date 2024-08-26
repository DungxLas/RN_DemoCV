import { NavigationContainer } from "@react-navigation/native";
import "./zzz/gesture-handler";
import AppNavigation from "./components/navigation/app.navigation";

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
