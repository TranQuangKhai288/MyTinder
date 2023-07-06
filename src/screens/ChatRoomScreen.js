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
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Icon, Avatar } from "react-native-elements";
import color, { LIGHT_RED_COLOR, RED_COLOR } from "../constants/color";
import { useSelector } from "react-redux";
import {
  FIREBASE_APP,
  FIRESTORE_DB,
  FIREBASE_AUTH,
} from "../../firebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native-elements";
import { doc, onSnapshot } from "firebase/firestore";
import Messages from "../components/Messages";

const DATA = [];

const ChatRoomScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [chats, setChats] = useState([]);
  const currentUser = useSelector((state) => state.user.user);
  const [chatting, setChatting] = useState(false);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(FIRESTORE_DB, "userChats", currentUser.id),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };

    currentUser.id && getChats();
  }, [currentUser.id]);
  console.log(chats);

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
            backgroundColor: RED_COLOR,
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
              color="white"
              size={24}
              onPress={() => navigation.goBack()}
            />

            <Image
              source={{
                uri: "https://i.pinimg.com/736x/0b/22/97/0b2297a3c2d1006d93592c295cd4791b.jpg",
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginLeft: 12,
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginLeft: 12,
                fontFamily: "LatoBold",
              }}
            >
              Tran Quang Khai
            </Text>
          </View>
        </View>
        {/* body */}
        <View style={{ flex: 1, backgroundColor: LIGHT_RED_COLOR }}>
          <ScrollView
            style={{
              height: Dimensions.get("window").height,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Messages />
          </ScrollView>

          <View
            style={[
              {
                backgroundColor: RED_COLOR,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
              chatting ? { paddingBottom: 320 } : {},
            ]}
          >
            <View>
              <TextInput
                placeholder="Say something..."
                autoCapitalize="none"
                style={[styles.input]}
                fontSize={16}
                onFocus={() => {
                  setChatting(true);
                }}
                onBlur={() => {
                  setChatting(false);
                }}
              />
            </View>
            <TouchableOpacity>
              <Icon
                style={{
                  marginHorizontal: 15,
                }}
                name="send"
                type="Ionicons"
                size={32}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RED_COLOR,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    width: Dimensions.get("window").width - 80,
    borderRadius: 20,
    fontSize: 18,
  },
});

export default ChatRoomScreen;
