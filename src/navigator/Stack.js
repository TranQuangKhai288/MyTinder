import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OtherProfileScreen from "../screens/OtherProfileScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import SignUpScreenByPhoneNumber from "../screens/SignUpScreenByPhoneNumber";

const stack = createStackNavigator();
const Stack = () => {
  return (
    <stack.Navigator
      screenOptions={() => ({
        header: () => {
          null;
        },
      })}
      initialRouteName="LoginScreen"
    >
      <stack.Screen name="BottomTab" component={BottomTab} />
      <stack.Screen name="LoginScreen" component={LoginScreen} />
      <stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <stack.Screen
        name="SignUpScreenByPhoneNumber"
        component={SignUpScreenByPhoneNumber}
      />

      <stack.Screen name="OtherProfileScreen" component={OtherProfileScreen} />
      <stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
    </stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Stack;
