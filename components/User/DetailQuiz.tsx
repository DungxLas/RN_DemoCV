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

const DetailQuiz = (props) => {
  const { route, navigation } = props;
  const { quizID } = route.params;
  //   const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [quizID]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizID);
    //console.log(res);

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

          return { questionId: key, data: answers, questionDescription, image };
        })
        .value();
      console.log(data);
    }
    if (res && res.EC !== 0) {
    }
  };

  //   const renderItem = ({ item }) => {
  //     return (
  //       <View style={styles.userContainer}>
  //         <View style={styles.userImageContainer}>
  //           <Image
  //             style={styles.userImage}
  //             resizeMode="stretch"
  //             source={{ uri: `data:image/jpeg;base64,${item.image}` }}
  //           />
  //         </View>
  //         <View style={styles.userContent}>
  //           <Text
  //             style={{
  //               fontSize: 18,
  //               color: "black",
  //               marginBottom: 10,
  //             }}
  //           >
  //             {item.description}
  //           </Text>
  //           <Pressable style={{ borderRadius: 10, backgroundColor: "#009dff" }}>
  //             <Text
  //               style={{
  //                 fontSize: 16,
  //                 color: "white",
  //                 paddingVertical: 5,
  //                 paddingHorizontal: 10,
  //               }}
  //             >
  //               Start Now
  //             </Text>
  //           </Pressable>
  //         </View>
  //       </View>
  //     );
  //   };

  return (
    <>
      {/* {arrQuiz && arrQuiz.length > 0 && (
        <FlatList
          style={{ marginTop: 20, marginHorizontal: 15 }}
          data={arrQuiz}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {arrQuiz && arrQuiz.length === 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>You don't have any quiz now</Text>
        </View>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    backgroundColor: "#d7d7d7",
    borderRadius: 20,
  },
  userImageContainer: {
    flex: 0.65,
    overflow: "hidden",
  },
  userImage: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  userContent: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailQuiz;
