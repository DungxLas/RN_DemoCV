import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../home";
import AdminScreen from "../admin/admin";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import UserScreen from "../user";
import AppHeader from "./app.header";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Toast from "react-native-toast-message";

const HomeLayout = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
    // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => <AppHeader /> }}
      />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#e67373", // Màu nền tùy chỉnh
          },
        }}
      >
        <Drawer.Screen
          name="Layout"
          component={HomeLayout}
          options={{ header: () => <></> }}
        />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen
          name="Signup"
          options={{
            title: "Sign up",
          }}
          component={Signup}
        />
      </Drawer.Navigator>
      <Toast />
    </>
  );
};

export default AppNavigation;
