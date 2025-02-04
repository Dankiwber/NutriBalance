import axios from "axios";
const BASE_URL = "http://192.168.1.66:3000/api";
const BASE_URL_data = "http://192.168.1.66:3000/data";

export const registerUser = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Register fail");
  }
  return data;
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });

    return response.data; // 返回请求结果
  } catch (error) {
    throw error.response.data; // 抛出错误，以便调用者可以处理
  }
};

export const rest_password_email = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const verify_code = async (email, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-reset-code`, {
      code: code,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export const password_change = async (email, newPassword) => {
  try {
    console.log(newPassword);
    const response = await axios.post(`${BASE_URL}/reset-password`, {
      email: email,
      newPassword: newPassword,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
export const chatbot_query_test = async (input_query) => {
  console.log("es");
  const response = [
    {
      name: "apple",
      intake: "5 units",
      calories: "325 cal",
      fat: "1 g",
      carbs: "86 g",
      protein: "1.5 g",
    },
    {
      name: "bread",
      intake: "150 g",
      calories: "390 cal",
      fat: "4.5 g",
      carbs: "72 g",
      protein: "12 g",
    },
    {
      name: "cola",
      intake: "1 can (330 ml)",
      calories: "139 cal",
      fat: "0 g",
      carbs: "35 g",
      protein: "0 g",
    },
  ];
  let food_arr = new Map();
  const intake_arr = [];
  response.forEach((food) => {
    food_arr.set(food.name, food.intake);
  });
  return food_arr;
};
export const chatbot_query = async (input_query) => {
  try {
    const response = await axios.post(`${BASE_URL}/query_process`, {
      query: input_query,
    });

    if (response.data.length === 0) {
      return "No data found."; // 如果对象为空，返回提示信息
    }
    let food_arr = new Map();
    response.data.forEach((food) => {
      food_arr.set(food.name, food.intake);
    });
    console.log(food_arr);
    return food_arr;
  } catch (error) {
    throw error.response?.data || "An error occurred."; // 确保抛出明确的错误信息
  }
};

export const logoutUser = async (token) => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "获取用户信息失败");
  }
  return data;
};

export const getdata = async (token) => {
  const response = await fetch(`${BASE_URL_data}/weekly_cal`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "获取用户信息失败");
  }
  return data;
};

export const getuserInfo = async (token) => {
  const response = await fetch(`${BASE_URL_data}/user_info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "获取用户信息失败");
  }
  return data;
};

export default {
  registerUser,
  loginUser,
  rest_password_email,
  verify_code,
  password_change,
  logoutUser,
  getdata,
  getuserInfo,
  chatbot_query_test,
};
