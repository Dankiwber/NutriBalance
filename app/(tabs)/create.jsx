import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { chatbot_query_test } from "../api/auth";
import { eventEmitter1 } from "./home";
const Create = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [foodData, setFoodData] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSend = async () => {
    if (userInput.trim()) {
      setMessages([{ type: "user", text: userInput }]); // 覆盖之前的消息
      setUserInput("");
      setIsLoading(true);
      setConfirmationMessage("");

      try {
        const ans = await chatbot_query_test(userInput.trim());

        if (ans && ans.size > 0) {
          setFoodData(ans);
        } else {
          setMessages([{ type: "bot", text: "No data found." }]);
        }
      } catch (error) {
        console.log(error);
        setMessages([{ type: "bot", text: "An error occurred." }]);
      }

      setIsLoading(false);
    }
  };
  const handledeny = async () => {
    setFoodData(null);

    await SecureStore.deleteItemAsync("current_intakearr");
    setConfirmationMessage(
      "Sorry about that, please enter in the text area again."
    );
  };
  const handleConfirm = async () => {
    setFoodData(null);
    const current_date = await SecureStore.getItemAsync("current_date");
    console.log(current_date);
    const intake_data = await SecureStore.getItemAsync("current_intakearr");
    const intake_arr = JSON.parse(intake_data);
    // fat, carb, pro
    const data = await SecureStore.getItemAsync("userData");
    const userData = JSON.parse(data);
    const updateed_data = userData;

    console.log(updateed_data["weekly_intake"]);

    updateed_data["weekly_intake"][current_date] = String(
      parseInt(updateed_data["weekly_intake"][current_date]) + intake_arr.total
    );

    updateed_data["daily_intake"][0] = String(
      parseInt(updateed_data["daily_intake"][0]) + intake_arr.fat
    );
    updateed_data["daily_intake"][1] = String(
      parseInt(updateed_data["daily_intake"][1]) + intake_arr.carb
    );
    updateed_data["daily_intake"][2] = String(
      parseInt(updateed_data["daily_intake"][2]) + intake_arr.prot
    );
    updateed_data["daily_intake"][3] = String(
      parseInt(updateed_data["daily_intake"][3]) + intake_arr.total
    );
    console.log(updateed_data["weekly_intake"]);
    await SecureStore.setItemAsync("userData", JSON.stringify(updateed_data));
    const Newdata = await SecureStore.getItemAsync("userData");
    const NewuserData = JSON.parse(Newdata);
    console.log(NewuserData["daily_intake"]);

    eventEmitter1.emit("storageChange"); // 触发数据更新
    setConfirmationMessage(
      "Data has been recorded, if you want to log more please enter in the text area."
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.topText}>
        <Text style={styles.headerText}>Food Logger</Text>
      </View>

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
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}

        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#FF6B6B"
            style={styles.loadingIndicator}
          />
        )}

        {foodData && (
          <View style={styles.foodContainer}>
            <Text style={styles.foodContainer_text}>
              Does the following list correct ?
            </Text>
            {Array.from(foodData.entries()).map(([food, intake], index) => (
              <View key={index} style={styles.foodItem}>
                <Text style={styles.foodName}>{food}</Text>
                <Text style={styles.foodIntake}>{intake}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handledeny}>
              <Text style={styles.confirmButtonText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        )}

        {confirmationMessage ? (
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>{confirmationMessage}</Text>
          </View>
        ) : null}
      </ScrollView>

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
    </KeyboardAvoidingView>
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
  loadingIndicator: {
    marginVertical: 10,
    alignSelf: "center",
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
  foodContainer: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 10,
  },
  foodContainer_text: {
    fontWeight: "800",
    fontSize: 15,
  },
  confirmationContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#D1E7FF",
    borderRadius: 10,
  },
  confirmationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  foodIntake: {
    fontSize: 16,
    color: "#FF6B6B",
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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

export default Create;
