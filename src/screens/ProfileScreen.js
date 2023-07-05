import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import { useSelector } from "react-redux";
import { TextInput } from "react-native";
import { LIGHT_GRAY_COLOR, RED_COLOR } from "../constants/color";
import { FIREBASE_REALTIME_DB } from "../../firebaseConfig";
import { ref, set, push, onValue } from "@firebase/database";

const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const user = useSelector((state) => state.user.user);
  const [messageDetail, setMessageDetail] = useState("");
  const [chatRoom, setChatRoom] = useState([]);
  const sendMessage = (message, user) => {
    const messageRef = ref(FIREBASE_REALTIME_DB, "messages");
    const newChildRef = push(messageRef);
    set(newChildRef, {
      message: message,
      uid: user.id,
    });
  };
  useEffect(() => {
    const messageRef = ref(FIREBASE_REALTIME_DB);
    const handleNewMessage = (snapshot) => {
      const message = snapshot.val();
      if (message) {
        console.log("message", message);
        const messageArray = Object.values(message.messages).map(
          ({ message, uid }) => ({ message, uid })
        );
        setChatRoom(messageArray);
      }
    };

    const subcrition = onValue(messageRef, handleNewMessage);

    return () => {
      subcrition();
    };
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
        },
      ]}
    >
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: LIGHT_GRAY_COLOR,
          fontSize: 16,
          padding: 4,
        }}
        onChangeText={(text) => {
          setMessageDetail(text);
        }}
      />
      <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: RED_COLOR,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          sendMessage(messageDetail, user);
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Save</Text>
      </TouchableOpacity>
      {chatRoom.map((item, index) => (
        <Text key={index} style={{ fontSize: 16, marginTop: 4, color: "#000" }}>
          {item.message}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ProfileScreen;
