import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import { NavigationContainer } from "@react-navigation/native";
import Stack from "./src/navigator/Stack";
import React from "react";
import { useFonts } from "expo-font";
import { FONTS } from "./src/constants/fonts";
import StartScreen from "./src/screens/StartScreen";
import TestScreen from "./src/screens/TestScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "./src/screens/SplashScreen";
import OtherProfileScreen from "./src/screens/OtherProfileScreen";
import SetUpProfile1 from "./src/screens/SetUpProfile1";
import SetUpProfile2 from "./src/screens/SetUpProfile2";
import SetUpProfile3 from "./src/screens/SetUpProfile3";
import OTPInputScreen from "./src/screens/OTPInputScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import SetUpProfileStack from "./src/navigator/SetUpProfileStack";

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
          {/* <SetUpProfile2 /> */}
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
