import React, { useEffect, useState } from "react";

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
import { ref, onValue } from "firebase/database";
import { FIREBASE_REALTIME_DB } from "../../firebaseConfig";
import { useSelector } from "react-redux";
import { SCREEN_WIDTH } from "../constants/constants";
import { LIGHT_GRAY_COLOR } from "../constants/color";

const MessageCardItem = ({ user, lastMessage, status }) => {
  const currentUser = useSelector((state) => state.user.user);
  const isEqualDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <View style={styles.containerCardItem}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ position: "relative" }}>
            <Image
              source={{
                uri: user.avatar,
              }}
              style={{
                height: 52,
                width: 52,
                borderRadius: 30,
              }}
            />
            <View
              style={[
                {
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: "white",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                },
                status.status === "online"
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "gray" },
              ]}
            ></View>
          </View>
          <View style={{ marginLeft: 10, flexDirection: "column" }}>
            <Text style={{ fontSize: 18, fontFamily: "LatoRegular" }}>
              {user.firstName} {user.lastName}
            </Text>
            {lastMessage.key ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  maxwidth: SCREEN_WIDTH * 0.72,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    maxWidth: SCREEN_WIDTH * 0.48,
                    fontFamily: "LatoRegular",
                    color: "#888888",
                  }}
                  numberOfLines={1}
                >
                  {user.id === lastMessage.sender ? user.firstName : "You"}:{" "}
                  {lastMessage.message}
                </Text>
                <View
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: 1.5,
                    backgroundColor: "#888888",
                    marginLeft: 4,
                    marginRight: 1,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "LatoRegular",
                    color: "#888888",
                  }}
                >
                  {isEqualDate(new Date(), new Date(lastMessage.time))
                    ? "Today"
                    : new Date(lastMessage.time).toLocaleDateString("en-NL", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        {/* {status[currentUser.id] ? (
          status[currentUser.id].isReadAll ? null : (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#00B4D8",
              }}
            ></View>
          )
        ) : null} */}
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
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default MessageCardItem;
