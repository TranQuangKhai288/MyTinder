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
import { Entypo } from "@expo/vector-icons";

const CardItem = ({ info }) => {
  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <View style={styles.card}>
        <ImageBackground
          source={{
            uri: info.image,
          }}
          style={{
            width: Dimensions.get("window").width / 2.5,
            height: Dimensions.get("window").height / 3.8,
          }}
        >
          <View style={styles.content}>
            <View style={styles.text_wrapper}>
              <View style={styles.text_infor_wrapper}>
                <Text style={styles.textName}>{info.lastname},</Text>
                <Text style={styles.textAge}>{info.age}</Text>
              </View>
            </View>

            <BlurView style={styles.blur} tint="dark" intensity={70}>
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
                  }}
                >
                  <Entypo name="cross" size={30} color={"#ffffff"} />
                </TouchableOpacity>

                <View
                  style={{
                    borderWidth: 1,
                    height: Dimensions.get("window").height / 18,
                    borderColor: "#ffffff",
                  }}
                />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Entypo name="heart" size={30} color={"#ffffff"} />
                </TouchableOpacity>
              </View>
            </BlurView>
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
  },
  blur: {
    width: Dimensions.get("window").width / 2.5,
    height: Dimensions.get("window").height / 18,
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
    fontSize: 24,
    fontFamily: "SourceSansProRegular",
  },
  textAge: {
    color: "#fff",
    fontSize: 23,
    marginLeft: 8,
    fontFamily: "SourceSansProRegular",
  },
});

export default CardItem;
