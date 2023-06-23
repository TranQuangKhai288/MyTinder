import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import { SCREEN_HEIGHT } from "../constants/constants";

const PopUpNotification = ({ message }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [show]);
  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal_wrapper}>
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#00000000",
    height: SCREEN_HEIGHT,
  },
  modal_wrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    width: 320,
    backgroundColor: "#e5e5e5",
    borderRadius: 12,
    marginBottom: 64,
  },
  text: { fontSize: 14, textAlign: "center", color: "#444444" },
});

export default PopUpNotification;
