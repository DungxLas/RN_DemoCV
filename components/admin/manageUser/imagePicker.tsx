import { Ionicons } from "@expo/vector-icons";
import {
  ImagePickerResult,
  ImagePickerSuccessResult,
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ImagePicker = (props) => {
  const { onTakeImage, value } = props;

  const [pickedImage, setPickedImage] = useState(value);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return false;
    }

    const image: ImagePickerResult = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (
      !image.canceled &&
      (image as ImagePickerSuccessResult).assets.length > 0
    ) {
      // Extract the URI from the first asset in the assets array
      const pickedImageNow = (image as ImagePickerSuccessResult).assets[0];
      setPickedImage(pickedImageNow); // Set the URI as the string in state
      onTakeImage(pickedImageNow);
    } else {
      Alert.alert("Image picker canceled");
    }
  };

  let imagePreview = <Text>No Image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImage.uri }} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => takeImageHandler()}
      >
        <Ionicons
          style={styles.icon}
          name="camera"
          size={18}
          color={Colors.primary500}
        />
        <Text style={styles.text}>Take Image</Text>
      </Pressable>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});
