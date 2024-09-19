import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import ModalAddNewUser from "./modal.addNewUser";
import Toast from "react-native-toast-message";
import TableUser from "./tableUser";
import { getAllUsers } from "../../../src/services/apiServices";

const ManagerUserScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [listUsers, setListUser] = useState([
    {
      id: 19,
      username: "Adcj",
      email: "testf@gmail.com",
      role: "ADMIN",
    },
    {
      id: 18,
      username: "Wedc",
      email: "test11wdgfggerf@gmail.com",
      role: "USER",
    },
  ]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    console.log(res);
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TableUser listUsers={listUsers} />

        {/* Nút để mở modal */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="add" size={20} color="white" />
          <Text style={styles.buttonText}> Add New User</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} // Đóng modal khi người dùng ấn ngoài modal
        >
          <Pressable
            style={styles.modalContainer}
            //onPress={() => setModalVisible(false)}
          >
            <ModalAddNewUser
              closeModal={() => setModalVisible(false)}
              fetchListUsers={fetchListUsers}
            />
          </Pressable>
        </Modal>
      </View>
      <Toast />
    </>
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

export default ManagerUserScreen;
