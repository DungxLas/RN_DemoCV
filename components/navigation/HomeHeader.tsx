import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

const HomeHeader = (props) => {
  const { target, title } = props;
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="arrow-back"
        size={40}
        color="black"
        onPress={() => {
          navigation.navigate(target);
        }}
      />
      <Text style={styles.headerText}>{title}</Text>
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

export default HomeHeader;
