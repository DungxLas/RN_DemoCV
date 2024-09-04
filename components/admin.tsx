import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import ManagerUserScreen from "./admin/managerUser";
import AAA from "./admin/aaa";
import BBB from "./admin/bbb";

const Tab = createBottomTabNavigator();

const AdminScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen name="ManagerUserTab" component={ManagerUserScreen} />
      <Tab.Screen name="AAATab" component={AAA} />
      <Tab.Screen name="BBBTab" component={BBB} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AdminScreen;
