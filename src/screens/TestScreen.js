import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import PopUpNotification from "./PopUpNotification";
import PopUpNotificationDialog from "./PopUpNotificationDialog";

const TestScreen = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    console.log("show", show);
  }, [show]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 20 }}>Test Screen</Text>
      <TouchableOpacity
        style={{ padding: 8, backgroundColor: "orange" }}
        onPress={() => {
          setShow(true);
        }}
      >
        <Text style={{ fontSize: 20 }}>Noti</Text>
      </TouchableOpacity>
      <PopUpNotificationDialog
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}
        title={"Error"}
        message={"Please try again."}
      />
    </View>
  );
};

export default TestScreen;
