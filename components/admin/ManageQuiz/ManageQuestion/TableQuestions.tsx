import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import AlertDeleteQuiz from "./CRUD/alert.deleteQuestion";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const TableQuestions = (props) => {
  const { listQuizsQA, openModal, fetchListQuizs, navigation } = props;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionImageContainer}>
          {item.imageFile ? (
            <Image
              style={styles.questionImage}
              source={{ uri: `data:image/jpeg;base64,${item.imageFile}` }}
            />
          ) : (
            <Text>No Image</Text>
          )}
        </View>
        <View style={styles.questionContent}>
          <Text style={styles.text}>{item.description}</Text>
          {item.answers.map((answer) => {
            return (
              <CheckBox
                title={answer.description}
                checked={answer.isCorrect}
                checkedColor="green"
                uncheckedColor="red"
                textStyle={styles.text}
                containerStyle={{
                  backgroundColor: "#e5e5e5",
                  borderColor: "#e5e5e5",
                }}
              />
            );
          })}
        </View>
        <View style={styles.buttomContainer}>
          <Ionicons name="trash-bin" size={40} color="red" />
          <Ionicons name="pencil" size={40} color="blue" />
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={listQuizsQA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    width: "100%",
    height: 450,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
  },
  questionImageContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  questionImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  questionContent: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttomContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 20,
    right: 10,
  },
});

export default TableQuestions;
