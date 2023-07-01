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
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 20,
    status: "online",
  },
];
const MessagesScreen = ({ navigation }) => {
  const { userData } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const [allUser, setallUser] = useState([]);

  const insets = useSafeAreaInsets();
  const handleChatRoom = () => {
    // Perform login logic here
    // navigation.navigate("ChatRoomScreen");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let users = await fetchAllUserData();
      console.log("fetching users:", users);
    };

    fetchUserData();
  }, []);

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
          onPress={async () => {
            await addUserToFirestore({
              lastName: "Test",
              firstName: "Test",
              avatar: "Test",
              email: "Test",
              id: "Test",
              isVerified: true,
            });
          }}
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
          placeholder="Search"
          autoCapitalize="none"
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
            data={DATA}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={handleChatRoom}>
                <MessageCardItem info={item} />
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
