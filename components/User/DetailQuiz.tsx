import { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { getDataQuiz, getQuizByUser } from "../../src/services/apiServices";
import _ from "lodash";
import Timer from "./Timer";
import HeaderQuiz from "./HeaderQuiz";

const DetailQuiz = (props) => {
  const { route, navigation } = props;
  const { quizID, quizTitle } = route.params;
  //   const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [quizID]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizID);
    //console.log(res);

    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;

          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers);
          });

          return { questionId: key, data: answers, questionDescription, image };
        })
        .value();
      console.log(data);
    }
    if (res && res.EC !== 0) {
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderQuiz title={quizTitle} />
      <View style={styles.timerContainer}>
        <Timer />
      </View>
      <View style={styles.quizContainer}>
        <Text>Question</Text>
        <Text>A</Text>
        <Text>B</Text>
        <Text>C</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Prev" color="#4ea127" onPress={() => {}} />
        <View style={{ width: 20 }} />
        <Button title="Next" color="#4ea127" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    flex: 0.15,
    backgroundColor: "#e05527",
    paddingBottom: 10,
  },
  quizContainer: {
    flex: 0.55,
    backgroundColor: "#763d3d",
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    top: 50,
  },
});

export default DetailQuiz;
