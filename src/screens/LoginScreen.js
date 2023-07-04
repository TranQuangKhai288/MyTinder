import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { RED_COLOR } from "../constants/color";
import { useSelector, useDispatch } from "react-redux";
import {
  userLogin,
  userLogout,
  userUpdateState,
} from "../redux/actions/userActions";
import {
  findUserDocumentIdFromFirestore,
  fetchUserData,
  updateUserVerifyToFirestore,
  loginUser,
  logoutUser,
} from "../firebase/user";
import { useFocusEffect } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";
import PopUpNotificationDialog from "./PopUpNotificationDialog";

const LoginScreen = ({ navigation }) => {
  console.log("LoginScreen");
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [enableNextButton, setEnableNextButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState({
    title: "",
    content: "",
  });
  //text input states
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmptyGmail, setCheckEmptyGmail] = useState(false);
  const [checkEmptyPassword, setCheckEmptyPassword] = useState(false);
  const showPopUpMessage = (title, message) => {
    setShowPopUp(true);
    setPopUpMessage({
      title: title,
      content: message,
    });
  };
  const handleLogin = async () => {
    if (gmail === "" || password === "") {
      if (gmail === "") {
        setCheckEmptyGmail(true);
      }
      if (password === "") {
        setCheckEmptyPassword(true);
      }
    } else {
      setIsLoading(true);
      setEnableNextButton(false);
      dispatch(userLogout());
      logoutUser();
      let user = userState;
      user.email = gmail;
      const docID = await findUserDocumentIdFromFirestore(gmail);
      user.docID = docID;
      console.log("docID: ", docID);
      try {
        await loginUser(user, password, showPopUpMessage);
        if (user.isVerified) {
          await updateUserVerifyToFirestore(user);
          await fetchUserData(user);
          console.log("Login successful");
          dispatch(userUpdateState(user));
          dispatch(userLogin());
          if (userState.isSetUp) {
            navigation.navigate("BottomTab");
          } else {
            navigation.navigate("SetUpProfile");
          }
          // navigation.navigate("BottomTab");
          setIsLoading(false);
        } else {
          console.log("Login unsuccessful");
          setIsLoading(false);
          setEnableNextButton(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setEnableNextButton(true);
      }
    }
  };

  const handleSignUp = () => {
    // Perform login logic here
    navigation.navigate("SignUpScreen");
  };

  const handleForgot = () => {
    // Perform login logic here
    // navigation.navigate("ForgotPassScreen");
  };

  useFocusEffect(
    useCallback(() => {
      setEnableNextButton(true);
      setIsLoading(false);
      console.log("useFocusEffect");
    }, [])
  );

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

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={!enableNextButton}
          >
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
      <PopUpNotificationDialog
        visible={showPopUp}
        onRequestClose={() => {
          setShowPopUp(false);
        }}
        title={popUpMessage.title}
        message={popUpMessage.content}
      />
      <LoadingScreen visible={isLoading} />
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
