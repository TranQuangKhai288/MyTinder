import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import { NavigationContainer } from "@react-navigation/native";
import Stack from "./src/navigator/Stack";
import React from "react";
import { useFonts } from "expo-font";
import { FONTS } from "./src/constants/fonts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingScreen from "./src/screens/LoadingScreen";

export default function App() {
  const [fonsLoaded] = useFonts(FONTS);
  if (!fonsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/* <View style={styles.container}>
        
      </View> */}
        <NavigationContainer>
          <Stack />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
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
