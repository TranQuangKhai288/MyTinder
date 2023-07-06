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

const MessageCardItem = ({ users }) => {
  return (
    <View style={styles.containerCardItem}>
      <View style={styles.card}>
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: users.avatar,
            }}
            style={{ height: 52, width: 52, borderRadius: 30, marginLeft: 10 }}
          />
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "green",
              borderWidth: 2,
              borderColor: "white",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          ></View>
        </View>
        <View style={{ marginLeft: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 18, fontFamily: "LatoRegular" }}>
            {users.firstName} {users.lastName}
          </Text>
          <Text style={{ fontSize: 15 }} numberOfLines={1} ellipsizeMode="tail">
            messages
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            right: 10,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15 }}>Time</Text>
          <View
            style={{
              backgroundColor: "red",
              height: 24,
              width: 24,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>1</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    overflow: "hidden",
    width: Dimensions.get("window").width,
    height: 80,
  },

  card: {
    width: Dimensions.get("window").width,
    height: 80,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MessageCardItem;
