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

const OtherProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const interests = ["Travel", "Music", "Sport", "Reading", "Cooking"];
  const gallery = [
    require("../assets/images/test-gallery1.png"),
    require("../assets/images/test-gallery2.png"),
    require("../assets/images/test-gallery3.png"),
    require("../assets/images/test-gallery4.png"),
    require("../assets/images/test-gallery5.png"),
    require("../assets/images/test-gallery6.jpg"),
    require("../assets/images/test-gallery7.jpg"),
  ];

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
          <Image
            source={require("../assets/images/testAvatar.png")}
            style={styles.avatar}
          />
        </View>
        <TouchableOpacity style={styles.close_button_wrapper}>
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
              <Text style={styles.name_text}>Name, age</Text>
            </View>
            <View style={styles.job_wrapper}>
              <Text style={styles.job_text}>Job</Text>
            </View>
          </View>
          <View style={styles.location_wrapper}>
            <View style={styles.location_header_wrapper}>
              <Text style={styles.location_header_text}>Location</Text>
            </View>
            <View style={styles.location_content_wrapper}>
              <Text style={styles.location_content_text}>
                Location description
              </Text>
            </View>
          </View>
          <View style={styles.about_wrapper}>
            <View style={styles.about_header_wrapper}>
              <Text style={styles.about_header_text}>About</Text>
            </View>
            <View style={styles.about_content_wrapper}>
              <Text style={styles.about_content_text}>About description</Text>
            </View>
          </View>
          <View style={styles.interest_wrapper}>
            <View style={styles.interest_header_wrapper}>
              <Text style={styles.interest_header_text}>Interest</Text>
            </View>
            <View style={styles.interest_content_wrapper}>
              {interests.map((item, index) => (
                <View key={index} style={styles.interest_item_wrapper}>
                  <Text style={styles.interest_item_text}>{item}</Text>
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
                        width: 96,
                        height: (96 * 4) / 3,
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
  container: { flex: 1 },
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
    backgroundColor: "#FFFFFF50",
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
    marginTop: -60,
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
  name_wrapper: {},
  name_text: {
    fontFamily: "SourceSansProBold",
    fontSize: 28,
    color: "#000000",
  },
  job_wrapper: { marginTop: 4 },
  job_text: {
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#000000",
  },
  location_wrapper: { marginTop: 40 },
  location_header_wrapper: {},
  location_header_text: {
    fontFamily: "SourceSansProBold",
    fontSize: 20,
    color: "#000000",
  },
  location_content_wrapper: { marginTop: 4 },
  location_content_text: {
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#000000",
  },
  about_wrapper: { marginTop: 40 },
  about_header_wrapper: {},
  about_header_text: {
    fontFamily: "SourceSansProBold",
    fontSize: 20,
    color: "#000000",
  },
  about_content_wrapper: { marginTop: 4 },
  about_content_text: {
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#000000",
  },
  interest_wrapper: { marginTop: 40 },
  interest_header_wrapper: {},
  interest_header_text: {
    fontFamily: "SourceSansProBold",
    fontSize: 20,
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
    borderColor: "#000000",
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  interest_item_text: {
    fontFamily: "SourceSansProRegular",
    fontSize: 16,
    color: "#000000",
  },
  gallery_wrapper: { marginTop: 40 },
  gallery_header_wrapper: {},
  gallery_header_text: {
    fontFamily: "SourceSansProBold",
    fontSize: 20,
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
