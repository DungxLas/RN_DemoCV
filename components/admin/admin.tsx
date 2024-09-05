import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import ManagerUserScreen from "./managerUser";
import AAA from "./aaa";
import BBB from "./bbb";

const Tab = createBottomTabNavigator();

const AdminScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ManagerUserTab"
        component={ManagerUserScreen}
        options={{ header: () => <></> }}
      />
      <Tab.Screen
        name="AAATab"
        component={AAA}
        // options={{ header: () => <></> }}
      />
      <Tab.Screen
        name="BBBTab"
        component={BBB}
        // options={{ header: () => <></> }}
      />
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
