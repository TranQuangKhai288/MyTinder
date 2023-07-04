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
        <Image
          source={{
            uri: users.avatar,
          }}
          style={{ height: 60, width: 60, borderRadius: 30, marginLeft: 10 }}
        />
        <View style={{ marginLeft: 10, flexDirection: "column" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {users.firstName}
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
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MessageCardItem;
