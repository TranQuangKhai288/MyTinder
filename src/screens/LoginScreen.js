import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFonts } from "expo-font";
import { FIREBASE_AUTH } from "../../firebaseConfig";
//import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { RED_COLOR } from "../constants/color";

const LoginScreen = ({ navigation }) => {
  console.log("LoginScreen");
  const [isLogin, setIsLogin] = useState(false);
  //text input states
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmptyGmail, setCheckEmptyGmail] = useState(false);
  const [checkEmptyPassword, setCheckEmptyPassword] = useState(false);
  const handleLogin = () => {
    if (gmail === "") {
      setCheckEmptyGmail(true);
    }
    if (password === "") {
      setCheckEmptyPassword(true);
    }

    signInWithEmailAndPassword(FIREBASE_AUTH, gmail, password)
      .then(() => {
        setIsLogin(true);
        console.log("User logged in!");
        navigation.navigate("BottomTab");
      })
      .catch((error) => {
        console.log("Error logging in:", error);
        if (error.code === "auth/user-not-found") {
          Alert.alert("User not found");
        }
        if (error.code === "auth/invalid-email") {
          Alert.alert("Invalid email");
        }
        if (error.code === "auth/wrong-password") {
          Alert.alert("Wrong password");
        }
      });
  };

  const handleSignUp = () => {
    // Perform login logic here
    navigation.navigate("SignUpScreen");
  };

  const handleForgot = () => {
    // Perform login logic here
    navigation.navigate("ForgotPassScreen");
  };

  const [fontsLoaded] = useFonts({
    SourceSansProBold: require("../assets/fonts/SourceSansPro-Bold.ttf"),
    SourceSansProRegular: require("../assets/fonts/SourceSansPro-Regular.ttf"),
  });
  if (!fontsLoaded) return undefined;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={require("../assets/images/backgr.jpg")}
          style={{
            flex: 1,
            justifyContent: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <View style={styles.containerLogin}>
          <Text style={styles.loginText}>Login</Text>

          <View
            style={[
              styles.inputView,
              checkEmptyGmail ? { borderWidth: 1, borderColor: "red" } : {},
            ]}
          >
            <FontAwesome5
              style={styles.inputIcon}
              name="user"
              type="ionicons"
              color="#5352ed"
            />
            <TextInput
              placeholder="Gmail"
              autoCapitalize="none"
              style={[styles.input]}
              value={gmail}
              onChangeText={(text) => {
                setGmail(text);
                setCheckEmptyGmail(false);
              }}
            />
          </View>

          <View
            style={[
              styles.inputView,
              checkEmptyPassword ? { borderWidth: 1, borderColor: "red" } : {},
            ]}
          >
            <FontAwesome5
              style={styles.inputIcon}
              name="lock"
              type="ionicons"
              color="#5352ed"
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text), setCheckEmptyPassword(false);
              }}
            />
          </View>

          <TouchableOpacity onPress={handleForgot}>
            <Text style={styles.fpText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text
                style={{
                  color: RED_COLOR,
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                  marginLeft: 4,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  containerLogin: {
    backgroundColor: "#fff",
    opacity: 0.95,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  loginText: {
    fontFamily: "SourceSansProBold",
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f1f3f6",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: RED_COLOR,
    paddingVertical: 10,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "SourceSansProBold",
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "SourceSansProBold",
    alignSelf: "center",
    fontSize: 22,
  },
  registerText: {
    alignSelf: "center",
    marginTop: 12,
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#5352ed",
  },
});
export default LoginScreen;
