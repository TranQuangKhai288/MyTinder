import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { SCREEN_WIDTH } from "../constants/constants";
import { TouchableOpacity } from "react-native";
import { RED_COLOR } from "../constants/color";
import { StatusBar } from "expo-status-bar";

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.image_wrapper}>
        <Image
          source={require("../assets/images/startScreenImage.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.content_wrapper}>
        <View style={styles.header_wrapper}>
          <Text style={styles.header}>Matches</Text>
        </View>
        <View style={styles.description_wrapper}>
          <Text style={styles.description}>
            Interact with people with the same interest like you
          </Text>
        </View>
      </View>
      <View style={styles.footer_wrapper}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_text}>Create an account</Text>
        </TouchableOpacity>
        <View style={styles.have_account_wrapper}>
          <Text style={styles.have_account}>Already have an account? </Text>
          <TouchableOpacity style={styles.sign_in_wrapper}>
            <Text style={styles.sign_in}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image_wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH - 32,
    borderRadius: 32,
  },
  content_wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 120,
  },
  header_wrapper: {},
  header: {
    fontSize: 32,
    fontFamily: "SourceSansProSemiBold",
    color: RED_COLOR,
  },
  description_wrapper: { width: SCREEN_WIDTH * 0.72, marginTop: 12 },
  description: {
    fontSize: 18,
    fontFamily: "SourceSansProRegular",
    color: "#000",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0.16,
  },
  footer_wrapper: { justifyContent: "center", alignItems: "center" },
  button: {
    backgroundColor: RED_COLOR,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 96,
    paddingRight: 96,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  button_text: {
    fontSize: 18,
    fontFamily: "SourceSansProSemiBold",
    color: "#fff",
  },
  have_account_wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  have_account: { fontSize: 16, fontFamily: "SourceSansProRegular" },
  sign_in_wrapper: {},
  sign_in: {
    fontSize: 16,
    fontFamily: "SourceSansProSemiBold",
    color: RED_COLOR,
  },
});

export default StartScreen;
