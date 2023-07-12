import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions/userActions";
import {
  Flash2Icon,
  InforCircleIcon,
  KeyIcon,
  LikeIcon,
  MenuIcon,
  RedLeftArrowIcon,
  UserIcon,
} from "../constants/icons";
import { SvgXml } from "react-native-svg";
import { RED_COLOR } from "../constants/color";
import { useFocusEffect } from "@react-navigation/native";
import { logoutUser, updateOfflineStatus } from "../firebase/user";

const MatchesScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef();
  const [disabledButton, setDisabledButton] = useState(false);
  const infors = [
    {
      content: "About Us",
      icon: MenuIcon,
    },
    {
      content: "FAQ",
      icon: InforCircleIcon,
    },
    {
      content: "Help & Feedback",
      icon: Flash2Icon,
    },
    {
      content: "Support US",
      icon: LikeIcon,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      setDisabledButton(false);
    }, [])
  );

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        styles.container,
      ]}
    >
      <View
        style={{
          alignItems: "center",
          padding: 2,
          height: 64,
          marginBottom: -12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "flex-start", marginLeft: 24 }}
        >
          <Text
            style={{ fontSize: 42, fontFamily: "Billabong", color: "black" }}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body_wrapper}>
          <View style={styles.avatar_wrapper}>
            <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "center",
              }}
            >
              <Text style={styles.name_text}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              {/* {currentUser.gender === 1 || currentUser.gender === 2 ? (
                currentUser.gender === 1 ? (
                  <Image
                    source={require("../assets/images/female-gender.png")}
                    style={styles.gender_icon}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/male-gender.png")}
                    style={styles.gender_icon}
                  />
                )
              ) : null} */}
            </View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "LatoRegular",
                fontSize: 14,
                marginBottom: 4,
                marginTop: 32,
              }}
            >
              Account
            </Text>
            <View style={styles.item_wrapper}>
              <TouchableOpacity style={styles.item}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SvgXml xml={UserIcon} height={28} width={28} />
                  <Text
                    style={{
                      fontFamily: "LatoRegular",
                      fontSize: 16,
                      marginLeft: 8,
                    }}
                  >
                    Edit Profile
                  </Text>
                </View>
                <SvgXml xml={RedLeftArrowIcon} height={24} width={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <SvgXml xml={KeyIcon} height={28} width={28} />
                  <Text
                    style={{
                      fontFamily: "LatoRegular",
                      fontSize: 16,
                      marginLeft: 8,
                    }}
                  >
                    Change Password
                  </Text>
                </View>
                <SvgXml xml={RedLeftArrowIcon} height={24} width={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "LatoRegular",
                fontSize: 14,
                marginBottom: 4,
                marginTop: 32,
              }}
            >
              My Tinder
            </Text>
            <View style={styles.item_wrapper}>
              {infors.map((item, index) => (
                <TouchableOpacity key={index} style={styles.item}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <SvgXml xml={item.icon} height={28} width={28} />
                    <Text
                      style={{
                        fontFamily: "LatoRegular",
                        fontSize: 16,
                        marginLeft: 8,
                      }}
                    >
                      {item.content}
                    </Text>
                  </View>
                  <SvgXml xml={RedLeftArrowIcon} height={24} width={24} />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: RED_COLOR,
                paddingVertical: 20,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 32,
              }}
              disabled={disabledButton}
              onPress={() => {
                setDisabledButton(true);
                dispatch(userLogout());
                logoutUser();
                updateOfflineStatus(currentUser);
                navigation.replace("LoginScreen");
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "LatoBold",
                  color: "#fff",
                }}
              >
                Sign out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  avatar_wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginTop: 24,
  },
  name_text: {
    fontSize: 24,
    fontFamily: "LatoBold",
    marginTop: 8,
  },
  gender_icon: {
    height: 20,
    width: 20,
    marginLeft: 4,
  },
  body_wrapper: {
    padding: 16,
    width: "100%",
    paddingBottom: 92,
  },
  item_wrapper: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
});

export default MatchesScreen;
