import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const ModalResult = (props) => {
  const { closeModal, dataResult } = props;

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.text}>{dataResult.EM}</Text>
        <Text style={styles.text}>Your Result...</Text>
        <Text style={styles.text}>
          Total Quetions: {dataResult.DT.countTotal}
        </Text>
        <Text style={styles.text}>
          Total Correct answers: {dataResult.DT.countCorrect}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.textButton}>Show answers</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => closeModal()}>
          <Text style={styles.textButton}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 450,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  textButton: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ModalResult;
