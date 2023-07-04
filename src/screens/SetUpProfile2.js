import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import {
  CameraIcon,
  RedRightArrowIcon,
  WhiteCheckIcon,
} from "../constants/icons";
import {
  LIGHT_GRAY_COLOR,
  LIGHT_RED_COLOR,
  RED_COLOR,
} from "../constants/color";
import { useSelector, useDispatch } from "react-redux";
import { userUpdateGender } from "../redux/actions/userActions";
import { gender } from "../assets/data/data";
import { useFocusEffect } from "@react-navigation/native";

const SetUpProfile2 = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const [selectedGenderID, setSelectedGenderID] = useState(1);
  const [enableNextButton, setEnableNextButton] = useState(true);
  useEffect(() => {
    if (user.gender === null) {
      setSelectedGenderID(1);
    } else {
      setSelectedGenderID(user.gender);
    }
  }, []);
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
      <TouchableOpacity
        style={styles.back_button_wrapper}
        onPress={() => {
          navigation.navigate("SetUpProfile1");
        }}
      >
        <SvgXml xml={RedRightArrowIcon} height={24} width={24} />
      </TouchableOpacity>
      <View style={styles.header_wrapper}>
        <Text style={styles.header_text}>I am a</Text>
      </View>
      <View style={styles.body_wrapper}>
        <FlatList
          data={gender}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={
                selectedGenderID === item.id
                  ? styles.gender_wrapper_selected
                  : styles.gender_wrapper
              }
              onPress={() => setSelectedGenderID(item.id)}
            >
              <Text
                style={
                  selectedGenderID === item.id
                    ? styles.gender_text_selected
                    : styles.gender_text
                }
              >
                {item.name}
              </Text>
              <SvgXml xml={WhiteCheckIcon} />
            </TouchableOpacity>
          )}
          style={{ width: "100%" }}
        />
      </View>
      <View style={styles.footer_wrapper}>
        <TouchableOpacity
          style={styles.footer_button}
          disabled={!enableNextButton}
          onPress={() => {
            setEnableNextButton(false);
            navigation.navigate("SetUpProfile3");
            dispatch(userUpdateGender(selectedGenderID));
          }}
        >
          <Text style={styles.footer_button_text}>Confirm</Text>
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
    fontSize: 40,
  },
  body_wrapper: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  gender_wrapper: {
    borderWidth: 1,
    borderColor: LIGHT_GRAY_COLOR,
    width: "100%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gender_wrapper_selected: {
    borderWidth: 1,
    borderColor: RED_COLOR,
    backgroundColor: RED_COLOR,
    width: "100%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gender_text: {
    fontFamily: "LatoRegular",
    fontSize: 16,
  },
  gender_text_selected: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: "#fff",
  },
  footer_wrapper: {
    marginTop: 100,
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

export default SetUpProfile2;
