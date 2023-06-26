import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  StyleSheet,
} from "react-native";
import CardItem from "../components/CardItem";
import Icon from "../components/Icon";

const DATA = [
  {
    id: 1,
    //image: require("../assets/images/backgr.jpg"),
  },
];

const MatchesScreen = ({ navigation }) => {
  const handleMatches = () => {
    // Perform login logic here
    navigation.navigate("InfomationScreen");
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View
        style={{
          alignItems: "center",
          position: "relative",
          padding: 2,
          height: 64,
          marginTop: 16,
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
            Matches
          </Text>
        </TouchableOpacity>
      </View>
      {/* end of header */}
      {/* list  */}

      <View style={{ paddingBottom: 120 }}>
        <FlatList
          style={{
            marginBottom: 20,
            backgroundColor: "transparent",
          }}
          numColumns={2}
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleMatches}>
              <CardItem
                image={item.image}
                name={item.name}
                status={item.status}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* end of list */}
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
