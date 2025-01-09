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

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarsUrl = avatars.getInitials(username);

    await signIn(email, password);

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
    console.log(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
