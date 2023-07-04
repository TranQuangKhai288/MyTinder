import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import { signOut } from "firebase/auth";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase/app";
import {
  FIREBASE_APP,
  FIRESTORE_DB,
  FIREBASE_AUTH,
} from "../../firebaseConfig";
import GiftedChat from "react-native-gifted-chat";
const DATA = [];

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  // const onSignOut = () => {
  //   signOut(auth).catch((error) => console.log("Error logging out: ", error));
  // };

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={{
  //           marginRight: 10,
  //         }}
  //         onPress={onSignOut}
  //       >
  //         <Text>Sign Out</Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);

  // useLayoutEffect(() => {
  //   const collectionRef = collection(database, "chats");
  //   const q = query(collectionRef, orderBy("createdAt", "desc"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const messagesFirestore = querySnapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       const returnData = {
  //         ...data,
  //         createdAt: data.createdAt.toDate(),
  //       };
  //       return returnData;
  //     });
  //     setMessages(messagesFirestore);
  //   });
  //   return unsubscribe;
  // }, []);

  // const sendMessage = async () => {
  //   const { uid, photoURL } = auth.currentUser;
  //   await addDoc(collection(database, "chats"), {
  //     text: formValue,
  //     createdAt: serverTimestamp(),
  //     uid,
  //     photoURL,
  //   });
  //   setFormValue("");
  //   dummy.current.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: "https://i.pravatar.cc/300",
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default ChatRoomScreen;
