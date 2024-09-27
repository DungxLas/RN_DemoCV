import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import { postCreateNewQuiz } from "../../../../src/services/apiServices";
import ImagePicker from "../../imagePicker";

const ModalAddNewQuiz = (props) => {
  const { closeModal, fetchListQuiz } = props;

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
    const res = await postCreateNewQuiz(data);
    if (res && res.EC === 0) {
      // Hiển thị thông báo
      Toast.show({
        type: "success",
        text1: res.EM,
        position: "bottom",
      });

      handleClose();
      await fetchListQuiz();
    }
    if (res && res.EC !== 0) {
      // Hiển thị thông báo lỗi
      Toast.show({
        type: "error",
        text1: res.EM,
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Your quiz name"
                keyboardType="email-address"
              />
            )}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Your Description"
              />
            )}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Quiz type</Text>
          <Controller
            control={control}
            name="type"
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
                  <Picker.Item label="Easy" value="EASY" />
                  <Picker.Item label="Medium" value="MEDIUM" />
                  <Picker.Item label="Hard" value="HARD" />
                </Picker>
              </View>
            )}
          />
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
            <Text style={styles.text}>Save</Text>
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
    backgroundColor: "#ffbf00",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default ModalAddNewQuiz;
