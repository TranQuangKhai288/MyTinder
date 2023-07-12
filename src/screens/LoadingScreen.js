import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { RED_COLOR } from "../constants/color";
import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";

const LoadingScreen = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={RED_COLOR} />
        <StatusBar style="dark" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#88888890",
  },
});

export default LoadingScreen;
