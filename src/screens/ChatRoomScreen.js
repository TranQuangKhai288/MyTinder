import React, { useState, useEffect, useCallback, useRef } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Platform,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { RED_COLOR } from "../constants/color";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ref, push, set, onValue, update } from "firebase/database";
import { FIREBASE_REALTIME_DB } from "../../firebaseConfig";
import { SCREEN_WIDTH } from "../constants/constants";

const ChatRoomScreen = ({ navigation, route }) => {
  const user = route.params.user;
  const chatID = route.params.chatID;
  const insets = useSafeAreaInsets();
  const [chats, setChats] = useState([]);
  const currentUser = useSelector((state) => state.user.user);
  const [chatting, setChatting] = useState(false);
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef();
  const [userStatus, setUserStatus] = useState("");
  const sendMessage = async (message, user) => {
    if (message !== "") {
      const messageRef = ref(FIREBASE_REALTIME_DB, "chats/" + chatID);
      const newChildMessageRef = push(messageRef);
      set(newChildMessageRef, {
        key: newChildMessageRef.key,
        message: message,
        sender: user.id,
        time: new Date().toString(),
      });
      scrollViewRef.current.scrollToEnd({ animated: true });
      setMessage("");
    }
  };

  // fetch chats
  useEffect(() => {
    const messageRef = ref(FIREBASE_REALTIME_DB, "chats/" + chatID);
    const handleNewMessage = (snapshot) => {
      const message = snapshot.val();
      if (message) {
        const messageArray = Object.values(message).map(
          ({ key, message, sender, time }) => ({ key, message, sender, time })
        );
        setChats(messageArray);
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }, 500);
      }
    };
    const subcrition = onValue(messageRef, handleNewMessage);

    return () => {
      subcrition();
    };
  }, []);

  // fetch user status
  useEffect(() => {
    const statusRef = ref(FIREBASE_REALTIME_DB, "status/" + user.id);
    const handleNewStatus = (snapshot) => {
      const statusData = snapshot.val();
      if (statusData) {
        setUserStatus(statusData.status);
      }
    };
    const subcrition = onValue(statusRef, handleNewStatus);

    return () => {
      subcrition();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const statusRef = ref(
        FIREBASE_REALTIME_DB,
        "status/" + currentUser.id + "/" + user.id
      );
      update(statusRef, {
        isReding: true,
        isReadAll: true,
      });

      return () => {
        const statusRef = ref(
          FIREBASE_REALTIME_DB,
          "status/" + currentUser.id + "/" + user.id
        );
        update(statusRef, {
          isReding: false,
          isReadAll: true,
        });
      };
    }, [])
  );

  // useEffect(() => {
  //   scrollViewRef.current.scrollToEnd({ animated: true });
  // });

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        styles.container,
      ]}
    >
      <View style={{ flex: 1 }}>
        {/* header */}
        <View
          style={{
            backgroundColor: "#FFF",
            padding: 12,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: Dimensions.get("window").width,
              paddingHorizontal: 4,
            }}
          >
            <Icon
              name="arrow-back"
              type="ionicon"
              color={RED_COLOR}
              size={24}
              onPress={() => navigation.goBack()}
            />

            <View style={{ position: "relative" }}>
              <Image
                source={
                  user.avatar
                    ? {
                        uri: user.avatar,
                      }
                    : require("../assets/images/avatar-default.png")
                }
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  marginLeft: 12,
                }}
              />
              <View
                style={[
                  {
                    height: 14,
                    width: 14,

                    borderRadius: 7,
                    marginRight: 2,
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    borderWidth: 2,
                    borderColor: "#FFF",
                  },
                  userStatus === "online"
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "grey" },
                ]}
              ></View>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginLeft: 12,
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 18,
                  fontFamily: "LatoBold",
                }}
              >
                {user.firstName} {user.lastName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "LatoRegular",
                      fontSize: 14,
                      color: "#777777",
                    }}
                  >
                    {userStatus === "online" ? "Online" : "Offline"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* body */}
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
          <ScrollView
            ref={scrollViewRef}
            style={{}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {/* <Messages /> */}
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Image
                source={
                  user.avatar
                    ? {
                        uri: user.avatar,
                      }
                    : require("../assets/images/avatar-default.png")
                }
                style={{ width: 160, height: 160, borderRadius: 80 }}
              />
              <Text
                style={{
                  fontFamily: "LatoBlack",
                  fontSize: 28,
                  color: "#000",
                  marginTop: 12,
                }}
              >
                {user.firstName} {user.lastName}
              </Text>
              <Text
                style={{
                  fontFamily: "LatoRegular",
                  fontSize: 14,
                  marginTop: 4,
                  color: "#000",
                }}
              >
                My Tinder
              </Text>
              <Text
                style={{
                  fontFamily: "LatoRegular",
                  fontSize: 14,
                  marginTop: 4,
                  color: "#777777",
                }}
              >
                You two are friends on My Tinder
              </Text>
              <Text
                style={{
                  fontFamily: "LatoRegular",
                  fontSize: 14,
                  marginTop: 4,
                  color: "#777777",
                }}
              >
                Let say hi to your friend
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                padding: 4,
              }}
            >
              {chats.map((item, index) => {
                const check = item.sender === currentUser.id;
                const checkChangeSender =
                  index + 1 === chats.length ||
                  item.sender !== chats[index + 1].sender;
                let avatar = check ? currentUser.avatar : user.avatar;
                return check ? (
                  <View key={index}>
                    <View
                      style={[
                        styles.message_item_wrapper,
                        { alignSelf: "flex-end" },
                        checkChangeSender
                          ? { marginBottom: 8 }
                          : { marginBottom: 4 },
                      ]}
                    >
                      <View
                        style={[
                          styles.message_item_content_wrapper,
                          { backgroundColor: RED_COLOR },
                          checkChangeSender
                            ? { marginRight: 0 }
                            : { marginRight: 36 },
                        ]}
                      >
                        <Text
                          style={[
                            styles.message_item_content_text,
                            { color: "#FFF" },
                          ]}
                        >
                          {item.message}
                        </Text>
                      </View>
                      {checkChangeSender ? (
                        <Image
                          source={{ uri: avatar }}
                          style={[
                            styles.message_item_avatar,
                            { marginLeft: 4 },
                          ]}
                        />
                      ) : null}
                    </View>
                  </View>
                ) : (
                  <View key={index}>
                    <View
                      style={[
                        styles.message_item_wrapper,
                        { alignSelf: "flex-start" },
                        checkChangeSender
                          ? { marginBottom: 8 }
                          : { marginBottom: 4 },
                      ]}
                    >
                      {checkChangeSender ? (
                        <Image
                          source={{ uri: avatar }}
                          style={[
                            styles.message_item_avatar,
                            { marginRight: 4 },
                          ]}
                        />
                      ) : null}
                      <View
                        style={[
                          styles.message_item_content_wrapper,
                          { backgroundColor: "#EEEEEE" },
                          checkChangeSender
                            ? { marginLeft: 0 }
                            : { marginLeft: 36 },
                        ]}
                      >
                        <Text
                          style={[
                            styles.message_item_content_text,
                            { color: "#000" },
                          ]}
                        >
                          {item.message}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <View
            style={[
              {
                backgroundColor: "#ffffff",
                paddingHorizontal: 20,
                paddingVertical: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
              chatting && Platform.OS === "ios" ? { paddingBottom: 320 } : {},
            ]}
          >
            <View>
              <TextInput
                placeholder="Aa"
                style={[styles.input]}
                multiline={true}
                onFocus={() => {
                  setChatting(true);
                }}
                onBlur={() => {
                  setChatting(false);
                }}
                onChangeText={(text) => {
                  setMessage(text);
                }}
                value={message}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                sendMessage(message, currentUser);
              }}
            >
              <Icon name="send" type="Ionicons" size={30} color={RED_COLOR} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: SCREEN_WIDTH - 92,
    borderRadius: 20,
    fontSize: 16,
  },
  message_item_wrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  message_item_avatar: {
    width: 32,
    height: 32,
    borderRadius: 18,
  },
  message_item_content_wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: SCREEN_WIDTH * 0.72,
  },
  message_item_content_text: {
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
  },
});

export default ChatRoomScreen;
