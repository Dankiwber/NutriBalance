import React, { useState, useRef } from "react";
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

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const formikRef = useRef(); // 引用 Formik 实例
  const router = useRouter(); // 使用 useRouter 进行导航

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const handleLoginSubmit = (values) => {
    console.log("Logging in with values:", values);
    if (values.email === "88888888@qq.com" && values.password === "88888888") {
      router.push("/home"); // 导航到主页面
    } else {
      alert("Invalid email or password"); // 显示错误提示
    }
  };
  const handleRegisterSubmit = (values) => {
    console.log("Registering with values:", values);
  };
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

  return (
    <>
      <View style={styles.header_container}>
        <Image
          style={styles.logo_container}
          source={require("../../assets/icons/logo.png")}
        />
        <Text style={styles.logo_text_base}>
          <Text style={styles.logo_text_sp}>Nutri</Text>Balance
        </Text>
      </View>
      <View style={styles.login_container}>
        <View
          style={[
            isLogin
              ? styles.welcome_text_container_login
              : styles.welcome_text_container_create,
          ]}
        >
          {isLogin ? <Text style={styles.welcome_text1}>Hello</Text> : ""}

          {isLogin ? (
            <Text style={styles.welcome_text2_login}>
              Sign into your account
            </Text>
          ) : (
            <Text style={styles.welcome_text2_create}>Create your account</Text>
          )}
        </View>
        <Formik
          innerRef={formikRef}
          initialValues={
            isLogin
              ? { email: "", password: "" }
              : { username: "", email: "", password: "", confirmPassword: "" }
          }
          validationSchema={
            isLogin ? loginValidationSchema : registerValidationSchema
          }
          onSubmit={(values) => {
            if (isLogin) {
              handleLoginSubmit(values);
            } else {
              handleRegisterSubmit(values);
            }
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
              {!isLogin && (
                <View style={styles.input_container}>
                  <Text style={styles.input_text}>Username</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                </View>
              )}
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
              {!isLogin && (
                <View style={styles.input_container}>
                  <Text style={styles.input_text}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
              )}
              <TouchableOpacity style={styles.forget_button}>
                {isLogin && (
                  <Text style={styles.forget_button_text}>
                    Forget your Password?
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[isLogin ? styles.login_button : styles.create_button]}
                onPress={handleSubmit}
              >
                {isLogin ? (
                  <Link href={"/main_app"} style={styles.login_button_text}>
                    Login
                  </Link>
                ) : (
                  <Text style={styles.login_button_text}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.creat_acc_container}>
        <TouchableOpacity
          onPress={() => {
            setIsLogin(!isLogin); // 切换登录/创建账号状态
            formikRef.current?.resetForm(); // 重置表单内容
          }}
        >
          <Text style={styles.creat_acc_base}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Text style={styles.creat_acc_sp}>
              {isLogin ? "Create here" : "Login here"}
            </Text>
          </Text>
        </TouchableOpacity>
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
    width: 380,
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
  welcome_text2_login: {
    color: "#BD5D7B",
    fontWeight: 500,
    textAlign: "center",
    fontSize: 18,
  },
  welcome_text2_create: {
    marginTop: 25,
    color: "#BD5D7B",
    fontWeight: 500,
    textAlign: "center",
    fontSize: 18,
  },
  welcome_text_container_login: {
    height: 150,
  },
  welcome_text_container_create: {
    height: 60,
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

export default AuthScreen;
