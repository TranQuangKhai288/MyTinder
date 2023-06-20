import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { LogoIcon } from "../constants/icons";
import { StatusBar } from "expo-status-bar";
import { RED_COLOR } from "../constants/color";

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
          <Text style={{ marginTop: 64, fontWeight: "bold", fontSize: 18 }}>
            Sign up to continue
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Sign up with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              marginTop: 16,
              paddingVertical: 16,
              paddingHorizontal: 70,
              borderColor: "#C0C0C0",
              borderWidth: 1,
            }}
            onPress={handleSignUp}
          >
            <Text
              style={{ color: RED_COLOR, fontSize: 18, fontWeight: "bold" }}
            >
              Create an account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin}>
            <Text style={{ marginTop: 64, fontSize: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: RED_COLOR, fontWeight: "bold" }}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: RED_COLOR,
    borderRadius: 16,
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 64,
  },
});

export default WelcomeScreen;
