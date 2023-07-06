import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native-elements";

const Message = () => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/MKgBgrfxG2NMZvwYfEn5WwYl0uZ_N3OURVm1ZO3bsa_-3MvhEINqXOld4L_wiv4YXw",
        }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      <View
        style={{
          marginRight: 8,
          backgroundColor: "#EC7686",
          borderRadius: 20,
          padding: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "LatoRegular",
          }}
        >
          My Message
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Message;
