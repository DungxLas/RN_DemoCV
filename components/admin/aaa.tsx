import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AAA = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Alert.alert("User Added", `Name: ${data.email}\nEmail: ${data.role}`);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
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
          <Text style={styles.error}>{errors.password.message as string}</Text>
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
          <Text style={styles.error}>{errors.userName.message as string}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Role</Text>
        <Controller
          control={control}
          name="role"
          rules={{ required: "Role is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              onBlur={onBlur}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="User" value="user" />
              <Picker.Item label="Admin" value="admin" />
            </Picker>
          )}
        />
        {errors.role && (
          <Text style={styles.error}>{errors.role.message as string}</Text>
        )}
      </View>

      <Button title="Add User" onPress={handleSubmit(onSubmit)} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
});

export default AAA;
