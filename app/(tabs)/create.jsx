import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { chatbot_query } from "../api/auth";

const create = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (userInput.trim()) {
      // 1. 立即显示用户的消息
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: userInput },
      ]);
      setUserInput(""); // 清空输入框

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "Analyzing ...", isLoading: true }, // 添加 isLoading 标志
      ]);
      setIsLoading(true); // 开始加载

      try {
        const ans = await chatbot_query(userInput.trim());

        // 如果 ans 是空字符串，显示默认提示
        const botMessage = ans === "" ? "No data found." : ans;

        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // 移除“Analyzing ...”的消息
          { type: "bot", text: botMessage }, // 添加机器人回复
        ]);
      } catch (error) {
        console.log(error);
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // 移除“Analyzing ...”的消息
          { type: "bot", text: error.error || "An error occurred." }, // 添加错误信息
        ]);
      }

      setIsLoading(false); // 结束加载
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topText}>
        <Text style={styles.headerText}>Chat Add</Text>
      </View>

      {/* Chat area */}
      <ScrollView
        style={styles.chatArea}
        contentContainerStyle={{ padding: 10 }}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.type === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            {message.isLoading ? ( // 如果是“Analyzing ...”，显示加载动画
              <View style={styles.loadingContainer}>
                <Text style={styles.messageText}>{message.text}</Text>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : (
              <Text style={styles.messageText}>{message.text}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter text about what you eat"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEFF5",
  },
  topText: {
    paddingTop: 60,
    backgroundColor: "#F6F8FC",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  chatArea: {
    flex: 1,
    backgroundColor: "#f3f3f4",
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#D1E7FF",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  messageText: {
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputArea: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#F6F8FC",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#FF6B6B",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default create;
