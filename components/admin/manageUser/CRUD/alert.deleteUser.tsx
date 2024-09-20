import { Alert } from "react-native";
import { deleteUser } from "../../../../src/services/apiServices";
import Toast from "react-native-toast-message";

const AlertDeleteUser = (user, fetchListUsers) => {
  const deleteUserId = async (userId) => {
    const res = await deleteUser(userId);

    if (res && res.EC === 0) {
      // Hiển thị thông báo
      Toast.show({
        type: "success",
        text1: res.EM,
        position: "bottom",
      });

      await fetchListUsers();
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
    "Delete Item", // Tiêu đề Alert
    `Are you sure you want to delete ${user.username}?`, // Nội dung thông báo
    [
      {
        text: "Close", // Tùy chọn hủy
        style: "cancel", // Style để hiển thị dưới dạng nút hủy
      },
      {
        text: "OK", // Tùy chọn xóa
        onPress: () => {
          deleteUserId(user.id);
        }, // Gọi hàm deleteUser khi chọn "OK"
        style: "destructive", // Style destructive để nhấn mạnh hành động nguy hiểm
      },
    ]
  );
};

export default AlertDeleteUser;
