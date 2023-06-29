import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { WhiteGBIcon } from "../constants/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
  },
});

export default ProfileScreen;
