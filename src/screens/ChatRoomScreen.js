import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Icon, Avatar } from "react-native-elements";

import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import {
  FIREBASE_APP,
  FIRESTORE_DB,
  FIREBASE_AUTH,
} from "../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const DATA = [];

const ChatRoomScreen = () => {
  const [chat, setChat] = useState([]);
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(FIRESTORE_DB, "userChats", currentUser.id),
      (doc) => {
        setChat(doc.data());
      }
    );
    return () => {
      unsub();
    };
  }, [currentUser.id]);

  return (
    <View style={styles.container}>
      {/* header */}
      <View
        style={{
          height: 90,
          backgroundColor: "red",
          elevation: 5,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            marginTop: 24,
            marginLeft: 10,
            flexDirection: "row",
            alignItems: "center",
            width: Dimensions.get("window").width,
          }}
        >
          <Avatar
            source={{
              uri: "https://i.pinimg.com/736x/0b/22/97/0b2297a3c2d1006d93592c295cd4791b.jpg",
            }}
            rounded
            size="small"
          />
          <Text style={{ color: "white", fontSize: 18, marginLeft: 8 }}>
            Tran Quang Khai
          </Text>
        </View>
      </View>

      {/* body */}
      <ImageBackground
        source={require("../assets/images/backgr.jpg")}
        style={{ flex: 1 }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={DATA}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({ item }) => {
            return (
              <MsgComponent sender={item.from == userData.id} item={item} />
            );
          }}
        />

        <View
          style={{
            backgroundColor: "green",
            padding: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderRadius: 16,
              height: 48,
              backgroundColor: "white",
              width: Dimensions.get("window").width - 70,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <TextInput
              placeholder="Search by name..."
              autoCapitalize="none"
              style={[styles.input]}
              fontSize={16}
            />
          </View>
          <TouchableOpacity>
            <Icon
              style={{
                marginHorizontal: 15,
              }}
              name="send"
              type="Ionicons"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatRoomScreen;
