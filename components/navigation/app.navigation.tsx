import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../home";
import AdminScreen from "../admin/admin";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import AppHeader from "./app.header";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import ListQuiz from "../User/ListQuiz";
import DetailQuiz from "../User/DetailQuiz";

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
      <Stack.Screen name="User" component={ListQuiz} />
      <Stack.Screen
        name="DetailQuiz"
        options={{ headerShown: false }}
        component={DetailQuiz}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const Drawer = createDrawerNavigator();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

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
        {isAuthenticated ? (
          <Drawer.Screen name="Logout" component={Login} />
        ) : (
          <>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen
              name="Signup"
              component={Signup}
              options={{ title: "Sign up" }}
            />
          </>
        )}
      </Drawer.Navigator>
      <Toast />
    </>
  );
};

export default AppNavigation;
