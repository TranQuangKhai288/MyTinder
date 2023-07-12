import React, { useCallback, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
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
  fetchAllUserData,
  updateOnlineStatus,
} from "../firebase/user";
import { useFocusEffect } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";
import PopUpNotificationDialog from "./PopUpNotificationDialog";
import { allUserClear, allUserFetch } from "../redux/actions/allUserActions";
import { SvgXml } from "react-native-svg";
import { LogoIcon } from "../constants/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
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
      dispatch(allUserClear());
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
          let users = await fetchAllUserData();
          dispatch(allUserFetch(users.filter((u) => u.id !== user.id)));
          updateOnlineStatus(user);
          if (userState.isSetUp) {
            navigation.replace("BottomTab");
          } else {
            navigation.replace("SetUpProfile");
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
    navigation.replace("SignUpScreen");
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
      <View
        style={[
          styles.wrapper,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        {/* <ImageBackground
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
        /> */}

        <View style={styles.containerLogin}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: 40,
              marginTop: 32,
            }}
          >
            <SvgXml xml={LogoIcon} height={120} width={120} />
            <Text style={styles.loginText}>Sign in to continue</Text>
          </View>

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
              color={RED_COLOR}
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
              color={RED_COLOR}
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

          <TouchableOpacity
            onPress={handleForgot}
            style={{ marginVertical: 2 }}
          >
            <Text style={styles.fpText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={!enableNextButton}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <Text style={{ fontFamily: "LatoRegular", fontSize: 15 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text
                style={{
                  color: RED_COLOR,
                  fontFamily: "LatoBold",
                  marginLeft: 4,
                  fontSize: 15,
                }}
              >
                Sign up
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
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "LatoBlack",
    fontSize: 20,
    marginTop: 16,
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
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontFamily: "LatoRegular",
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
    fontFamily: "LatoBold",
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "LatoBold",
    alignSelf: "center",
    fontSize: 22,
  },
  registerText: {
    alignSelf: "center",
    marginTop: 12,
    fontFamily: "LatoRegular",
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: "flex-end",
    fontFamily: "LatoBold",
    fontSize: 15,
    color: RED_COLOR,
  },
});
export default LoginScreen;
