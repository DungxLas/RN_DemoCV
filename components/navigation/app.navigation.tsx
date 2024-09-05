import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../home";
import AdminScreen from "../admin/admin";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import UserScreen from "../user";
import LoginScreen from "../login";
import SigninScreen from "../signin";
import AppHeader from "./app.header";

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
            backgroundColor: "#ab2544", // Màu nền tùy chỉnh
          },
        }}
      >
        <Drawer.Screen
          name="Layout"
          component={HomeLayout}
          options={{ header: () => <></> }}
        />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Signin" component={SigninScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default AppNavigation;
