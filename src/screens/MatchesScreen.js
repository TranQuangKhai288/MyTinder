import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CardItem from "../components/CardItem";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";

const DATA = [
  {
    id: 1,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 20,
    status: "online",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/0b/22/97/0b2297a3c2d1006d93592c295cd4791b.jpg",
    firstname: "Tran Quang",
    lastname: "Ku",
    age: 19,
    status: "online",
  },
  {
    id: 3,
    image:
      "https://t3.ftcdn.net/jpg/05/38/28/52/360_F_538285203_UJl9HNQ3oD3JfqCO8uvPxVTp4s0wtp2i.jpg",
    firstname: "Tran Quang",
    lastname: "Tam",
    age: 15,
    status: "online",
  },
  {
    id: 4,
    image:
      "https://e0.pxfuel.com/wallpapers/331/165/desktop-wallpaper-cat-by-majist-72-now-browse-millions-of-popular-cats-an-cute-animals-cute-little-animals-cute-animal-drawings-cute-cartoon-kitten.jpg",
    firstname: "Tran Quang",
    lastname: "Vu",
    age: 20,
    status: "online",
  },

  {
    id: 5,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Aloo",
    age: 20,
    status: "online",
  },
  {
    id: 6,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 25,
    status: "online",
  },
  {
    id: 7,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 25,
    status: "online",
  },
  {
    id: 8,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 25,
    status: "online",
  },
  {
    id: 9,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 25,
    status: "online",
  },
  {
    id: 10,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 25,
    status: "online",
  },
  {
    id: 11,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 25,
    status: "online",
  },
  {
    id: 12,
    image:
      "https://w0.peakpx.com/wallpaper/171/15/HD-wallpaper-cat-animals-cute-nature-sailor.jpg",
    firstname: "Tran Quang",
    lastname: "Khai",
    age: 25,
    status: "online",
  },
];

const MatchesScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.user);
  const allUser = useSelector((state) => state.allUser.allUser);
  const insets = useSafeAreaInsets();
  const handleMatchesinfo = (user) => {
    console.log("user before navigate", user);
    navigation.navigate("OtherProfileScreen", user);
  };

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
        <TouchableOpacity
          style={{ justifyContent: "flex-start", marginLeft: 24 }}
        >
          <Text
            style={{ fontSize: 42, fontFamily: "Billabong", color: "black" }}
          >
            Matches
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: "flex-end", marginRight: 24 }}
        >
          <Image
            source={{
              uri: currentUser.avatar,
            }}
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
      {/* end of header */}
      {/* list  */}

      <ScrollView style={{ marginBottom: 70 }}>
        <View style={{ paddingBottom: 36 }}>
          <FlatList
            style={{
              backgroundColor: "transparent",
            }}
            numColumns={2}
            data={allUser}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleMatchesinfo(item);
                  console.log("item: ", item);
                }}
              >
                <CardItem info={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      {/* end of list */}

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
});

export default MatchesScreen;
