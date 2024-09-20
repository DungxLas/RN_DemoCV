import { Button, StyleSheet, Text, View } from "react-native";
import AppHeader from "./navigation/app.header";

const HomeScreen = (props: any) => {
  const { navigation } = props;

  return (
    <View
    // style={styles.container}
    >
      <Button title="View Admin" onPress={() => navigation.navigate("Admin")} />
      <Button title="View User" onPress={() => navigation.navigate("User")} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default HomeScreen;
