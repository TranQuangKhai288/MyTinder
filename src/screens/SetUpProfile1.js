import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { CameraIcon } from "../constants/icons";
import {
  LIGHT_GRAY_COLOR,
  LIGHT_RED_COLOR,
  RED_COLOR,
} from "../constants/color";
import { TextInput } from "react-native";

const SetUpProfile1 = () => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          paddingTop: inset.top + 40,
          paddingBottom: inset.bottom + 40,
          paddingLeft: inset.left + 40,
          paddingRight: inset.right + 40,
        },
        styles.container,
      ]}
    >
      <View style={styles.header_wrapper}>
        <Text style={styles.header_text}>Your profile</Text>
      </View>
      <View style={styles.body_wrapper}>
        <View style={styles.avatar_wrapper}>
          <ImageBackground
            source={require("../assets/images/test-gallery1.png")}
            style={styles.avatar}
            borderRadius={60}
          >
            <TouchableOpacity style={styles.choose_avatar_button}>
              <SvgXml xml={CameraIcon} height={24} width={24} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.name_wrapper}>
          <View style={styles.name_header_wrapper}>
            <Text style={styles.name_header_text}>First name</Text>
          </View>
          <View style={styles.name_input_wrapper}>
            <TextInput style={styles.name_input} />
          </View>
        </View>
        <View style={styles.name_wrapper}>
          <View style={styles.name_header_wrapper}>
            <Text style={styles.name_header_text}>Last name</Text>
          </View>
          <View style={styles.name_input_wrapper}>
            <TextInput style={styles.name_input} />
          </View>
        </View>
        <View style={styles.choose_birthday_wrapper}>
          <Text style={{ fontSize: 18, fontFamily: "SourceSansProRegular" }}>
            Choose Birthday
          </Text>
        </View>
      </View>
      <View style={styles.footer_wrapper}>
        <TouchableOpacity style={styles.footer_button}>
          <Text style={styles.footer_button_text}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header_wrapper: {
    justifyContent: "center",
    alignItems: "left",
    marginTop: 40,
  },
  header_text: {
    fontFamily: "SourceSansProBold",
    fontSize: 40,
  },
  body_wrapper: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar_wrapper: {
    height: 120,
    width: 120,
    position: "relative",
  },
  avatar: { height: 120, width: 120 },
  choose_avatar_button: {
    position: "absolute",
    backgroundColor: RED_COLOR,
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: "50%",
    bottom: 0,
    right: 0,
  },
  name_wrapper: { width: "100%", marginTop: 16 },
  name_header_wrapper: { marginBottom: 8 },
  name_header_text: { fontFamily: "SourceSansProSemiBold", fontSize: 18 },
  name_input_wrapper: {},
  name_input: {
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
    paddingVertical: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "SourceSansProRegular",
  },
  choose_birthday_wrapper: {
    width: "100%",
    marginTop: 32,
    backgroundColor: LIGHT_RED_COLOR,
    paddingVertical: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  footer_wrapper: {
    marginTop: 100,
  },
  footer_button: {
    backgroundColor: RED_COLOR,
    paddingVertical: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  footer_button_text: {
    fontSize: 18,
    fontFamily: "SourceSansProSemiBold",
    color: "#fff",
  },
});

export default SetUpProfile1;
