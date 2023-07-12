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
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFonts } from "expo-font";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { RED_COLOR } from "../constants/color";
const SignUpScreen = ({ navigation }) => {
  //text input states
  const [phoneNumBer, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmptyPhoneNumber, setCheckEmptyPhoneNumber] = useState(false);
  const [checkEmptyPassword, setCheckEmptyPassword] = useState(false);
  const [checkSamePassword, setCheckSamePassword] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSignUp = () => {
    if (phoneNumBer === "") {
      setCheckEmptyPhoneNumber(true);
    }
    if (password === "") {
      setCheckEmptyPassword(true);
    }
    if (checkSamePassword === false) {
      Alert.alert("Password is not the same");
    } else {
      createUserWithEmailAndPassword(FIREBASE_AUTH, phoneNumBer, password)
        .then((userCredential) => {
          console.log("User created!");
        })
        .catch((error) => {
          console.log("Error creating user:", error);
        });
    }
  };

  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      console.log(currentDate.toString());
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(
          currentDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    } else {
      toggleDatePicker();
    }
  };

  const handleValidatePassword = (text) => {
    if (text !== password) {
      setCheckSamePassword(false);
    } else {
      setCheckSamePassword(true);
    }
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
        <View style={styles.containerSignUp}>
          <Text style={styles.loginText}>Sign Up</Text>
          {/* TextInput gmail */}
          <View
            style={[
              styles.inputView,
              checkEmptyPhoneNumber
                ? { borderWidth: 1, borderColor: "red" }
                : {},
            ]}
          >
            <FontAwesome5
              style={styles.inputIcon}
              name="phone"
              type="ionicons"
              color="#E94057"
            />
            <TextInput
              placeholder="Phone Number"
              autoCapitalize="none"
              style={styles.input}
              value={phoneNumBer}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setCheckEmptyPhoneNumber(false);
              }}
              keyboardType="numeric"
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
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Text>Have an account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text
                style={{
                  color: RED_COLOR,
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                  marginLeft: 4,
                }}
              >
                Login
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
    fontFamily: "SourceSansProBold",
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  buttonText: {
    fontFamily: "SourceSansProBold",
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
    borderWidth: 1,
    borderColor: "#CCCCCC",
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
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#5352ed",
  },
});
export default SignUpScreen;
