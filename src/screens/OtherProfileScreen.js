import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SCREEN_WIDTH } from "../constants/constants";
import { SvgXml } from "react-native-svg";
import { CloseIcon, HeartIcon, RightArrowIcon } from "../constants/icons";
import { RED_COLOR } from "../constants/color";
import { useSelector } from "react-redux";
import { gender, interests } from "../assets/data/data";

const OtherProfileScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const user = route.params;
  console.log(user);
  const gallery = [
    require("../assets/images/test-gallery1.png"),
    require("../assets/images/test-gallery2.png"),
    require("../assets/images/test-gallery3.png"),
    require("../assets/images/test-gallery4.png"),
    require("../assets/images/test-gallery5.png"),
    require("../assets/images/test-gallery6.jpg"),
    require("../assets/images/test-gallery7.jpg"),
  ];

  const handleMatches = () => {
    navigation.goBack();
  };

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
      <ScrollView
        style={styles.wrapper}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatar_wrapper}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </View>
        <TouchableOpacity
          style={styles.close_button_wrapper}
          onPress={handleMatches}
        >
          <SvgXml xml={RightArrowIcon} height={24} width={24} />
        </TouchableOpacity>
        <View style={styles.content_wrapper}>
          <View style={styles.function_button_wrapper}>
            <TouchableOpacity style={styles.dislike_button_wrapper}>
              <SvgXml xml={CloseIcon} height={32} width={32} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.like_button_wrapper}>
              <SvgXml xml={HeartIcon} height={32} width={32} />
            </TouchableOpacity>
          </View>
          <View style={styles.name_job_wrapper}>
            <View style={styles.name_wrapper}>
              <Text style={styles.name_text}>
                {`${user.firstName} ${user.lastName}`},{" "}
                {!user.birthday
                  ? 20
                  : new Date().getFullYear() -
                    new Date(user.birthday).getFullYear()}
              </Text>
              <View>
                {user.gender === 1 || user.gender === 2 ? (
                  user.gender === 1 ? (
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
                ) : null}
              </View>
            </View>
            <View style={styles.job_wrapper}>
              <Text style={styles.job_text}>{user.occupation}</Text>
            </View>
          </View>
          <View style={styles.about_wrapper}>
            <View style={styles.about_header_wrapper}>
              <Text style={styles.about_header_text}>About me</Text>
            </View>
            <View style={styles.about_content_wrapper}>
              <Text style={styles.about_content_text}>{user.aboutMe}</Text>
            </View>
          </View>
          <View style={styles.interest_wrapper}>
            <View style={styles.interest_header_wrapper}>
              <Text style={styles.interest_header_text}>Interest</Text>
            </View>
            <View style={styles.interest_content_wrapper}>
              {user.interests.map((item, index) => (
                <View key={index} style={styles.interest_item_wrapper}>
                  <SvgXml
                    xml={interests.find((i) => i.id === item).icon}
                    height={20}
                    width={20}
                  />
                  <Text style={styles.interest_item_text}>
                    {interests.find((i) => i.id === item).name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.gallery_wrapper}>
            <View style={styles.gallery_header_wrapper}>
              <Text style={styles.gallery_header_text}>Gallery</Text>
            </View>
            <View style={styles.gallery_content_wrapper}>
              {gallery.map((item, index) => {
                return (
                  <View key={index} style={styles.gallery_item_wrapper}>
                    <Image
                      style={{
                        width: 100,
                        height: (100 * 4) / 3,
                        borderRadius: 8,
                      }}
                      source={item}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  wrapper: { flex: 1 },
  avatar_wrapper: { width: SCREEN_WIDTH },
  avatar: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 4) / 3,
    justifyContent: "center",
    borderRadius: 12,
  },
  close_button_wrapper: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#55555550",
    borderRadius: 12,
    borderWidth: 1,
    position: "absolute",
    top: 16,
    left: 16,
  },
  content_wrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 28,
    marginTop: -40,
  },
  function_button_wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -68,
  },
  dislike_button_wrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    marginRight: 32,
  },
  like_button_wrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: RED_COLOR,
  },
  name_job_wrapper: { marginTop: 40 },
  name_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  name_text: {
    fontFamily: "LatoBlack",
    fontSize: 30,
    color: "#000000",
  },
  gender_icon: { width: 28, height: 28, marginLeft: 12 },
  job_wrapper: { marginTop: 4 },
  job_text: {
    fontFamily: "LatoRegular",
    fontSize: 18,
    color: "#000000",
  },
  about_wrapper: { marginTop: 40 },
  about_header_wrapper: {},
  about_header_text: {
    fontFamily: "LatoBlack",
    fontSize: 22,
    color: "#000000",
  },
  about_content_wrapper: { marginTop: 4 },
  about_content_text: {
    fontFamily: "LatoRegular",
    fontSize: 18,
    color: "#000000",
  },
  interest_wrapper: { marginTop: 40 },
  interest_header_wrapper: {},
  interest_header_text: {
    fontFamily: "LatoBlack",
    fontSize: 22,
    color: "#000000",
  },
  interest_content_wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  interest_item_wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: RED_COLOR,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  interest_item_text: {
    fontFamily: "LatoRegular",
    fontSize: 18,
    color: "#000000",
    marginLeft: 4,
  },
  gallery_wrapper: { marginTop: 40 },
  gallery_header_wrapper: {},
  gallery_header_text: {
    fontFamily: "LatoBlack",
    fontSize: 22,
    color: "#000000",
  },
  gallery_content_wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  gallery_item_wrapper: {
    marginRight: 8,
    marginBottom: 8,
  },
});

export default OtherProfileScreen;
