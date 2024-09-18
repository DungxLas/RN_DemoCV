import "./zzz/gesture-handler";
import AppNavigation from "./components/navigation/app.navigation";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import {
//   getDatabase,
//   ref,
//   set,
//   onValue,
//   push,
// } from "@react-native-firebase/database";

// const firebaseConfig = {
//   // Thêm thông tin cấu hình Firebase của bạn vào đây
// };

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
