import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import HomeHeader from "../../../navigation/HomeHeader";
import TableQuestions from "./TableQuestions";
import { useEffect, useState } from "react";
import { getQuizWithQA } from "../../../../src/services/apiServices";
import { Ionicons } from "@expo/vector-icons";
import ModalAddNewQuestion from "./CRUD/modal.addNewQuestion";

const ManageQuestion = (props) => {
  const { quiz } = props.route.params;

  const [showModalCreateQuestion, setShowModalCreateQuestion] = useState(false);

  const [listQuizsQA, setListQuizQA] = useState([]);

  useEffect(() => {
    fetchListQuizQA();
  }, []);

  const fetchListQuizQA = async () => {
    let res = await getQuizWithQA(quiz.id);

    if (res.EC === 0) {
      setListQuizQA(res.DT.qa);
    }
  };

  return (
    <>
      <HomeHeader target="ManageQuizScreen" title={quiz.name} />
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Ionicons
            name="add-circle"
            size={45}
            color="#218df3"
            onPress={() => setShowModalCreateQuestion(true)}
          />
        </View>
        <TableQuestions listQuizsQA={listQuizsQA} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalCreateQuestion}
          onRequestClose={() => setShowModalCreateQuestion(false)} // Đóng modal khi người dùng ấn ngoài modal
        >
          <View style={styles.modalContainer}>
            <ModalAddNewQuestion
              closeModal={() => setShowModalCreateQuestion(false)}
            />
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  // button: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignSelf: "center",
  //   backgroundColor: "#007bff",
  //   padding: 10,
  //   borderRadius: 5,
  //   marginVertical: 20, // Đặt khoảng cách giữa TableUser và nút
  // },
  // buttonText: {
  //   color: "white",
  //   fontSize: 16,
  //   marginLeft: 10,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(204, 203, 203, 0.5)", // Làm mờ nền khi hiện modal
  },
});

export default ManageQuestion;
