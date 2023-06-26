import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import PopUpNotificationDialog from "./PopUpNotificationDialog";

const TestScreen = () => {
  const [show, setShow] = useState(false);
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  // const [image, setImage] = useState(null);
  // useEffect(() => {
  //   (async () => {
  //     const galleryStatus =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setHasGalleryPermission(galleryStatus.status === "granted");
  //   })();
  // }, []);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [3, 4],
  //     quality: 1,
  //   });

  //   console.log("result", result);
  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  useEffect(() => {
    console.log("show", show);
  }, [show]);

  // if (hasGalleryPermission === false) {
  //   return (
  //     <View>
  //       <Text>No access to gallery</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 20 }}>Test Screen</Text>
      <TouchableOpacity
        style={{ padding: 8, backgroundColor: "orange" }}
        onPress={() => {
          // pickImage();
          setShow(true);
        }}
      >
        <Text style={{ fontSize: 20 }}>Noti</Text>
      </TouchableOpacity>
      {/* {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: (200 * 4) / 3 }}
        />
      )} */}
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
