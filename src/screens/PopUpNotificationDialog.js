import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native";
import { SCREEN_HEIGHT } from "../constants/constants";
import { RED_COLOR } from "../constants/color";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const PopUpNotificationDialog = ({
  visible,
  title,
  message,
  onRequestClose,
}) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={[styles.container]}>
        <View style={styles.modal_wrapper}>
          <View style={styles.header_wrapper}>
            <Text style={styles.header_text}>{title}</Text>
          </View>
          <View style={styles.body_wrapper}>
            <Text style={styles.body_text}>{message}</Text>
          </View>
          <TouchableOpacity
            style={styles.footer_button}
            onPress={onRequestClose}
          >
            <Text style={styles.footer_button_text}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#88888890",
    height: SCREEN_HEIGHT,
  },
  modal_wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 64,
    width: 224,
    overflow: "hidden",
  },
  header_wrapper: { paddingVertical: 12, paddingHorizontal: 16 },
  header_text: {
    fontSize: 18,
    textAlign: "center",
    color: "#444444",
    fontFamily: "SourceSansProSemiBold",
  },
  body_wrapper: { marginBottom: 16 },
  body_text: { fontSize: 13, textAlign: "center", color: "#444444" },
  footer_button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#dddddd",
  },
  footer_button_text: {
    fontSize: 18,
    color: RED_COLOR,
    fontFamily: "SourceSansProSemiBold",
  },
});

export default PopUpNotificationDialog;
