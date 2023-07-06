import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
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
import { TextInput } from "react-native-gesture-handler";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  addUserToFirestore,
  fetchAllUserData,
  updateUserChatsToFirestore,
} from "../firebase/user";
import { useFocusEffect } from "@react-navigation/native";
import { userAddChats } from "../redux/actions/userActions";

const MessagesScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.user);
  const allUser = useSelector((state) => state.allUser.allUser);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const searchUser = (val) => {
    // setSearch(val);
    // const filteredList = users.filter((item) =>
    //   item.name.toLowerCase().includes(text.toLowerCase())
    // );
    // setallUser(filteredList);
  };

  const handleChatRoom = async (user) => {
    const id1 = currentUser.id + user.id;
    const id2 = user.id + currentUser.id;
    if (
      currentUser.chats.indexOf(id1) === -1 &&
      currentUser.chats.indexOf(id2) === -1
    ) {
      const newUser = user;
      const newUser2 = currentUser;
      newUser.chats.push(id1);
      newUser2.chats.push(id1);
      dispatch(userAddChats(id1));
      await updateUserChatsToFirestore(newUser);
      await updateUserChatsToFirestore(newUser2);
      navigation.navigate("ChatRoomScreen", { user: user, chatID: id1 });
    } else {
      if (currentUser.chats.indexOf(id1) !== -1)
        navigation.navigate("ChatRoomScreen", { user: user, chatID: id1 });
      else if (currentUser.chats.indexOf(id2) !== -1)
        navigation.navigate("ChatRoomScreen", { user: user, chatID: id2 });
    }
  };

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
        >
          <Image
            source={{
              uri: currentUser.avatar,
            }}
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
          height: 48,
          marginHorizontal: 48,
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          backgroundColor: "#f0f0f0",
        }}
      >
        <FontAwesome5
          style={{ fontSize: 20 }}
          name="search"
          type="ionicons"
          color="#5352ed"
        />
        <TextInput
          placeholder="Search by name..."
          onChangeText={(val) => searchUser(val)}
          autoCapitalize="none"
          value={search}
          style={[styles.input]}
          marginLeft={16}
        />
      </View>

      {/* list  */}
      <View style={{ paddingLeft: 22, marginTop: 16 }}>
        <Text style={{ fontFamily: "SourceSansProBold", fontSize: 24 }}>
          Message
        </Text>
      </View>

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
            data={allUser}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleChatRoom(item);
                }}
              >
                <MessageCardItem users={item} />
              </TouchableOpacity>
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
    height: 40,
    flex: 1,
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#333",
  },
});

export default MessagesScreen;
