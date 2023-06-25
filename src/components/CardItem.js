import React from "react";

import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";

import Icon from "./Icon";

const CardItem = ({
  actions,
  description,
  image,
  matches,
  name,
  onPressLeft,
  onPressRight,
  status,
  variant,
}) => {
  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <View style={styles.card}>
        <ImageBackground
          source={{
            uri: "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
          }}
          style={{
            width: Dimensions.get("window").width / 2.5,
            height: Dimensions.get("window").height / 3.8,
          }}
        >
          <View style={styles.content}>
            <View style={styles.text_wrapper}>
              <View style={styles.text_infor_wrapper}>
                <Text style={styles.textName}>Khai Tran</Text>
                <Text style={styles.textAge}>20</Text>
              </View>
            </View>

            <BlurView style={styles.blur}></BlurView>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    margin: 32,
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
  },
  blur: {
    width: Dimensions.get("window").width / 2.5,
    height: Dimensions.get("window").height / 18,
    position: "absolute",
    bottom: 0,
  },
  text_wrapper: {
    alignItems: "flex-start",
    padding: 2,
    marginLeft: 10,
    marginBottom: 24,
    bottom: 0,
  },

  text_infor_wrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textName: { color: "#fff", fontSize: 28 },
  textAge: { color: "#fff", fontSize: 24, marginLeft: 8 },
});

export default CardItem;
