import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.text(password);
  };
  const handleLoginSubmit = async (values) => {
    try {
      const result = await registerUser(values.email, values.password);
    } catch (error) {
      Alert.alert("Something went wrong", error.message);
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
        <View style={styles.welcome_text_container_login}>
          <Text style={styles.welcome_text1}>Hello</Text>
          <Text style={styles.welcome_text2_login}>Sign into your account</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLoginSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            validatePassword,
          }) => (
            <View style={styles.container}>
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

              <TouchableOpacity style={styles.forget_button}>
                <Text style={styles.forget_button_text}>
                  Forget your Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.login_button}
                onPress={handleSubmit}
              >
                <Text style={styles.login_button_text}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.creat_acc_container}>
        <TouchableOpacity onPress={() => router.push("/auth/create")}>
          <Text style={styles.creat_acc_base}>
            Don't have an account?{" "}
            <Link href="/register" style={styles.creat_acc_sp}>
              Create here
            </Link>
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
    height: 460,
    width: 360,
    marginHorizontal: "auto",
    backgroundColor: "#A7BFD6",

    borderRadius: 20,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
  },
  welcome_text1: {
    fontWeight: "700",
    color: "#BD5D7B",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
    fontSize: 40,
  },
  welcome_text2_login: {
    color: "#BD5D7B",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 18,
  },
  welcome_text_container_login: {
    height: 150,
  },
  container: {
    alignItems: "center",
  },
  input: {
    width: 326,
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
    width: 326,
    paddingHorizontal: 10,
    marginTop: 3,
  },
  password_input: {
    flex: 1,

    paddingVertical: 10,
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
    fontSize: 14,
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
  forget_button: {
    alignSelf: "flex-end",
    marginEnd: 10,
  },
  forget_button_text: {
    fontSize: 12,
    color: "#BD5D7B",
  },
  login_button: {
    marginTop: 50,
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

export default LoginScreen;
