import "./zzz/gesture-handler";
import AppNavigation from "./components/navigation/app.navigation";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
