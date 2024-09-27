import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { deleteQuestionForQuiz } from "../../../../../src/services/apiServices";

const AlertDeleteQuestion = (quizId, questionId, fetchListQuizQA) => {
  const deleteQuestion = async () => {
    const res = await deleteQuestionForQuiz(questionId, quizId);

    if (res && res.EC === 0) {
      // Hiển thị thông báo
      Toast.show({
        type: "success",
        text1: res.EM,
        position: "bottom",
      });

      await fetchListQuizQA();
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
    `Are you sure you want to delete this question?`, // Nội dung thông báo
    [
      {
        text: "Close", // Tùy chọn hủy
        style: "cancel", // Style để hiển thị dưới dạng nút hủy
      },
      {
        text: "OK", // Tùy chọn xóa
        onPress: () => {
          deleteQuestion();
        }, // Gọi hàm deleteUser khi chọn "OK"
        style: "destructive", // Style destructive để nhấn mạnh hành động nguy hiểm
      },
    ]
  );
};

export default AlertDeleteQuestion;
