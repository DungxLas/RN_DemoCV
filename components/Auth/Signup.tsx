import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";

const Signup = (props) => {
  const { navigation } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //   const handleClose = () => {
  //     reset();
  //     //closeModal();
  //   };

  const onSubmit = async (data) => {
    // const dataUser = await postCreateNewUser(data);
    // if (dataUser && dataUser.EC === 0) {
    //   // Hiển thị thông báo
    //   Toast.show({
    //     type: "success",
    //     text1: dataUser.EM,
    //     position: "bottom",
    //   });
    //   handleClose(); // Đóng modal
    // }
    // if (dataUser && dataUser.EC !== 0) {
    //   // Hiển thị thông báo lỗi
    //   Toast.show({
    //     type: "error",
    //     text1: dataUser.EM,
    //     position: "bottom",
    //   });
    // }
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
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Password"
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message as string}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.textHeader}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.label, { color: "#b1afaf" }]}>
            Do you have account?
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.textBtn}>Sign up</Text>
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
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
});

export default Signup;
