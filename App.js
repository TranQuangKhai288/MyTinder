import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import { NavigationContainer } from "@react-navigation/native";
import Stack from "./src/navigator/Stack";

export default function App() {
  return (
    <Provider store={store}>
      {/* <View style={styles.container}>
        
      </View> */}
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
