import { Account, Client, Avatars, ID, Databases } from "react-native-appwrite";
// Init your React Native SDK
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.dank.nutribalance",
  projectId: "677eff49001f435d5a06",
  databaseId: "677f0291000a0096349c",
  userCollectionId: "677f02c60039fba7ed08",
  storageId: "677f048e00085e7950fa",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

export const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    // 创建新用户
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create new account.");

    // 获取用户的初始化头像 URL
    const avatarsUrl = avatars.getInitials(username);

    // 登录用户以创建初始会话
    await signIn(email, password);

    // 在数据库中创建用户文档
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarsUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // 重新抛出错误，供调用者捕获
  }
};

export async function signIn(email, password) {
  try {
    // 创建会话
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Sign-in successful. Session created:", session);
    return session;
  } catch (error) {
    console.error("Sign-in failed:", error);
    throw new Error("Invalid credentials or server error.");
  }
}
