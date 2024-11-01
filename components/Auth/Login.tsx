import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { postLogin } from "../../src/services/apiServices";
import Icon from "react-native-vector-icons/FontAwesome";
import { useCurrentApp } from "../../src/context/app.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  const { navigation } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const { setAppState } = useCurrentApp();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const res = await postLogin(data.email, data.password);
    if (res && res.EC === 0) {
      reset();
      await AsyncStorage.setItem("access_token", res.DT.access_token);
      setAppState(res.DT);
      navigation.replace("Home");
      // Hiển thị thông báo thanh cong
      Toast.show({
        type: "success",
        text1: res.EM,
        position: "bottom",
      });
    }
    if (res && res.EC !== 0) {
      // Hiển thị thông báo lỗi
      Toast.show({
        type: "error",
        text1: res.EM,
        position: "bottom",
      });
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.textHeader, { fontSize: 40, fontWeight: "bold" }]}>
          My App
        </Text>
      </View>
      <View style={{ margin: 20 }}>
        <Text style={[styles.textHeader, { fontSize: 25 }]}>
          Hello, who's this?
        </Text>
      </View>
      <View style={[styles.fieldContainer, { marginTop: 30 }]}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter email"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message as string}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Password"
                secureTextEntry={isPasswordHidden}
              />
              <Pressable
                onPress={() => setPasswordHidden(!isPasswordHidden)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={isPasswordHidden ? "eye-slash" : "eye"}
                  size={20}
                  color="#000"
                />
              </Pressable>
            </>
          )}
        />

        {errors.password && (
          <Text style={styles.error}>{errors.password.message as string}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.textHeader} onPress={() => {}}>
          <Text style={[styles.label, { color: "#b1afaf" }]}>
            Forgot password ?
          </Text>
        </Pressable>
        <Text style={[styles.label, styles.textHeader, { color: "#b1afaf" }]}>
          Don't have an account yet?{" "}
          <Text
            style={{ color: "#625f5f", textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("Signup")}
          >
            {" "}
            Sign up
          </Text>
        </Text>
        <Pressable
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.textBtn}>Login</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    padding: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  textHeader: {
    alignSelf: "center",
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    paddingRight: 40,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  textBtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "55%",
  },
});

export default Login;
