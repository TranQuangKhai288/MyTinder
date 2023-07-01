import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userUpdateFirstName,
  userUpdateLastName,
} from "../redux/actions/userActions";

const SetUpProfile1 = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isSetFirstName, setIsSetFirstName] = useState(true);
  const [isSetLastName, setIsSetLastName] = useState(true);
  const [enableNextButton, setEnableNextButton] = useState(true);
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
            source={require("../assets/images/avatar-default.png")}
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
            <TextInput
              style={[
                styles.name_input,
                isSetFirstName
                  ? { borderColor: LIGHT_GRAY_COLOR }
                  : { borderColor: "red" },
              ]}
              onChangeText={(text) => {
                setFirstName(text);
              }}
              onFocus={() => {
                setIsSetFirstName(true);
              }}
            />
          </View>
          {isSetFirstName ? null : (
            <View style={styles.name_error_wrapper}>
              <Text style={styles.name_error_text}>
                * You must enter you first name
              </Text>
            </View>
          )}
        </View>
        <View style={styles.name_wrapper}>
          <View style={styles.name_header_wrapper}>
            <Text style={styles.name_header_text}>Last name</Text>
          </View>
          <View style={styles.name_input_wrapper}>
            <TextInput
              style={[
                styles.name_input,
                isSetLastName
                  ? { borderColor: LIGHT_GRAY_COLOR }
                  : { borderColor: "red" },
              ]}
              onChangeText={(text) => {
                setLastName(text);
              }}
              onFocus={() => {
                setIsSetLastName(true);
              }}
            />
          </View>
          {isSetLastName ? null : (
            <View style={styles.name_error_wrapper}>
              <Text style={styles.name_error_text}>
                * You must enter you last name
              </Text>
            </View>
          )}
        </View>
        <View style={styles.choose_birthday_wrapper}>
          <Text style={{ fontSize: 18, fontFamily: "SourceSansProRegular" }}>
            Choose Birthday
          </Text>
        </View>
      </View>
      <View style={styles.footer_wrapper}>
        <TouchableOpacity
          disabled={!enableNextButton}
          style={styles.footer_button}
          onPress={() => {
            if (firstName.length === 0) {
              setIsSetFirstName(false);
            }
            if (lastName.length === 0) {
              setIsSetLastName(false);
            }
            if (firstName !== "" && lastName !== "") {
              setEnableNextButton(false);
              dispatch(userUpdateFirstName(firstName));
              dispatch(userUpdateLastName(lastName));
              navigation.navigate("SetUpProfile2");
            }
          }}
        >
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
    fontFamily: "LatoBlack",
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
    borderWidth: 2,
    borderColor: LIGHT_GRAY_COLOR,
    borderRadius: 60,
  },
  avatar: { height: 116, width: 116 },
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
  name_header_text: { fontFamily: "LatoBold", fontSize: 18 },
  name_input_wrapper: {},
  name_input: {
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "LatoRegular",
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
    marginTop: 60,
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
    fontFamily: "LatoBold",
    color: "#fff",
  },
  name_error_wrapper: {},
  name_error_text: { fontFamily: "LatoItalic", color: "red", fontSize: 14 },
});

export default SetUpProfile1;
