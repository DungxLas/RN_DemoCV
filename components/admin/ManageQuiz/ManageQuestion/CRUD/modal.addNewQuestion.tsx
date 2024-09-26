import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import ImagePicker from "../../../imagePicker";
import { useState } from "react";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const ModalAddNewQuestion = (props) => {
  const { closeModal, fetchListQuiz } = props;

  const [question, setQuestion] = useState({
    id: uuidv4(),
    description: "",
    image: "",
    imageName: "",
    answers: [{ id: uuidv4(), description: "", isCorrect: false }],
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (data) => {
    // const res = await postCreateNewQuiz(data);
    // if (res && res.EC === 0) {
    //   // Hiển thị thông báo
    //   Toast.show({
    //     type: "success",
    //     text1: res.EM,
    //     position: "bottom",
    //   });
    //   reset();
    //   // await fetchListUsers();
    // }
    // if (res && res.EC !== 0) {
    //   // Hiển thị thông báo lỗi
    //   Toast.show({
    //     type: "error",
    //     text1: res.EM,
    //     position: "bottom",
    //   });
    // }
  };

  const handleAnswer = (index) => {
    const cloneQuestion = _.cloneDeep(question);
    cloneQuestion.answers[index].isCorrect =
      !cloneQuestion.answers[index].isCorrect;
    setQuestion(cloneQuestion);
  };

  const addAnswer = () => {
    const cloneQuestion = _.cloneDeep(question);
    const newAnswer = { id: uuidv4(), description: "", isCorrect: false };
    cloneQuestion.answers.push(newAnswer);
    setQuestion(cloneQuestion);
  };

  const deleteAnswer = (index) => {
    const cloneQuestion = _.cloneDeep(question);
    cloneQuestion.answers.splice(index, 1);
    setQuestion(cloneQuestion);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[styles.fieldContainer, { marginTop: 50 }]}>
          {/* <Text style={styles.label}>Image</Text> */}
          <Controller
            control={control}
            name="imageUrl"
            rules={{ required: "Image is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  width: 200,
                  height: 200,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <ImagePicker
                  onTakeImage={(imageUrl) => onChange(imageUrl)}
                  imageUrl={value}
                />
              </View>
            )}
          />
        </View>

        <View style={[styles.fieldContainer, { marginHorizontal: 20 }]}>
          {/* <Text style={styles.label}>Description</Text> */}
          <Controller
            control={control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Your Description"
              />
            )}
          />
        </View>

        <View style={[styles.fieldContainer, { marginRight: 15 }]}>
          {question.answers.map((answer, index) => {
            return (
              <View
                key={answer.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <CheckBox
                  //title={answer.description}
                  checked={answer.isCorrect}
                  onPress={() => handleAnswer(index)}
                  checkedColor="green"
                  uncheckedColor="red"
                  //textStyle={styles.text}
                  containerStyle={{
                    backgroundColor: "white",
                    borderColor: "white",
                  }}
                />
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Controller
                    control={control}
                    name="description"
                    rules={{ required: "Description is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Your Description"
                      />
                    )}
                  />
                </View>
                {index === question.answers.length - 1 ? (
                  <Ionicons
                    name="add-circle"
                    size={30}
                    color="#218df3"
                    onPress={addAnswer}
                  />
                ) : (
                  <Ionicons
                    name="remove-circle"
                    size={30}
                    color="#f32121"
                    onPress={() => deleteAnswer(index)}
                  />
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>Create</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleClose()}>
            <Text style={styles.text}>Close</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  form: {
    flex: 1,
  },
  fieldContainer: {
    marginTop: 25,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ffbf00",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default ModalAddNewQuestion;