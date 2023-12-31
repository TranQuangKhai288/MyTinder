import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native-elements";

const Message = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/0b/22/97/0b2297a3c2d1006d93592c295cd4791b.jpg",
        }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />

      <View
        style={{
          marginLeft: 8,
          backgroundColor: "#EEEEEE",
          padding: 12,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "LatoRegular",
          }}
        >
          Message
        </Text>
      </View>
    </View>
  );
};

export default Message;
