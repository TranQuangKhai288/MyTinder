import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { RedRightArrowIcon } from "../constants/icons";
import { LIGHT_GRAY_COLOR, RED_COLOR } from "../constants/color";
import { interests } from "../assets/data/data";
import { useSelector, useDispatch } from "react-redux";
import {
  userUpdateInterests,
  userUpdateAvatar,
  userUpdateIsSetUp,
} from "../redux/actions/userActions";
import { useFocusEffect } from "@react-navigation/native";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FIREBASE_STORAGE } from "../../firebaseConfig";
import {
  updateUserDocumentToFirestore,
  updateUserInterestsToFirestore,
} from "../firebase/user";

const SetUpProfile3 = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const [selectedInterestID, setSelectedInterestID] = useState([]);
  const [enableNextButton, setEnableNextButton] = useState(true);
  useEffect(() => {
    setSelectedInterestID(user.interests);
  }, []);
  useFocusEffect(
    useCallback(() => {
      setEnableNextButton(true);
    }, [])
  );
  const upLoadAvatar = async () => {
    const storageRef = ref(FIREBASE_STORAGE, `users/${user.id}/avatar`);
    try {
      const fileData = await fetch(user.avatar);
      const blob = await fileData.blob();
      await uploadBytes(storageRef, blob);
      console.log("upload success");
      const downloadURL = await getDownloadURL(storageRef);
      dispatch(userUpdateAvatar(downloadURL.toString()));
      return downloadURL.toString();
    } catch (error) {
      console.log(error);
    }
  };
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
      <TouchableOpacity
        style={styles.back_button_wrapper}
        onPress={() => {
          navigation.navigate("SetUpProfile2");
        }}
      >
        <SvgXml xml={RedRightArrowIcon} height={24} width={24} />
      </TouchableOpacity>
      <View style={styles.header_wrapper}>
        <Text style={styles.header_text}>Your interests</Text>
        <Text style={styles.header_decription_text}>
          Select a few of your interests and let everyone know what you're
          passionate about.
        </Text>
      </View>
      <View style={styles.body_wrapper}>
        <FlatList
          data={interests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.interest_item_wrapper,
                selectedInterestID.includes(item.id)
                  ? { borderColor: RED_COLOR, backgroundColor: RED_COLOR }
                  : { borderColor: LIGHT_GRAY_COLOR },
              ]}
              onPress={() => {
                if (selectedInterestID.includes(item.id)) {
                  setSelectedInterestID(
                    selectedInterestID.filter((id) => id !== item.id)
                  );
                } else {
                  setSelectedInterestID([...selectedInterestID, item.id]);
                }
              }}
            >
              <View style={[styles.interest_item_icon]}>
                {selectedInterestID.includes(item.id) ? (
                  <SvgXml xml={item.focusedIcon} height={24} width={24} />
                ) : (
                  <SvgXml xml={item.icon} height={24} width={24} />
                )}
              </View>
              <View style={styles.interest_item_name}>
                <Text
                  style={[
                    selectedInterestID.includes(item.id)
                      ? { color: "#FFFFFF" }
                      : {},
                    styles.interest_item_name_text,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          style={{ width: "100%" }}
          numColumns={2}
          scrollEnabled={false}
        />
        <View style={styles.select_clear_all_button_wrapper}>
          <TouchableOpacity
            style={styles.clear_all_button}
            onPress={() => {
              if (selectedInterestID.length !== 0) {
                setSelectedInterestID([]);
              }
            }}
          >
            <Text style={styles.clear_all_button_text}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.select_all_button}
            onPress={() => {
              if (selectedInterestID.length !== interests.length) {
                setSelectedInterestID(interests.map((item) => item.id));
              }
            }}
          >
            <Text style={styles.select_all_button_text}>Select all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer_wrapper}>
        <TouchableOpacity
          style={styles.footer_button}
          disabled={!enableNextButton}
          onPress={async () => {
            setEnableNextButton(false);
            let updatedUser = user;
            updatedUser.interests = selectedInterestID;
            updatedUser.isSetUp = true;
            updatedUser.avatar = await upLoadAvatar();
            console.log("updatedUser", updatedUser);
            dispatch(userUpdateInterests(selectedInterestID));
            dispatch(userUpdateIsSetUp(true));
            await updateUserDocumentToFirestore(updatedUser);
            navigation.navigate("BottomTab");
          }}
        >
          <Text style={styles.footer_button_text}>Done</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  back_button_wrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
  },
  header_wrapper: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 40,
  },
  header_text: {
    fontFamily: "LatoBlack",
    fontSize: 32,
  },
  header_decription_text: {
    fontFamily: "LatoRegular",
    fontSize: 16,
  },
  body_wrapper: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  interest_item_wrapper: {
    width: 160,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    margin: 4,
  },
  interest_item_icon: {},
  interest_item_name: { marginLeft: 8 },
  interest_item_name_text: {
    fontFamily: "LatoRegular",
    fontSize: 16,
  },
  select_clear_all_button_wrapper: {
    flexDirection: "row",
    marginTop: 16,
    width: "100%",
  },
  select_all_button: {
    width: 160,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    margin: 4,
    borderColor: RED_COLOR,
    backgroundColor: RED_COLOR,
  },
  select_all_button_text: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: "#fff",
  },
  clear_all_button: {
    width: 160,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    margin: 4,
    borderColor: LIGHT_GRAY_COLOR,
  },
  clear_all_button_text: { fontFamily: "LatoRegular", fontSize: 16 },
  footer_wrapper: {
    marginTop: 40,
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
});

export default SetUpProfile3;
