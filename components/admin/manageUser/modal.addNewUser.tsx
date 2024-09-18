import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import ImagePicker from "./imagePicker";
import axios from "axios";
import Toast from "react-native-toast-message";

const ModalAddNewUser = (props) => {
  const { closeModal } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (data) => {
    //call apis
    const userData = new FormData();
    userData.append("email", data.email);
    userData.append("password", data.password);
    userData.append("username", data.userName);
    userData.append("role", data.role);

    if (data.image) {
      userData.append("userImage", {
        uri: data.image.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });
    }

    const response = await axios.post(
      "http://192.168.0.154:8081/api/v1/participant",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);

    if (response.data && response.data.EC === 0) {
      // Hiển thị thông báo
      Toast.show({
        type: "success",
        text1: response.data.EM,
        position: "bottom",
      });

      handleClose(); // Đóng modal
    }

    if (response.data && response.data.EC !== 0) {
      // Hiển thị thông báo lỗi
      Toast.show({
        type: "error",
        text1: response.data.EM,
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.fieldContainer}>
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
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>
              {errors.password.message as string}
            </Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>User Name</Text>
          <Controller
            control={control}
            name="userName"
            rules={{ required: "User Name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Enter User Name"
              />
            )}
          />
          {errors.userName && (
            <Text style={styles.error}>
              {errors.userName.message as string}
            </Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Role</Text>
          <Controller
            control={control}
            name="role"
            rules={{ required: "Role is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.picker}>
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  onBlur={onBlur}
                  // style={styles.picker}
                  mode="dropdown"
                >
                  <Picker.Item label="User" value="USER" />
                  <Picker.Item label="Admin" value="ADMIN" />
                </Picker>
              </View>
            )}
          />
          {errors.role && (
            <Text style={styles.error}>{errors.role.message as string}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Image</Text>
          <Controller
            control={control}
            name="image"
            rules={{ required: "Image is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ImagePicker
                onTakeImage={(imageUrl) => onChange(imageUrl)}
                value={value}
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>Add User</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleClose()}>
            <Text style={styles.text}>Close</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  form: {
    flex: 1,
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
    flexDirection: "row",
    justifyContent: "space-around",
    //alignItems: "center",
    marginTop: 10,
  },
  button: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ModalAddNewUser;
