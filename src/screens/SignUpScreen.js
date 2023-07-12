import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFonts } from "expo-font";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { RED_COLOR } from "../constants/color";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import PopUpNotificationDialog from "./PopUpNotificationDialog";
import { useSelector } from "react-redux";
import { addUserToFirestore, registerUser } from "../firebase/user";
import LoadingScreen from "./LoadingScreen";
import { set } from "firebase/database";
import { useEffect } from "react";
import PopUpNotification from "./PopUpNotification";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogoIcon } from "../constants/icons";
import { SvgXml } from "react-native-svg";
const SignUpScreen = ({ navigation }) => {
  const userState = useSelector((state) => state.user.user);
  const insets = useSafeAreaInsets();
  //text input states
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmptyGmail, setCheckEmptyGmail] = useState(false);
  const [checkEmptyPassword, setCheckEmptyPassword] = useState(false);
  const [checkSamePassword, setCheckSamePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const reset = () => {
      setGmail("");
      setPassword("");
      setCheckEmptyGmail(false);
      setCheckEmptyPassword(false);
      setCheckSamePassword(true);
      setIsLoading(false);
      setShowPopUp(false);
      setShowPopUp2(false);
      setPopUpMessage({
        title: "",
        content: "",
      });

      reset();
    };
  }, []);

  const showAlert = (title, content) => {
    setShowPopUp(true);
    setPopUpMessage({
      title: title,
      content: content,
    });
  };

  const showAlert2 = (content) => {
    setShowPopUp2(true);
    setPopUpMessage({
      title: "",
      content: content,
    });
  };

  const handleSignUp = async () => {
    if (gmail === "") {
      setCheckEmptyGmail(true);
    }
    if (password === "") {
      setCheckEmptyPassword(true);
    }
    if (checkSamePassword === false) {
    } else {
      setIsLoading(true);
      let user = userState;
      user.email = gmail;
      user.succesfulRegister = false;
      try {
        await registerUser(user, password, showAlert, showAlert2);
        if (user.succesfulRegister) {
          console.log("Register successful");
          await addUserToFirestore(user);
          // setTimeout(() => {
          //   navigation.navigate("LoginScreen");
          // }, 3000);
          setIsLoading(false);
          setTimeout(() => {
            navigation.replace("LoginScreen");
          }, 1500);
          console.log("Navigate to login screen");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error register user: ", error);
        setIsLoading(false);
      }
    }
  };

  const handleLogin = () => {
    {
      navigation.replace("LoginScreen");
    }
  };

  const handleSignUpByPhoneNumber = () => {
    navigation.navigate("SignUpScreenByPhoneNumber");
  };

  const handleValidatePassword = (text) => {
    if (text !== password) {
      setCheckSamePassword(false);
    } else {
      setCheckSamePassword(true);
    }
  };

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
        <View style={styles.containerSignUp}>
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
            <Text style={styles.loginText}>Sign up to continue</Text>
          </View>
          {/* TextInput gmail */}
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
              color="#E94057"
            />
            <TextInput
              placeholder="Gmail"
              autoCapitalize="none"
              style={styles.input}
              value={gmail}
              onChangeText={(text) => {
                setGmail(text);
                setCheckEmptyGmail(false);
              }}
            />
          </View>

          {/* TextInput password */}
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
              color="#E94057"
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setCheckEmptyPassword(false);
              }}
            />
          </View>
          {/* TextInput password */}
          <View style={[styles.inputView]}>
            <FontAwesome5
              style={styles.inputIcon}
              name="lock"
              type="ionicons"
              color="#E94057"
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(text) => {
                handleValidatePassword(text);
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              handleSignUp();
            }}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <Text style={{ fontFamily: "LatoRegular", fontSize: 15 }}>
              Have an account?
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text
                style={{
                  color: RED_COLOR,
                  fontFamily: "LatoBold",
                  marginLeft: 4,
                  fontSize: 15,
                }}
              >
                Sign in
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
      {showPopUp2 ? (
        <PopUpNotification
          onRequestClose={() => {
            setShowPopUp2(false);
          }}
          message={popUpMessage.content}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  containerSignUp: {
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
  buttonText: {
    fontFamily: "LatoBold",
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f6",
  },

  inputviewFirstName: {
    height: 40,
    width: "55%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  inputviewLastName: {
    height: 40,
    width: "40%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginTop: 10,
    display: "flex",
    marginLeft: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
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
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: "#5352ed",
  },
});
export default SignUpScreen;
