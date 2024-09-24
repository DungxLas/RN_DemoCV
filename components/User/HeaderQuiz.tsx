import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

const HeaderQuiz = (props) => {
  const { title } = props;

  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="arrow-back"
        size={40}
        color="black"
        onPress={() => {
          navigation.goBack();
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
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
    //paddingTop: 40,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default HeaderQuiz;
