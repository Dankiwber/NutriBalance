import React, { useState } from "react";
import { rest_password_email, verify_code, password_change } from "../api/auth";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const ResetPasswordScreen = () => {
  const [step, setStep] = useState(1);
  // 表单校验规则
  const validationSchemas = [
    Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    }),
    Yup.object().shape({
      code: Yup.string()
        .length(6, "Code must be 6 digits")
        .required("Verification code is required"),
    }),
    Yup.object().shape({
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Must include uppercase, lowercase, number, and special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
  ];

  const handleNextStep = async (values) => {
    if (step === 1) {
      // 调用后端API发送验证码
      try {
        const result = await rest_password_email(values.email);

        console.log(result);
        setStep(step + 1);
        //setUseremail(values.email);
      } catch (error) {
        //setUseremail(values.email);
        Alert.alert("Something went wrong", error.error);
      }
    } else if (step === 2) {
      try {
        const result = await verify_code(values.email, values.code);
        console.log(result);
        Alert.alert("Verification code confirmed!");
        setStep(step + 1);
      } catch (error) {
        Alert.alert("Something went wrong", error.error);
      }
      //Alert.alert("Verification code confirmed!");
    } else if (step === 3) {
      // 重置密码
      try {
        const result = await password_change(values.email, values.password);
        console.log(result);
        Alert.alert("Password reset successfully!");
      } catch (error) {
        Alert.alert("Something went wrong", error.error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          code: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchemas[step - 1]}
        onSubmit={handleNextStep}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            {step === 1 && (
              <>
                <Text>Enter your email</Text>
                <TextInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={styles.input}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <Text>Enter verification code</Text>
                <TextInput
                  placeholder="Verification Code"
                  value={values.code}
                  onChangeText={handleChange("code")}
                  onBlur={handleBlur("code")}
                  style={styles.input}
                  keyboardType="numeric"
                />
                {errors.code && touched.code && (
                  <Text style={styles.errorText}>{errors.code}</Text>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <Text>Enter new password</Text>
                <TextInput
                  placeholder="New Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  style={styles.input}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TextInput
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  secureTextEntry
                  style={styles.input}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </>
            )}

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>
                {step === 3 ? "Reset Password" : "Next"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 },
  errorText: { color: "red", fontSize: 12 },
  button: {
    backgroundColor: "#6387A9",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default ResetPasswordScreen;
