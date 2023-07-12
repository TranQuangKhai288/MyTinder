import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CardItem from "../components/CardItem";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { userRemoveMatches } from "../redux/actions/userActions";

const MatchesScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.user.user);
  const allUser = useSelector((state) => state.allUser.allUser);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const handleMatchesinfo = (user) => {
    console.log("user before navigate", user);
    navigation.navigate("OtherProfileScreen", user);
  };

  const handleChat = (user) => {
    let chatid = "";
    const id1 = currentUser.id + user.id;
    const id2 = user.id + currentUser.id;
    if (currentUser.id.localeCompare(user.id) === -1) chatid = id1;
    else chatid = id2;
    navigation.navigate("ChatRoomScreen", { user: user, chatID: chatid });
  };

  const handleRemoveMatch = (user) => {
    dispatch(userRemoveMatches(user.id));
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
      {/* end of header */}
      {/* list  */}

      <ScrollView style={{ marginBottom: 70 }}>
        <View style={{ paddingBottom: 36 }}>
          <FlatList
            style={{
              backgroundColor: "transparent",
            }}
            numColumns={2}
            data={allUser
              .filter(
                (user) =>
                  !!currentUser.matches.find((match) => match === user.id)
              )
              .sort((a, b) =>
                a.firstName
                  .toLowerCase()
                  .localeCompare(b.firstName.toLowerCase())
              )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleMatchesinfo(item);
                  console.log("item: ", item);
                }}
              >
                <CardItem
                  info={item}
                  chat={() => {
                    handleChat(item);
                  }}
                  remove={() => {
                    handleRemoveMatch(item);
                  }}
                />
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
