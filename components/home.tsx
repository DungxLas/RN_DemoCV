import { Button, StyleSheet, Text, View } from "react-native";
import AppHeader from "./navigation/app.header";

const HomeScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <Button
          title="View Admin"
          onPress={() => navigation.navigate("Admin")}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button title="View User" onPress={() => navigation.navigate("User")} />
      </View>
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

export default HomeScreen;
