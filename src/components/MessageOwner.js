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
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
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
