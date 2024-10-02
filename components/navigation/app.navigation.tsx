import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../home";
import AdminScreen from "../admin/admin";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import AppHeader from "./app.header";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import ListQuiz from "../User/ListQuiz";
import DetailQuiz from "../User/DetailQuiz";
import { View, Button } from "react-native";
import { logout } from "../../src/services/apiServices";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { doLogout } from "../../src/redux/action/userAction";

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
  );
};

const AppNavigation = () => {
  const Drawer = createDrawerNavigator();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    let res = await logout(account.email, account.refresh_token);

    if (res && res.EC === 0) {
      // Hiển thị thông báo
      Toast.show({
        type: "success",
        text1: res.EM,
        position: "bottom",
      });

      dispatch(doLogout());
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
  };

  const CustomDrawerContent = (props) => {
    if (isAuthenticated) {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Button title="Logout" onPress={handleLogout} />
          </View>
        </DrawerContentScrollView>
      );
    }

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
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
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            drawerItemStyle: isAuthenticated ? { display: "none" } : {},
          }}
        />
        <Drawer.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Sign up",
            drawerItemStyle: isAuthenticated ? { display: "none" } : {},
          }}
        />
      </Drawer.Navigator>
      <Toast />
    </>
  );
};

export default AppNavigation;
