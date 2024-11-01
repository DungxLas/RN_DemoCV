import instance from "../utils/axiosCustomize";

// Định nghĩa interface ApiResponse
interface ApiResponse<T> {
  EC: number; // Error Code
  EM: string; // Error Message
  DT?: T; // Data (nếu có)
}

const postCreateNewUser = (data): Promise<ApiResponse<IUserLogin> | null> => {
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

const getAllUsers = (): Promise<ApiResponse<any> | null> => {
  return instance.get("api/v1/participant/all");
};

const pushUpdateUser = (
  id,
  username,
  role,
  imageUrl
): Promise<ApiResponse<any> | null> => {
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

const deleteUser = (userId): Promise<ApiResponse<any> | null> => {
  return instance.delete("api/v1/participant", { data: { id: userId } });
};

const postLogin = (
  userEmail,
  userPassword
): Promise<ApiResponse<any> | null> => {
  return instance.post("api/v1/login", {
    email: userEmail,
    password: userPassword,
  });
};

const postRegister = (
  userEmail,
  userName,
  userPassword
): Promise<ApiResponse<any> | null> => {
  return instance.post("api/v1/register", {
    email: userEmail,
    username: userName,
    password: userPassword,
  });
};

const getQuizByUser = (): Promise<ApiResponse<any> | null> => {
  return instance.get("/api/v1/quiz-by-participant");
};

const getDataQuiz = (id): Promise<ApiResponse<any> | null> => {
  return instance.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data): Promise<ApiResponse<any> | null> => {
  return instance.post("api/v1/quiz-submit", { ...data });
};

const postCreateNewQuiz = (data): Promise<ApiResponse<any> | null> => {
  const quizData = new FormData();
  quizData.append("description", data.description);
  quizData.append("name", data.name);
  quizData.append("difficulty", data.type);
  quizData.append("quizImage", {
    uri: data.imageUrl,
    type: "image/jpeg",
    name: "userImage.jpg",
  } as any);

  return instance.post("api/v1/quiz", quizData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getAllQuizForAdmin = (): Promise<ApiResponse<any> | null> => {
  return instance.get("api/v1/quiz/all");
};

const pushUpdateQuiz = (
  id,
  description,
  name,
  type,
  imageUrl
): Promise<ApiResponse<any> | null> => {
  const quizData = new FormData();
  quizData.append("id", id);
  quizData.append("description", description);
  quizData.append("name", name);
  quizData.append("difficulty", type);
  quizData.append("userImage", {
    uri: imageUrl,
    type: "image/jpeg",
    name: "userImage.jpg",
  } as any);

  return instance.put("api/v1/quiz", quizData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteQuizForAdmin = (id): Promise<ApiResponse<any> | null> => {
  return instance.delete(`api/v1/quiz/${id}`);
};

const getQuizWithQA = (quizId): Promise<ApiResponse<any> | null> => {
  return instance.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postCreateNewQuestionForQuiz = (
  quiz_id,
  description,
  questionImageUrl
): Promise<ApiResponse<any> | null> => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", {
    uri: questionImageUrl,
    type: "image/jpeg",
    name: "userImage.jpg",
  } as any);

  return instance.post("api/v1/question", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
): Promise<ApiResponse<any> | null> => {
  return instance.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

const deleteQuestionForQuiz = (
  question_id,
  quiz_id
): Promise<ApiResponse<any> | null> => {
  return instance.delete("api/v1/question", {
    data: { id: question_id, quizId: quiz_id },
  });
};

const postUpsertQA = (data): Promise<ApiResponse<any> | null> => {
  return instance.post("api/v1/quiz-upsert-qa", { ...data });
};

const logout = (email, refresh_token): Promise<ApiResponse<any> | null> => {
  return instance.post("api/v1/logout", {
    email,
    refresh_token,
  });
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
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  pushUpdateQuiz,
  deleteQuizForAdmin,
  getQuizWithQA,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  deleteQuestionForQuiz,
  postUpsertQA,
  logout,
};
