import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import TableUser from "./tableUser";
import { getAllUsers } from "../../../src/services/apiServices";
import ModalAddNewUser from "./CRUD/modal.addNewUser";
import ModalUpdateUser from "./CRUD/modal.updateUser";

const ManagerUserScreen = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  const [listUsers, setListUser] = useState([]);

  const [userUpdate, setUserUpdate] = useState({});

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const openModalToUpdate = (user) => {
    setShowModalUpdateUser(true);
    setUserUpdate(user);
  };

  return (
    <>
      <View style={styles.container}>
        <TableUser
          listUsers={listUsers}
          openModal={openModalToUpdate}
          fetchListUsers={fetchListUsers}
        />

        {/* Nút để mở modal */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModalCreateUser(true)}
        >
          <Icon name="add" size={20} color="white" />
          <Text style={styles.buttonText}> Add New User</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalCreateUser}
          onRequestClose={() => setShowModalCreateUser(false)} // Đóng modal khi người dùng ấn ngoài modal
        >
          <View style={styles.modalContainer}>
            <ModalAddNewUser
              closeModal={() => setShowModalCreateUser(false)}
              fetchListUsers={fetchListUsers}
            />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalUpdateUser}
          onRequestClose={() => setShowModalUpdateUser(false)} // Đóng modal khi người dùng ấn ngoài modal
        >
          <View style={styles.modalContainer}>
            {userUpdate && (
              <ModalUpdateUser
                userUpdate={userUpdate} // Pass the user data to the modal
                closeModal={() => setShowModalUpdateUser(false)}
                fetchListUsers={fetchListUsers}
              />
            )}
          </View>
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
