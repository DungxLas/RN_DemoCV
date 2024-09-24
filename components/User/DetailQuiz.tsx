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
import { CheckBox } from "react-native-elements";

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
            item.answers.isSelected = false;
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

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });

      question.answers = b;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
    //console.log(dataQuiz);
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
          <View>
            <Text style={{ color: "white", fontSize: 20 }}>
              Question {index + 1}: {dataQuiz[index].questionDescription}
            </Text>
            {dataQuiz[index].answers &&
              dataQuiz[index].answers.length &&
              dataQuiz[index].answers.map((item, i) => {
                return (
                  <View style={styles.row} key={`answer-${i}`}>
                    <CheckBox
                      checked={item.isSelected}
                      onPress={() => {
                        console.log(item);
                        handleCheckbox(item.id, dataQuiz[index].questionId);
                      }}
                      title={item.description}
                    />
                  </View>
                );
              })}
          </View>
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
    justifyContent: "space-around",
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
  },
  userImage: {
    width: 200,
    height: 200,
  },
  row: {
    flexDirection: "row",
  },
  label: {
    color: "white",
  },
});

export default DetailQuiz;
