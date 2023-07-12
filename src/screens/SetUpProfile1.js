import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { CameraIcon } from "../constants/icons";
import {
  LIGHT_GRAY_COLOR,
  LIGHT_RED_COLOR,
  RED_COLOR,
} from "../constants/color";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userUpdateAvatar,
  userUpdateFirstName,
  userUpdateLastName,
  userUpdateOccupation,
  userUpdateAboutMe,
  userUpdateBirthday,
} from "../redux/actions/userActions";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import PopUpNotificationDialog from "./PopUpNotificationDialog";
import { set } from "firebase/database";
import PopUpNotification from "./PopUpNotification";

const SetUpProfile1 = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  console.log("user", user);
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [isSetFirstName, setIsSetFirstName] = useState(true);
  const [isSetLastName, setIsSetLastName] = useState(true);
  const [enableNextButton, setEnableNextButton] = useState(true);
  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [isSetAvatar, setIsSetAvatar] = useState(true);

  const toggleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleShowPicker();
        setDateOfBirth(currentDate.toString());
      }
    } else {
      toggleShowPicker();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(userUpdateAvatar(result.assets[0].uri));
      setAvatar(result.assets[0].uri);
      setIsSetAvatar(true);
    }
  };

  const avatarButtononPressHandler = () => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
    if (hasGalleryPermission === false) {
      setIsShowPopUp(true);
    } else {
      pickImage();
    }
  };

  useFocusEffect(
    useCallback(() => {
      setEnableNextButton(true);
    }, [])
  );
  return (
    <View
      style={[
        {
          paddingTop: inset.top + 20,
          paddingBottom: inset.bottom + 20,
          paddingLeft: inset.left + 20,
          paddingRight: inset.right + 20,
        },
        styles.container,
      ]}
    >
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.header_wrapper}>
          <Text style={styles.header_text}>Your profile</Text>
        </View>
        <View style={styles.body_wrapper}>
          <View style={styles.avatar_wrapper}>
            <ImageBackground
              source={
                user.avatar
                  ? { uri: user.avatar }
                  : require("../assets/images/avatar-default.png")
              }
              style={styles.avatar}
              borderRadius={60}
            >
              <TouchableOpacity
                style={styles.choose_avatar_button}
                onPress={avatarButtononPressHandler}
              >
                <SvgXml xml={CameraIcon} height={24} width={24} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.name_wrapper}>
            <View style={styles.name_header_wrapper}>
              <Text style={styles.name_header_text}>First name</Text>
            </View>
            <View style={styles.name_input_wrapper}>
              <TextInput
                style={[
                  styles.name_input,
                  isSetFirstName
                    ? { borderColor: LIGHT_GRAY_COLOR }
                    : { borderColor: "red" },
                ]}
                onChangeText={(text) => {
                  setFirstName(text);
                }}
                onFocus={() => {
                  setIsSetFirstName(true);
                }}
              />
            </View>
            {isSetFirstName ? null : (
              <View style={styles.name_error_wrapper}>
                <Text style={styles.name_error_text}>
                  * You must enter you first name
                </Text>
              </View>
            )}
          </View>
          <View style={styles.name_wrapper}>
            <View style={styles.name_header_wrapper}>
              <Text style={styles.name_header_text}>Last name</Text>
            </View>
            <View style={styles.name_input_wrapper}>
              <TextInput
                style={[
                  styles.name_input,
                  isSetLastName
                    ? { borderColor: LIGHT_GRAY_COLOR }
                    : { borderColor: "red" },
                ]}
                onChangeText={(text) => {
                  setLastName(text);
                }}
                onFocus={() => {
                  setIsSetLastName(true);
                }}
              />
            </View>
            {isSetLastName ? null : (
              <View style={styles.name_error_wrapper}>
                <Text style={styles.name_error_text}>
                  * You must enter you last name
                </Text>
              </View>
            )}
          </View>
          <View style={styles.name_wrapper}>
            <View style={styles.name_header_wrapper}>
              <Text style={styles.name_header_text}>Job</Text>
            </View>
            <View style={styles.name_input_wrapper}>
              <TextInput
                style={[styles.name_input, { borderColor: LIGHT_GRAY_COLOR }]}
                onChangeText={(text) => {
                  setOccupation(text);
                }}
              />
            </View>
          </View>
          <View style={styles.name_wrapper}>
            <View style={styles.name_header_wrapper}>
              <Text style={styles.name_header_text}>About me</Text>
            </View>
            <View style={styles.name_input_wrapper}>
              <TextInput
                style={[
                  {
                    borderColor: LIGHT_GRAY_COLOR,
                    borderWidth: 1,
                    paddingVertical: 8,
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    fontSize: 16,
                    fontFamily: "LatoRegular",
                  },
                ]}
                onChangeText={(text) => {
                  setAboutMe(text);
                }}
                multiline={true}
              />
            </View>
          </View>
          <View style={styles.name_wrapper}>
            <View style={styles.name_header_wrapper}>
              <Text style={styles.name_header_text}>Birthday</Text>
            </View>
            {showPicker && (
              <View style={styles.choose_birthday_wrapper}>
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                />
                <TextInput
                  style={{
                    fontSize: 16,
                    fontFamily: "LatoRegular",
                    marginLeft: 10,
                  }}
                  editable={false}
                  placeholder="Choose your birthday"
                  value={new Date(dateOfBirth).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  onChangeText={setDateOfBirth}
                  placeholderTextColor={RED_COLOR}
                  color={RED_COLOR}
                />
              </View>
            )}
            {!showPicker && (
              <TouchableOpacity
                style={styles.choose_birthday_wrapper}
                onPress={toggleShowPicker}
              >
                <TextInput
                  style={{
                    fontSize: 16,
                    fontFamily: "LatoRegular",
                    marginLeft: 10,
                  }}
                  editable={false}
                  placeholder="Choose your birthday"
                  value={new Date(dateOfBirth).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  onChangeText={setDateOfBirth}
                  placeholderTextColor={RED_COLOR}
                  color={RED_COLOR}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.footer_wrapper}>
          <TouchableOpacity
            disabled={!enableNextButton}
            style={styles.footer_button}
            onPress={() => {
              if (firstName.length === 0) {
                setIsSetFirstName(false);
              }
              if (lastName.length === 0) {
                setIsSetLastName(false);
              }
              if (avatar.length === 0) {
                setIsSetAvatar(false);
              }
              if (firstName !== "" && lastName !== "" && avatar !== "") {
                setEnableNextButton(false);
                dispatch(userUpdateFirstName(firstName));
                dispatch(userUpdateLastName(lastName));
                dispatch(userUpdateOccupation(occupation));
                dispatch(userUpdateAboutMe(aboutMe));
                dispatch(userUpdateBirthday(dateOfBirth));
                navigation.navigate("SetUpProfile2");
              }
            }}
          >
            <Text style={styles.footer_button_text}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <PopUpNotificationDialog
          visible={isShowPopUp}
          onRequestClose={() => {
            setIsShowPopUp(false);
          }}
          title={"Error"}
          message={"No access to gallery"}
        />
        {isSetAvatar ? null : (
          <PopUpNotification
            message={"You must set your avatar"}
            onRequestClose={() => {
              setIsSetAvatar(true);
            }}
          />
        )}
        <StatusBar style="dark" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header_wrapper: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 40,
  },
  header_text: {
    fontFamily: "LatoBlack",
    fontSize: 40,
  },
  body_wrapper: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar_wrapper: {
    height: 120,
    width: 120,
    position: "relative",
    borderWidth: 2,
    borderColor: LIGHT_GRAY_COLOR,
    borderRadius: 60,
  },
  avatar: { height: 116, width: 116 },
  choose_avatar_button: {
    position: "absolute",
    backgroundColor: RED_COLOR,
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 22,
    bottom: 0,
    right: 0,
  },
  name_wrapper: { width: "100%", marginTop: 16 },
  name_header_wrapper: { marginBottom: 8 },
  name_header_text: { fontFamily: "LatoBold", fontSize: 18 },
  name_input_wrapper: {},
  name_input: {
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: "LatoRegular",
  },
  choose_birthday_wrapper: {
    width: "100%",
    backgroundColor: LIGHT_RED_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 16,
    justifyContent: "center",
    //alignItems: "center",
  },
  footer_wrapper: {
    marginTop: 60,
  },
  footer_button: {
    backgroundColor: RED_COLOR,
    paddingVertical: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  footer_button_text: {
    fontSize: 18,
    fontFamily: "LatoBold",
    color: "#fff",
  },
  name_error_wrapper: {},
  name_error_text: { fontFamily: "LatoItalic", color: "red", fontSize: 14 },
});

export default SetUpProfile1;
