const BASE_URL = "http://<your-backend-ip>:3000/api";

export const getUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/profile`, {
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
