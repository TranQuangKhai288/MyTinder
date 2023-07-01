import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { LogoIcon } from "../constants/icons";
import { StatusBar } from "expo-status-bar";
import { RED_COLOR } from "../constants/color";
import { SCREEN_WIDTH } from "../constants/constants";

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Perform login logic here
    navigation.navigate("LoginScreen");
  };
  const handleSignUp = () => {
    // Perform login logic here
    navigation.navigate("SignUpScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ flex: 0.7, alignItems: "center" }}>
          <SvgXml xml={LogoIcon} />
          <Text
            style={{ marginTop: 48, fontFamily: "LatoBlack", fontSize: 20 }}
          >
            Sign up to continue
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("SignUpScreenByPhoneNumber");
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontFamily: "LatoBold",
              }}
            >
              Use phone number
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              marginTop: 16,
              paddingVertical: 16,
              width: SCREEN_WIDTH * 0.68,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#C0C0C0",
              borderWidth: 1,
            }}
            onPress={handleSignUp}
          >
            <Text
              style={{
                color: RED_COLOR,
                fontSize: 16,
                fontFamily: "LatoBold",
              }}
            >
              Use email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin}>
            <Text
              style={{ marginTop: 64, fontSize: 16, fontFamily: "LatoRegular" }}
            >
              Already have an account?{" "}
              <Text style={{ color: RED_COLOR, fontFamily: "LatoBold" }}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
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
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: RED_COLOR,
    borderRadius: 16,
    marginTop: 56,
    paddingVertical: 16,
    width: SCREEN_WIDTH * 0.68,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
