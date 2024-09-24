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
import { CheckBox } from "rn-inkpad";
import Question from "./Question";

const DetailQuiz = (props) => {
  const { route, navigation } = props;
  const { quizID, quizTitle } = route.params;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, [quizID]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizID);

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

          return {
            questionId: key,
            answers: answers,
            questionDescription,
            image,
          };
        })
        .value();
      setDataQuiz(data);
    }
    if (res && res.EC !== 0) {
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderQuiz title={quizTitle} />
      <View style={styles.timerContainer}>
        <Timer />
      </View>
      {dataQuiz && dataQuiz.length > 0 ? (
        <View style={styles.quizContainer}>
          {dataQuiz[index].image && (
            <View style={styles.userImageContainer}>
              <Image
                style={styles.userImage}
                source={{
                  uri: `data:image/jpeg;base64,${dataQuiz[index].image}`,
                }}
              />
            </View>
          )}

          <Text>
            Question {index + 1}: {dataQuiz[index].questionDescription}
          </Text>
          {dataQuiz[index].answers &&
            dataQuiz[index].answers.length &&
            dataQuiz[index].answers.map((item, index) => {
              return (
                <View style={styles.row} key={`answer-${index}`}>
                  <Question data={item.description} />
                </View>
              );
            })}
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text>Opp! Nothing quiz</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Prev"
          color="#4ea127"
          onPress={handlePrev}
          disabled={index === 0}
        />
        <View style={{ width: 20 }} />
        <Button
          title="Next"
          color="#4ea127"
          onPress={handleNext}
          disabled={index + 1 === dataQuiz.length}
        />
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
  userImageContainer: {
    flex: 0.5,
    // overflow: "hidden",
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
  },
  userImage: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: "row",
  },
  label: {
    color: "white",
  },
});

export default DetailQuiz;
