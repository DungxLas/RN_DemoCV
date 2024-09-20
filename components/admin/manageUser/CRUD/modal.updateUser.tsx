import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { pushUpdateUser } from "../../../../src/services/apiServices";
import ImagePicker from "../imagePicker";

const ModalUpdateUser = (props) => {
  const { closeModal, userUpdate, fetchListUsers } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("email", userUpdate.email);
    setValue("password", "");
    setValue("userName", userUpdate.username);
    setValue("role", userUpdate.role);
    setValue("imageUrl", `data:image/jpeg;base64,${userUpdate.image}`);
  }, [userUpdate]);

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (data) => {
    const dataUser = await pushUpdateUser(
      userUpdate.id,
      data.userName,
      data.role,
      data.imageUrl
    );

    if (dataUser && dataUser.EC === 0) {
      // Hiển thị thông báo
      Toast.show({
        type: "success",
        text1: dataUser.EM,
        position: "bottom",
      });

      handleClose(); // Đóng modal

      await fetchListUsers();
    }

    if (dataUser && dataUser.EC !== 0) {
      // Hiển thị thông báo lỗi
      Toast.show({
        type: "error",
        text1: dataUser.EM,
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
                editable={false}
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
            //rules={{ required: "Password is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Password"
                editable={false}
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
            name="imageUrl"
            rules={{ required: "Image is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ImagePicker
                onTakeImage={(imageUrl) => onChange(imageUrl)}
                imageUrl={value}
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>Update User</Text>
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
    width: 120,
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

export default ModalUpdateUser;
