import React from "react";

import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

import { BlurView } from "expo-blur";
import { SvgXml } from "react-native-svg";
import { CloseIcon, MessageIcon } from "../constants/icons";
import { RED_COLOR } from "../constants/color";

const CardItem = ({ info, remove, chat }) => {
  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <View style={styles.card}>
        <ImageBackground
          source={
            info.avatar
              ? {
                  uri: info.avatar,
                }
              : require("../assets/images/avatar-default.png")
          }
          style={{
            width: Dimensions.get("window").width / 2.5,
            height: Dimensions.get("window").height / 3.8,
          }}
        >
          <View style={styles.content}>
            <BlurView style={styles.blur} tint="dark" intensity={70}>
              <View style={styles.text_wrapper}>
                <View style={styles.text_infor_wrapper}>
                  <Text style={styles.textName}>{info.firstName},</Text>
                  <Text style={styles.textAge}>
                    {info.birthday
                      ? new Date().getFullYear() -
                        new Date(info.birthday).getFullYear()
                      : 20}
                  </Text>
                </View>
              </View>
            </BlurView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#EEEEEE",
                  height: 36,
                }}
                onPress={() => {
                  remove();
                }}
              >
                <SvgXml xml={CloseIcon} width={24} height={28} />
              </TouchableOpacity>

              <View
                style={{
                  borderWidth: 2,
                  height: 36,
                  borderColor: "#ffffff",
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 36,
                  backgroundColor: RED_COLOR,
                }}
                onPress={() => {
                  chat();
                }}
              >
                <SvgXml xml={MessageIcon} width={24} height={28} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    marginLeft: 28,
    marginTop: 32,
    borderRadius: 16,
    overflow: "hidden",
    width: Dimensions.get("window").width / 2.5,
    height: Dimensions.get("window").height / 3.8,
  },

  card: {
    borderRadius: 16,
    width: Dimensions.get("window").width / 2.5,
    height: Dimensions.get("window").height / 3.8,
  },
  content: {
    position: "absolute",
    backgroundColor: "transparent",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    bottom: 0,
    width: "100%",
  },
  blur: {
    width: "100%",
    blurType: "xlight",
  },
  text_wrapper: {
    alignItems: "flex-start",
    padding: 2,
    marginLeft: 8,
  },

  text_infor_wrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textName: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "SourceSansProRegular",
  },
  textAge: {
    color: "#fff",
    fontSize: 21,
    marginLeft: 8,
    fontFamily: "SourceSansProRegular",
  },
});

export default CardItem;
