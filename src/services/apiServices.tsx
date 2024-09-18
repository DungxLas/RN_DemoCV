import instance from "../utils/axiosCustomize";

// Định nghĩa interface ApiResponse
interface ApiResponse {
  EC: number; // Error Code
  EM: string; // Error Message
  DT?: any; // Data (nếu có)
}

const postCreateNewUser = (data): Promise<ApiResponse | null> => {
  const userData = new FormData();
  userData.append("email", data.email);
  userData.append("password", data.password);
  userData.append("username", data.userName);
  userData.append("role", data.role);
  userData.append("userImage", data.image.uri);

  return instance.post("api/v1/participant", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { postCreateNewUser };
