import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import {
  CameraIcon,
  RedRightArrowIcon,
  WhiteCheckIcon,
} from "../constants/icons";
import {
  LIGHT_GRAY_COLOR,
  LIGHT_RED_COLOR,
  RED_COLOR,
} from "../constants/color";

const SetUpProfile2 = () => {
  const inset = useSafeAreaInsets();
  const gender = ["Woman", "Man", "Other", "I don't want to mention it"];
  const [selectedGenderID, setSelectedGenderID] = useState("0");
  useEffect(() => {
    setSelectedGenderID("0");
  }, []);
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
      <TouchableOpacity style={styles.back_button_wrapper}>
        <SvgXml xml={RedRightArrowIcon} height={24} width={24} />
      </TouchableOpacity>
      <View style={styles.header_wrapper}>
        <Text style={styles.header_text}>I am a</Text>
      </View>
      <View style={styles.body_wrapper}>
        <FlatList
          data={gender}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={
                selectedGenderID === index.toString()
                  ? styles.gender_wrapper_selected
                  : styles.gender_wrapper
              }
              onPress={() => setSelectedGenderID(index.toString())}
            >
              <Text
                style={
                  selectedGenderID === index.toString()
                    ? styles.gender_text_selected
                    : styles.gender_text
                }
              >
                {item}
              </Text>
              <SvgXml xml={WhiteCheckIcon} />
            </TouchableOpacity>
          )}
          style={{ width: "100%" }}
        />
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
  back_button_wrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
  },
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
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  gender_wrapper: {
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
    width: "100%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gender_wrapper_selected: {
    borderWidth: 1,
    borderColor: RED_COLOR,
    backgroundColor: RED_COLOR,
    width: "100%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gender_text: {
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
  },
  gender_text_selected: {
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#fff",
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

export default SetUpProfile2;
