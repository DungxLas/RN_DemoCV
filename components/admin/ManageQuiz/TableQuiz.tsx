import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import AlertDeleteQuiz from "./CRUD/alert.deleteQuiz";

const TableQuiz = (props) => {
  const { listQuizs, openModal, fetchListQuizs, navigation } = props;

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.quizContainer}
        onPress={() => navigation.navigate("ManageQuestion", { quiz: item })}
      >
        <View style={styles.quizImageContainer}>
          <Image
            style={styles.quizImage}
            source={{ uri: `data:image/jpeg;base64,${item.image}` }}
          />
        </View>
        <View style={styles.quizContent}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            ID: {item.id}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            Name:{item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            Description: {item.description}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            Type: {item.difficulty}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderHiddenItem = ({ item }, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backButton, styles.backLeftButton]}
          onPress={() => {
            openModal(item);
          }}
        >
          <Text style={styles.backText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backButton, styles.backRightButton]}
          onPress={() => AlertDeleteQuiz(item, fetchListQuizs)}
        >
          <Text style={styles.backText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {listQuizs && listQuizs.length > 0 ? (
        <SwipeListView
          data={listQuizs}
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
  quizContainer: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    marginVertical: 10,
    backgroundColor: "#bcb2b2",
    borderRadius: 20,
  },
  quizImageContainer: {
    flex: 0.35,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  quizImage: {
    width: "100%",
    height: "100%",
  },
  quizContent: {
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

export default TableQuiz;
