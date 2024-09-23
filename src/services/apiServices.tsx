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
  userData.append("userImage", {
    uri: data.imageUrl,
    type: "image/jpeg",
    name: "userImage.jpg",
  } as any);

  return instance.post("api/v1/participant", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getAllUsers = (): Promise<ApiResponse | null> => {
  return instance.get("api/v1/participant/all");
};

const pushUpdateUser = (
  id,
  username,
  role,
  imageUrl
): Promise<ApiResponse | null> => {
  const userData = new FormData();
  userData.append("id", id);
  userData.append("username", username);
  userData.append("role", role);
  userData.append("userImage", {
    uri: imageUrl,
    type: "image/jpeg",
    name: "userImage.jpg",
  } as any);

  return instance.put("api/v1/participant", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUser = (userId): Promise<ApiResponse | null> => {
  return instance.delete("api/v1/participant", { data: { id: userId } });
};

const postLogin = (userEmail, userPassword): Promise<ApiResponse | null> => {
  return instance.post("api/v1/login", {
    email: userEmail,
    password: userPassword,
  });
};

const postRegister = (
  userEmail,
  userName,
  userPassword
): Promise<ApiResponse | null> => {
  return instance.post("api/v1/register", {
    email: userEmail,
    username: userName,
    password: userPassword,
  });
};

const getQuizByUser = (): Promise<ApiResponse | null> => {
  return instance.get("/api/v1/quiz-by-participant");
};

const getDataQuiz = (id): Promise<ApiResponse | null> => {
  return instance.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

export {
  postCreateNewUser,
  getAllUsers,
  pushUpdateUser,
  deleteUser,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
};
