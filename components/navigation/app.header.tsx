import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

const AppHeader = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="menu"
        size={40}
        color="black"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Text style={styles.headerText}>App Header Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    //paddingTop: 40,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
  },
});

export default AppHeader;
