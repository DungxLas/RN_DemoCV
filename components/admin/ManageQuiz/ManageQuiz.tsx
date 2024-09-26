import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import ModalAddNewQuiz from "./CRUD/modal.addNewQuiz";
import TableQuiz from "./TableQuiz";
import { getAllQuizForAdmin } from "../../../src/services/apiServices";
import ModalUpdateQuiz from "./CRUD/modal.updateQuiz";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageQuestion from "./ManageQuestion/ManageQuestions";
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "../../navigation/HomeHeader";

const ManageQuizScreen = (props) => {
  const navigation = useNavigation();

  const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);

  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);

  const [listQuizs, setListQuizs] = useState([]);

  const [quizUpdate, setQuizUpdate] = useState({});

  useEffect(() => {
    fetchListQuizs();
  }, []);

  const fetchListQuizs = async () => {
    let res = await getAllQuizForAdmin();
    if (res.EC === 0) {
      setListQuizs(res.DT);
    }
  };

  const openModalToUpdate = (quiz) => {
    setShowModalUpdateQuiz(true);
    setQuizUpdate(quiz);
  };

  return (
    <>
      <View style={styles.container}>
        <TableQuiz
          listQuizs={listQuizs}
          openModal={openModalToUpdate}
          fetchListQuizs={fetchListQuizs}
          navigation={navigation}
        />

        {/* Nút để mở modal */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModalCreateQuiz(true)}
        >
          <Icon name="add" size={20} color="white" />
          <Text style={styles.buttonText}> Add New Quiz</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalCreateQuiz}
          onRequestClose={() => setShowModalCreateQuiz(false)} // Đóng modal khi người dùng ấn ngoài modal
        >
          <View style={styles.modalContainer}>
            <ModalAddNewQuiz closeModal={() => setShowModalCreateQuiz(false)} />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalUpdateQuiz}
          onRequestClose={() => setShowModalUpdateQuiz(false)} // Đóng modal khi người dùng ấn ngoài modal
        >
          <View style={styles.modalContainer}>
            {quizUpdate && (
              <ModalUpdateQuiz
                quizUpdate={quizUpdate} // Pass the user data to the modal
                closeModal={() => setShowModalUpdateQuiz(false)}
                fetchListQuizs={fetchListQuizs}
              />
            )}
          </View>
        </Modal>
      </View>
    </>
  );
};

const ManageQuiz = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ManageQuizScreen"
        component={ManageQuizScreen}
        options={{ header: () => <HomeHeader target="Home" title="Admin" /> }}
      />
      <Stack.Screen
        name="ManageQuestion"
        component={ManageQuestion}
        options={{
          header: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 20, // Đặt khoảng cách giữa TableUser và nút
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(204, 203, 203, 0.5)", // Làm mờ nền khi hiện modal
  },
});

export default ManageQuiz;
