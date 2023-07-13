import React from "react";
import { SvgXml } from "react-native-svg";
import { LogoIcon } from "../constants/icons";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ marginTop: -64 }}>
        <SvgXml xml={LogoIcon} width={142} height={142} />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default SplashScreen;
