import { Link } from "expo-router";
import React from "react";
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

const LoginScreen = () => {
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter your email address")
      .required("Please enter your email address"),
    password: Yup.string()
      .min(8, "password at least 8 digits")
      .required("Please enter your password"),
  });

  return (
    <>
      <View style={styles.header_container}>
        <Image
          style={styles.logo_container}
          source={require("@/assets/images/Logo.png")}
        />
        <Text style={styles.logo_text_base}>
          <Text style={styles.logo_text_sp}>Nutri</Text>Balance
        </Text>
      </View>
      <View style={styles.login_container}>
        <View style={styles.welcome_text_container}>
          <Text style={styles.welcome_text1}>Hello</Text>
          <Text style={styles.welcome_text2}>Create your account Today!</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            console.log("Login Values:", values);
          }}
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
                <Text style={styles.input_text}>Email address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
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
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />

                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <TouchableOpacity style={styles.forget_button}>
                <Text style={styles.forget_button_text}>
                  Forget your Passwrod ?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.login_button}>
                <Text style={styles.login_button_text}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.creat_acc_container}>
        <Text style={styles.creat_acc_base}>
          Don't have an acoount?{" "}
          <Link href="/Create_acc" style={styles.creat_acc_sp}>
            Create here
          </Link>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header_container: {
    alignItems: "center",
    height: 160,
    marginTop: 90,
  },
  logo_text_base: {
    fontWeight: 800,
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
  welcome_text1: {
    fontWeight: 700,
    color: "#BD5D7B",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
    fontSize: 40,
  },
  welcome_text2: {
    color: "#BD5D7B",
    fontWeight: 500,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "blue",
  },
  welcome_text_container: {
    height: 150,
  },

  container: {
    alignItems: "center", // 水平居中
  },
  input: {
    width: 346,
    borderWidth: 1,
    borderColor: "#ccc",

    padding: 10,
    marginVertical: 3,
    borderRadius: 5,
    backgroundColor: "rgba(222,219,219,0.5)",
  },
  input_text: {
    fontSize: 14,
    marginLeft: 5,
    color: "rgba(0, 0, 0, 0.6)",
  },
  input_container: {
    height: 80,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "left", // 确保文本靠左对齐
    alignSelf: "flex-start", // 不受父容器的 alignItems: "center" 影响
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
