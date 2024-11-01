import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../home";
import AdminScreen from "../admin/admin";
import React from "react";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Toast from "react-native-toast-message";
import ListQuiz from "../User/ListQuiz";
import DetailQuiz from "../User/DetailQuiz";
import { Button } from "react-native";
import { logout } from "../../src/services/apiServices";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCurrentApp } from "../../src/context/app.context";

const AppNavigation = () => {
  const Stack = createStackNavigator();
  const { appState } = useCurrentApp();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  async function handleLogout() {
    let res = await logout(appState.email, appState.refresh_token);

    if (res && res.EC === 0) {
      // Hiển thị thông báo
      Toast.show({
        type: "success",
        text1: res.EM,
        position: "bottom",
      });

      navigation.navigate("Login");
    }

    if (res && res.EC !== 0) {
      // Hiển thị thông báo lỗi
      Toast.show({
        type: "error",
        text1: res.EM,
        position: "bottom",
      });
    }
  }

  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => <></> }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Sign up",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <Button onPress={handleLogout} title="Log out" />
            ),
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ header: () => <></> }}
        />
        <Stack.Screen name="User" component={ListQuiz} />
        <Stack.Screen
          name="DetailQuiz"
          options={{ headerShown: false }}
          component={DetailQuiz}
        />
      </Stack.Navigator>
      <Toast />
    </>
  );
};

export default AppNavigation;
