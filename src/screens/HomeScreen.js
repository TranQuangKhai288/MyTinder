import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace with the appropriate icon library import
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

const DEMO_DATA = [
  {
    id: 1,
    firstName: "Tran",
    lastName: "Quang Khai",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: 20,
  },
  {
    id: 2,
    firstName: "Nguyen",
    lastName: "Van Vu",
    occupation: "Software Developer",
    imageURL: "https://pbs.twimg.com/media/DRxkTmYUQAAHqDX.jpg:large",

    age: "20",
  },
  {
    id: 3,
    firstName: "Tran",
    lastName: "Qfdsjghrewiobhfds",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
  {
    id: 4,
    firstName: "Tran",
    lastName: "Quang Khai vdnsbahjfkbreavbadsjhvbreayiu",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
  {
    id: 5,
    firstName: "Tran",
    lastName: "Quang Khai",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
  {
    id: 6,
    firstName: "Tran",
    lastName: "Quang Khai",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
  {
    id: 7,
    firstName: "Tran",
    lastName: "Quang Khai",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
  {
    id: 8,
    firstName: "Tran",
    lastName: "Quang Khai",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
  {
    id: 9,
    firstName: "Tran",
    lastName: "Quang Khai",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
  {
    id: 10,
    firstName: "Tran",
    lastName: "Quang Khai",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
  {
    id: 11,
    firstName: "Tran",
    lastName: "Quang Khai",
    occupation: "Software Developer",
    imageURL:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    age: "20",
  },
];

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const insets = useSafeAreaInsets();
  const allUsers = useSelector((state) => state.allUser.allUser);
  console.log("all users:", allUsers);

  const [fontsLoaded] = useFonts({
    Billabong: require("../assets/fonts/Billabong.ttf"),
    SourceSansProBold: require("../assets/fonts/SourceSansPro-Bold.ttf"),
  });
  if (!fontsLoaded) return undefined;
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
        <StatusBar style="light" />
        <TouchableOpacity
          style={{ justifyContent: "flex-start", marginLeft: 24 }}
        >
          <Text
            style={{ fontSize: 42, fontFamily: "Billabong", color: "black" }}
          >
            MyTinder
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            position: "relative",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginEnd: 24,
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Icon
              name="bell"
              size={28}
              style={{ marginEnd: 8, color: "black" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Icon
              name="history"
              size={28}
              style={{ marginStart: 12, color: "black" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* end of header */}

      {/* Swipe card */}
      <View style={styles.swiper_wrapper}>
        <Swiper
          cards={allUsers}
          onSwipedLeft={() => {
            console.log("Swipe NOPE");
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH");
          }}
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
              <Image style={styles.Image} source={{ uri: card.avatar }} />
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
                        {!card.birthday ? "20" : card.birthday}
                      </Text>
                    </View>
                    <Text style={styles.text}>{card.occupation}</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          )}
          onSwiped={(cardIndex) => console.log("Card swiped: ", cardIndex)}
          onSwipedAll={() => console.log("All cards swiped")}
          cardIndex={0}
          stackSize={3}
          backgroundColor="black"
        />
      </View>
      {/* end of swipe card */}

      {/* start of Button */}
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-evenly",
          bottom: "12%",
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
            backgroundColor: "#FF4545",
          }}
        >
          <Entypo name="cross" size={36} color={"#ffffff"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            width: 58,
            height: 58,
            backgroundColor: "#45FF5A",
          }}
        >
          <Entypo name="heart" size={36} color={"#ffffff"} />
        </TouchableOpacity>
      </View>

      {/* end of button */}
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
  text: { color: "#fff", fontSize: 16 },
  textName: { color: "#fff", fontSize: 28 },
  textAge: { color: "#fff", fontSize: 24, marginLeft: 8 },
});

export default HomeScreen;
