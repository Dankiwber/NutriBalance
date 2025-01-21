import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { Link, router } from "expo-router";
const ResetPasswordScreen = () => {
  const [step, setStep] = useState(1); // 控制当前步骤
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleHomeScreenStep = () => {
    router.push("/signin");
  };

  return (
    <View style={{ padding: 20 }}>
      {step === 1 && (
        <>
          <Text>Enter your email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
          />
          <TouchableOpacity onPress={handleNextStep}>
            <Text style={{ color: "blue" }}>Send Verification Code</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: "gray" }}>Back</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text>Enter verification code</Text>
          <TextInput
            placeholder="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
          />
          <TouchableOpacity onPress={handleNextStep}>
            <Text style={{ color: "blue" }}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
        <>
          <Text>Enter new password</Text>
          <TextInput
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
          />
          <TouchableOpacity
            onPress={() => Alert.alert("Password reset successfully!")}
          >
            <Text style={{ color: "blue" }}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ResetPasswordScreen;
