import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";

import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import MessageCardItem from "../components/MessageCardItem";
import { ScrollView } from "react-native-virtualized-view";
import {
  FIREBASE_AUTH,
  FIREBASE_REALTIME_DB,
  FIRESTORE_DB,
} from "../../firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  addUserToFirestore,
  fetchAllUserData,
  updateUserChatsToFirestore,
  logoutUser,
  updateOfflineStatus,
} from "../firebase/user";
import { useFocusEffect } from "@react-navigation/native";
import { userAddChats, userLogout } from "../redux/actions/userActions";
import { ref, get } from "firebase/database";
import { getRefLength } from "../firebase/chat";
import MessageItem from "../components/MessageItem";

const MessagesScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.user);
  const allUser = useSelector((state) => state.allUser.allUser);
  const [keySearch, setKeySearch] = useState("");
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const handleChatRoom = (user) => {
    let chatid = "";
    const id1 = currentUser.id + user.id;
    const id2 = user.id + currentUser.id;
    if (currentUser.id.localeCompare(user.id) === -1) chatid = id1;
    else chatid = id2;
    navigation.navigate("ChatRoomScreen", { user: user, chatID: chatid });
  };

  // useEffect(() => {
  //   const id1 = currentUser.id + user.id;
  //   const id2 = user.id + currentUser.id;
  //   const chatRef1 = ref(FIREBASE_REALTIME_DB, "chats/" + id1);
  //   const chatRef2 = ref(FIREBASE_REALTIME_DB, "chats/" + id2);
  //   let chatRef;
  //   if (getRefLength(chatRef1) > 0) chatRef = chatRef1;
  //   else if (getRefLength(chatRef2 > 0)) chatRef = chatRef2;
  //   else chatRef = false;
  // }, []);

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        styles.container,
      ]}
    >
      {/* header */}
      <View
        style={{
          alignItems: "center",
          position: "relative",
          padding: 2,
          height: 64,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "flex-start", marginLeft: 24 }}
        >
          <Text
            style={{ fontSize: 42, fontFamily: "Billabong", color: "black" }}
          >
            Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: "flex-end", marginRight: 24 }}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image
            source={
              currentUser.avatar
                ? {
                    uri: currentUser.avatar,
                  }
                : require("../assets/images/avatar-default.png")
            }
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 8,
            }}
          />
        </TouchableOpacity>
      </View>
      {/* end of header */}

      {/* search  */}
      <View
        style={{
          borderWidth: 1,
          borderRadius: 16,
          borderColor: "#e8e6ea",
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          backgroundColor: "#f0f0f0",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <FontAwesome5
          style={{ fontSize: 20 }}
          name="search"
          type="ionicons"
          color="#E94057"
        />
        <TextInput
          placeholder="Search by name..."
          onChangeText={(val) => {
            setKeySearch(val);
          }}
          style={styles.input}
        />
      </View>

      {/* list  */}
      <ScrollView
        style={{ marginBottom: 70, marginTop: 12 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingBottom: 36 }}>
          <FlatList
            style={{
              backgroundColor: "transparent",
            }}
            numColumns={1}
            data={allUser
              .filter(
                (user) =>
                  !!currentUser.matches.find((match) => match === user.id)
              )
              .filter((user) => {
                let userName = user.firstName + " " + user.lastName;
                return (
                  userName.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1
                );
              })
              .sort((a, b) =>
                a.firstName
                  .toLowerCase()
                  .localeCompare(b.firstName.toLowerCase())
              )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View key={item.id}>
                <MessageItem
                  item={item}
                  handleChatRoom={() => {
                    handleChatRoom(item);
                  }}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginLeft: 8,
  },
});

export default MessagesScreen;
