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
import { useSelector } from "react-redux";
import { addUserToFirestore, fetchAllUserData } from "../firebase/user";
import { useFocusEffect } from "@react-navigation/native";

const DATA = [
  {
    id: 1,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 20,
    status: "online",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/0b/22/97/0b2297a3c2d1006d93592c295cd4791b.jpg",
    firstname: "Tran Quang",
    lastname: "Tam",
    age: 20,
    status: "online",
  },
];
const MessagesScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.user);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const [allUser, setallUser] = useState([]);

  const insets = useSafeAreaInsets();

  const searchUser = (val) => {
    // setSearch(val);
    // const filteredList = users.filter((item) =>
    //   item.name.toLowerCase().includes(text.toLowerCase())
    // );
    // setallUser(filteredList);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let users = await fetchAllUserData();
      setallUser(users.filter((item) => item.id !== currentUser.id));
      console.log("all user", allUser);
    };

    fetchUserData();
  }, []);

  const handleChatRoom = async (user) => {
    //check wherther the group (chats in firestore) chat is exist or not
    const combinedId =
      currentUser.id > user.id
        ? currentUser.id + user.id
        : user.id + currentUser.id;

    try {
      const res = await getDoc(doc(FIRESTORE_DB, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(FIRESTORE_DB, "chats", combinedId), {
          messages: [],
        });

        //create user chats
        await updateDoc(doc(FIRESTORE_DB, "userChats", currentUser.id), {
          [combinedId + ".userInfo"]: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          },
        });

        await updateDoc(doc(FIRESTORE_DB, "userChats", user.id), {
          [combinedId + ".userInfo"]: {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            avatar: currentUser.avatar,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("ChatRoomScreen");
    //create user chats
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
              uri: "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
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

      <ScrollView style={{ marginBottom: 70, marginTop: 12 }}>
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
