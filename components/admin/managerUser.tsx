import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ManagerUserScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Here</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Button pressed")}
      >
        <Icon name="add" size={20} color="white" />
        <Text style={styles.buttonText}> Go to Profile</Text>
      </TouchableOpacity>
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ManagerUserScreen;
