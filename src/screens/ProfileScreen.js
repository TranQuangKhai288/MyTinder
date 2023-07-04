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
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 300, height: 300 }}
      />
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
