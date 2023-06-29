import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { RED_COLOR } from "../constants/color";
import { StatusBar } from "expo-status-bar";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={RED_COLOR} />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
