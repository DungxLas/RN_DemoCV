import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminScreen from "./components/admin";
import UserScreen from "./components/user";
import "./zzz/gesture-handler";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Admin" component={AdminScreen} />
        <Drawer.Screen name="User" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
