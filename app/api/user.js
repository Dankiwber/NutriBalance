const BASE_URL = "http://192.168.1.66:3000/data";

export const getUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/weekly_cal`, {
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

export default getUserProfile;
