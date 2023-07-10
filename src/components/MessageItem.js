import React, { useEffect, useState } from "react";
import MessageCardItem from "./MessageCardItem";
import { FIREBASE_REALTIME_DB } from "../../firebaseConfig";
import { getRefLength } from "../firebase/chat";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { ref, get, onValue, off, update } from "firebase/database";

const MessageItem = ({ item, handleChatRoom }) => {
  const currentUser = useSelector((state) => state.user.user);
  const [theLastMessage, setTheLastMessage] = useState({});
  const [status, setStatus] = useState({});
  console.log("TheLastMessage:", theLastMessage);
  const handleNewMessage = (snapshot) => {
    // const statusRef = ref(
    //   FIREBASE_REALTIME_DB,
    //   "status/" + item.id + "/" + currentUser.id
    // );
    const message = snapshot.val();
    if (message) {
      const lastMessage =
        Object.values(message)[Object.values(message).length - 1];
      if (
        Object.entries(lastMessage).toString() !==
        Object.entries(theLastMessage).toString()
      ) {
        setTheLastMessage(lastMessage);
        // update(statusRef, {
        //   isReadAll: false,
        // });
      }
    }
  };

  const handleNewStatus = (snapshot) => {
    const statusData = snapshot.val();
    if (statusData) {
      setStatus(statusData);
      console.log("Status data:", statusData);
    }
  };

  useEffect(() => {
    const id1 = currentUser.id + item.id;
    const id2 = item.id + currentUser.id;
    let chatRef;
    if (currentUser.id.localeCompare(item.id) === -1)
      chatRef = ref(FIREBASE_REALTIME_DB, "chats/" + id1);
    else chatRef = ref(FIREBASE_REALTIME_DB, "chats/" + id2);
    const subcrition = onValue(chatRef, handleNewMessage);
    return () => {
      subcrition();
    };
  }, []);

  useEffect(() => {
    const statusRef = ref(FIREBASE_REALTIME_DB, "status/" + item.id);
    const subcrition = onValue(statusRef, handleNewStatus);
    return () => {
      subcrition();
    };
  }, []);
  return (
    <TouchableOpacity onPress={handleChatRoom}>
      <MessageCardItem
        user={item}
        lastMessage={theLastMessage}
        status={status}
      />
    </TouchableOpacity>
  );
};

export default MessageItem;
