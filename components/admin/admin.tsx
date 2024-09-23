import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import ManagerUserScreen from "./manageUser/managerUser";

const Tab = createBottomTabNavigator();

const AdminScreen = () => {
  return (
    <>
      <ManagerUserScreen />
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
