import { Button, StyleSheet, Text, View } from "react-native";

const HomeScreen = (props: any) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Home Here</Text>
      <Button title="View Admin" onPress={() => navigation.navigate("Admin")} />
      <Button title="View User" onPress={() => navigation.navigate("User")} />
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