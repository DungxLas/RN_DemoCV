import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../home";
import AdminScreen from "../admin";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import UserScreen from "../user";
import Icon from "react-native-vector-icons/MaterialIcons";
import LoginScreen from "../login";
import SigninScreen from "../signin";

const HomeLayout = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
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
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          drawerPosition: "right", // Đặt ngăn kéo ở bên phải
          headerShown: true, // Hiển thị thanh điều hướng trên mỗi màn hình
          headerLeft: () => null, // Ẩn nút mặc định bên trái
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          ),
        })}
      >
        <Drawer.Screen name="Layout" component={HomeLayout} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Signin" component={SigninScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default AppNavigation;
