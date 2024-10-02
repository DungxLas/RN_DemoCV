import { useEffect, useState } from "react";
import { View, Button, Text, Image, StyleSheet, Modal } from "react-native";
import { getDataQuiz, postSubmitQuiz } from "../../src/services/apiServices";
import _ from "lodash";
import Timer from "./Timer";
import HeaderQuiz from "./HeaderQuiz";
import { CheckBox } from "react-native-elements";
import ModalResult from "./modalResult";

const DetailQuiz = (props) => {
  const { route, navigation } = props;
  const { quizID, quizTitle } = route.params;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataResult, setDataResult] = useState();

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
  };

  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +quizID,
      answers: [],
    };

    let a = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a);
          }
        });

        a.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });

      payload.answers = a;

      //Submit api
      const res = await postSubmitQuiz(payload);
      console.log(res);

      if (res && res.EC === 0) {
      }
      if (res && res.EC !== 0) {
      }

      setDataResult(res as any);
      setShowModalResult(true);
    }
  };

  const onTimeUp = () => {
    handleFinishQuiz();
    //alert("times up");
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderQuiz title={quizTitle} />
      <View style={styles.timerContainer}>
        <Timer onTimeUp={onTimeUp} />
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
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
                        handleCheckbox(item.id, dataQuiz[index].questionId);
                      }}
                      title={item.description}
                      checkedColor="green"
                      uncheckedColor="red"
                      textStyle={styles.checkboxText}
                      containerStyle={styles.checkbox}
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
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
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
        <Button title="Finish" color="#b3a700" onPress={handleFinishQuiz} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalResult}
        onRequestClose={() => setShowModalResult(false)} // Đóng modal khi người dùng ấn ngoài modal
      >
        <View style={styles.modalContainer}>
          <ModalResult
            closeModal={() => setShowModalResult(false)}
            dataResult={dataResult}
          />
        </View>
      </Modal>
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
    backgroundColor: "#a18d8d",
    margin: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //top: 50,
  },
  userImageContainer: {
    flex: 0.5,
  },
  userImage: {
    width: 200,
    height: 200,
  },
  row: {
    marginVertical: 5,
  },
  label: {
    color: "white",
  },
  checkboxText: {
    color: "black",
    fontSize: 18,
  },
  checkbox: {
    backgroundColor: "transparent",
    borderColor: "#a18d8d",
    padding: 0,
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(204, 203, 203, 0.5)", // Làm mờ nền khi hiện modal
  },
});

export default DetailQuiz;
