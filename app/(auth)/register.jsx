import React, { useState } from "react";
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import { createUser } from "../../lib/appwrite";

const RegisterScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegisterSubmit = async (values) => {
    console.log("Registering with values:", values);
    try {
      const result = await createUser(
        values.email,
        values.password,
        values.username
      );
      alert("The account is successfully registered");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Image style={styles.logo_container} source={icons.logo} alt="LOGO" />
        <Text style={styles.logo_text_base}>
          <Text style={styles.logo_text_sp}>Nutri</Text>Balance
        </Text>
      </View>
      <View style={styles.login_container}>
        <View style={styles.welcome_text_container_create}>
          <Text style={styles.welcome_text2_create}>Create your account</Text>
        </View>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegisterSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <View style={styles.input_container}>
                <Text style={styles.input_text}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#6387A9"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
              </View>
              <View style={styles.input_container}>
                <Text style={styles.input_text}>Email address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#6387A9"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.input_container}>
                <Text style={styles.input_text}>Password</Text>
                <View style={styles.password_container}>
                  <TextInput
                    style={styles.password_input}
                    placeholder="Password"
                    placeholderTextColor="#6387A9"
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.show_password_button}
                  >
                    <Image
                      source={!showPassword ? icons.no_eye : icons.eye}
                      style={styles.show_password_img}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.input_container}>
                <Text style={styles.input_text}>Confirm Password</Text>
                <View style={styles.password_container}>
                  <TextInput
                    style={styles.password_input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#6387A9"
                    secureTextEntry={!showConfirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.show_password_button}
                  >
                    <Image
                      source={!showConfirmPassword ? icons.no_eye : icons.eye}
                      style={styles.show_password_img}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.create_button}
                onPress={handleSubmit}
              >
                <Text style={styles.login_button_text}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.creat_acc_container}>
        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text style={styles.creat_acc_base}>
            Already have an account?{" "}
            <Text onPress={() => router.back()}>
              <Text style={styles.creat_acc_sp}>Login here</Text>
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header_container: {
    alignItems: "center",
    height: 160,
    marginTop: 20,
  },
  logo_text_base: {
    fontWeight: "800",
    fontSize: 40,
    color: "#6387A9",
  },
  logo_text_sp: {
    color: "#F16F98",
  },
  logo_container: {
    width: 103,
    height: 92,
  },
  login_container: {
    width: 360,
    height: 460,
    marginHorizontal: "auto",
    backgroundColor: "#A7BFD6",
    borderRadius: 20,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
  },
  welcome_text2_create: {
    marginTop: 25,
    color: "#BD5D7B",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 18,
  },
  welcome_text_container_create: {
    height: 60,
  },
  container: {
    alignItems: "center",
  },
  input: {
    width: 336,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 3,
    borderRadius: 5,
    backgroundColor: "rgba(222,219,219,0.5)",
  },
  password_container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "rgba(222,219,219,0.5)",
    width: 336,
    paddingHorizontal: 10,
    marginTop: 3,
  },
  password_input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
  },
  show_password_button: {
    marginLeft: 10,
  },
  show_password_img: {
    width: 20,
    height: 20,
  },
  input_text: {
    fontWeight: 500,
    fontSize: 15,
    marginLeft: 5,
  },
  input_container: {
    height: 80,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
  },
  create_button: {
    marginTop: 10,
    width: 252,
    height: 39,
    backgroundColor: "#6387A9",
    justifyContent: "center",
    borderRadius: 15,
  },
  login_button_text: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  creat_acc_container: {
    marginTop: 30,
    alignItems: "center",
  },
  creat_acc_base: {
    fontSize: 16,
    color: "#5E5E5E",
  },
  creat_acc_sp: {
    color: "#F16F98",
  },
});

export default RegisterScreen;
