import React, { useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace with the appropriate icon library import
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { SvgXml } from "react-native-svg";
import { CloseIcon, HeartIcon } from "../constants/icons";
import { RED_COLOR } from "../constants/color";
import { userAddMatches } from "../redux/actions/userActions";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const insets = useSafeAreaInsets();
  const allUsers = useSelector((state) => state.allUser.allUser);
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [allCards, setAllCards] = useState(allUsers);
  const swiperRef = useRef();
  console.log(currentUser.matches);
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
      {/* header */}
      <View
        style={{
          alignItems: "center",
          position: "relative",
          padding: 2,
          height: 64,
          marginBottom: -12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginLeft: 24 }}>
          <Text
            style={{ fontSize: 42, fontFamily: "Billabong", color: "black" }}
          >
            MyTinder
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            position: "relative",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: "flex-end", marginRight: 24 }}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Image
              source={
                currentUser.avatar
                  ? {
                      uri: currentUser.avatar,
                    }
                  : require("../assets/images/avatar-default.png")
              }
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                alignItems: "center",
                marginBottom: 8,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* end of header */}

      {/* Swipe card */}
      <View style={styles.swiper_wrapper}>
        <Swiper
          cards={allCards}
          ref={swiperRef}
          onSwipedLeft={() => {
            console.log("Swipe NOPE");
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe MATCH");
            const check = currentUser.matches.find(
              (item) => item === allCards[cardIndex].id
            );
            if (!check) {
              dispatch(userAddMatches(allCards[cardIndex].id));
            }
          }}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          overlayLabels={{
            left: {
              element: (
                <Text
                  style={{
                    color: "red",
                    fontFamily: "LatoBlack",
                    fontSize: 32,
                  }}
                >
                  NOPE
                </Text>
              ),
              style: {
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              element: (
                <Text
                  style={{
                    color: "#00FF00",
                    fontFamily: "LatoBlack",
                    fontSize: 32,
                  }}
                >
                  MATCH
                </Text>
              ),
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
          renderCard={(card) => (
            <View key={card.id} style={styles.card}>
              <Image
                style={styles.Image}
                source={
                  card.avatar
                    ? {
                        uri: card.avatar,
                      }
                    : require("../assets/images/avatar-default.png")
                }
              />
              <View style={styles.content}>
                <LinearGradient
                  colors={["transparent", "#000000"]}
                  style={styles.LinearGradientStyle}
                >
                  <View style={styles.text_wrapper}>
                    <View style={styles.text_infor_wrapper}>
                      <Text style={styles.textName}>
                        {card.firstName} {card.lastName}
                      </Text>
                      <Text style={styles.textAge}>
                        {!card.birthday
                          ? "20"
                          : new Date().getFullYear() -
                            new Date(card.birthday).getFullYear()}
                      </Text>
                    </View>
                    <Text style={styles.text}>{card.occupation}</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          )}
          onSwiped={(cardIndex) => console.log("Card swiped: ", cardIndex)}
          onSwipedAll={() => {
            if (allCards.length === 0) {
              setAllCards(allUsers);
            }
          }}
          cardIndex={0}
          stackSize={3}
          overlayOpacityHorizontalThreshold={40}
          infinite={true}
        />
      </View>
      {/* end of swipe card */}

      {/* start of Button */}
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "center",
          bottom: "14%",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            width: 58,
            height: 58,
            backgroundColor: "#EEEEEE",
            marginRight: 24,
          }}
          onPress={() => {
            swiperRef.current.swipeLeft();
          }}
        >
          <SvgXml xml={CloseIcon} width={32} height={32} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            width: 58,
            height: 58,
            backgroundColor: RED_COLOR,
          }}
          onPress={() => {
            swiperRef.current.swipeRight();
          }}
        >
          <SvgXml xml={HeartIcon} width={32} height={32} />
        </TouchableOpacity>
      </View>

      {/* end of button */}
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  swiper_wrapper: {
    position: "relative",
    marginTop: -48,
  },

  Image: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 24,
  },

  content: {
    position: "absolute",
    backgroundColor: "transparent",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    bottom: 0,
    width: "100%",
  },
  LinearGradientStyle: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 8,
  },
  card: {
    flex: 0.8,
    height: "80%",
    borderRadius: 24,
  },

  text_wrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 2,
    marginLeft: 10,
    marginBottom: 24,
  },
  text_infor_wrapper: { flexDirection: "row", alignItems: "flex-end" },
  text: { color: "#fff", fontSize: 16, fontFamily: "LatoRegular" },
  textName: { color: "#fff", fontSize: 28, fontFamily: "LatoRegular" },
  textAge: {
    color: "#fff",
    fontSize: 26,
    marginLeft: 8,
    fontFamily: "LatoRegular",
  },
});

export default HomeScreen;
