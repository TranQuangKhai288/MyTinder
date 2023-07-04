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
          backgroundColor: "white",
          padding: 10,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Message
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Message;
