import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import ManagerUserScreen from "./manageUser/managerUser";
import ManageQuiz from "./ManageQuiz/ManageQuiz";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AdminScreen = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="ManageUser"
          component={ManagerUserScreen}
          options={{
            header: () => <></>,
            title: "Manage User",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ManageQuiz"
          component={ManageQuiz}
          options={{
            header: () => <></>,
            title: "Manage Quiz",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bulb-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
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
