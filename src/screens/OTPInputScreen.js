import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { RedRightArrowIcon } from "../constants/icons";
import { LIGHT_GRAY_COLOR, RED_COLOR } from "../constants/color";

const OTPInputScreen = () => {
  const inset = useSafeAreaInsets();
  const [OTPCodes, setOTPCodes] = useState("");
  const [countDown, setCountDown] = useState(0);
  useEffect(() => {
    setOTPCodes("");
    if (countDown === 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown]);
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
        <Text style={styles.header_text}>Verification code</Text>
        <Text style={styles.header_decription_text}>
          Type the verification code we've sent you.
        </Text>
      </View>
      <View style={styles.body_wrapper}>
        <View style={styles.input_wrapper}>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(text) => {
              setOTPCodes(text);
            }}
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.send_again_button}
            onPress={() => {
              setCountDown(20);
            }}
            disabled={countDown > 0}
          >
            <Text
              style={[
                styles.send_again_button_text,
                countDown > 0
                  ? { color: LIGHT_GRAY_COLOR }
                  : { color: RED_COLOR },
              ]}
            >
              {countDown > 0 ? `(${countDown})` : null} Send again
            </Text>
          </TouchableOpacity>
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
    fontSize: 32,
  },
  header_decription_text: {
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
  },
  body_wrapper: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input_wrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "60%",
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 20,
    fontFamily: "SourceSansProRegular",
  },
  send_again_button: { marginRight: 20 },
  send_again_button_text: {
    fontFamily: "SourceSansProSemiBold",
    fontSize: 16,
  },
  footer_wrapper: {
    marginTop: 40,
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

export default OTPInputScreen;
