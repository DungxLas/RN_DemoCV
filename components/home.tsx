import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useCurrentApp } from "../src/context/app.context";

const HomeScreen = (props) => {
  const { navigation, route } = props;
  const { appState } = useCurrentApp();

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <Button
          title="View Admin"
          onPress={() => navigation.navigate("Admin")}
          disabled={appState?.role === "USER" ? true : false}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button title="View User" onPress={() => navigation.navigate("User")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
