import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(60); // Đếm ngược từ 60 giây
  const [isRunning, setIsRunning] = useState(false); // Trạng thái của timer

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Xóa timer khi component bị unmount
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(60);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{timeLeft} seconds left</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title={isRunning ? "Pause" : "Start"}
          color="#4ea127"
          onPress={isRunning ? stopTimer : startTimer}
        />
        <View style={{ width: 20 }} />
        <Button title="Reset" color="#4ea127" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 48,
    marginBottom: 20,
    color: "white",
  },
});

export default Timer;
