import axios from "axios";
const BASE_URL = "http://192.168.1.66:3000/api";

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
    console.log("Logging in with email:", email);
    const response = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });

    console.log("Post successful:", response.data);
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

export const chatbot_query = async (input_query) => {
  try {
    const response = await axios.post(`${BASE_URL}/query_process`, {
      query: input_query,
    });
    console.log("API Response:", response.data); // 调试返回值
    const obj = response.data;
    const obj_arr = Object.keys(obj);

    if (obj_arr.length === 0) {
      return "No data found."; // 如果对象为空，返回提示信息
    }

    var ans = "Is the following list correct?\n";
    obj_arr.forEach((Element, index) => {
      const item = `${index + 1}. ${Element}`;
      const intake = `${obj[Element].total_intake}`;
      ans = ans + `${item.padEnd(20)}${intake.padEnd(20)}\n`;
    });
    console.log(ans);
    return ans;
  } catch (error) {
    throw error.response?.data || "An error occurred."; // 确保抛出明确的错误信息
  }
};

export default {
  registerUser,
  loginUser,
  rest_password_email,
  verify_code,
  password_change,
};
