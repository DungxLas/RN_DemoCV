import { Alert } from "react-native";
import { deleteQuizForAdmin } from "../../../../src/services/apiServices";
import Toast from "react-native-toast-message";

const AlertDeleteQuiz = (quiz, fetchListQuizs) => {
  const deleteQuizId = async (id) => {
    const res = await deleteQuizForAdmin(id);

    if (res && res.EC === 0) {
      // Hiển thị thông báo
      Toast.show({
        type: "success",
        text1: res.EM,
        position: "bottom",
      });

      await fetchListQuizs();
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

  return Alert.alert(
    "Delete Quiz", // Tiêu đề Alert
    `Are you sure you want to delete ${quiz.name}?`, // Nội dung thông báo
    [
      {
        text: "Close", // Tùy chọn hủy
        style: "cancel", // Style để hiển thị dưới dạng nút hủy
      },
      {
        text: "OK", // Tùy chọn xóa
        onPress: () => {
          deleteQuizId(quiz.id);
        }, // Gọi hàm deleteUser khi chọn "OK"
        style: "destructive", // Style destructive để nhấn mạnh hành động nguy hiểm
      },
    ]
  );
};

export default AlertDeleteQuiz;
