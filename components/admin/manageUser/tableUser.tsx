import {
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";

const TableUser = (props) => {
  const { listUsers } = props;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.userContainer}>
        <View style={styles.userImageContainer}>
          <Image
            style={styles.userImage}
            source={require("../../../assets/images/react-native.png")}
          />
        </View>
        <View style={styles.userContent}>
          <Text>ID: {item.id}</Text>
          <Text>Username:{item.username}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Role: {item.role}</Text>
        </View>
      </View>
    );
  };

  const renderHiddenItem = ({ item }, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backButton, styles.backLeftButton]}
          onPress={() =>
            Alert.alert("Update Item", `Updateing ${item.username}`)
          }
        >
          <Text style={styles.backText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backButton, styles.backRightButton]}
          onPress={() =>
            Alert.alert("Delete Item", `Deleting ${item.username}`)
          }
        >
          <Text style={styles.backText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {listUsers && listUsers.length > 0 ? (
        <SwipeListView
          data={listUsers}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-150} // Kích thước mở các hành động bên phải
          disableRightSwipe // Tắt vuốt sang trái
        />
      ) : (
        <Text>Not found data</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    marginVertical: 10,
    backgroundColor: "#bcb2b2",
    borderRadius: 20,
  },
  userImageContainer: {
    flex: 0.35,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  userContent: {
    flex: 0.65,
    flexDirection: "column",
    marginLeft: 10,
    paddingVertical: 10,
    justifyContent: "center",
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    height: "100%",
    backgroundColor: "blue",
    borderRadius: 20,
  },
  backButton: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    height: "100%",
  },
  backLeftButton: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightButton: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  backText: {
    color: "#fff",
  },
});

export default TableUser;