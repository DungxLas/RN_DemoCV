import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

const UserScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <View style={styles.container}>
      <Text>User Here</Text>
      <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
    </View>
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

export default UserScreen;
