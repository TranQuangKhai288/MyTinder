import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OtherProfileScreen from "../screens/OtherProfileScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import SignUpScreenByPhoneNumber from "../screens/SignUpScreenByPhoneNumber";
import SetUpProfileStack from "./SetUpProfileStack";
import { useDispatch } from "react-redux";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { userLogin, userLogout } from "../redux/actions/userActions";
import StartScreen from "../screens/StartScreen";
import { onAuthStateChanged } from "firebase/auth";

const stack = createStackNavigator();
const Stack = () => {
  const dispatch = useDispatch();
  onAuthStateChanged(FIREBASE_AUTH, (user) => {
    if (user) {
      // User is signed in
      console.log("User is signed in");
      if (user.emailVerified) {
        dispatch(userLogin());
        console.log("User is signed in, verified");
      }
    } else {
      // User is signed out
      console.log("User is signed out");
      dispatch(userLogout());
    }
  });

  return (
    <stack.Navigator
      screenOptions={() => ({
        header: () => {
          null;
        },
      })}
      initialRouteName="StartScreen"
    >
      <stack.Screen name="BottomTab" component={BottomTab} />
      <stack.Screen name="LoginScreen" component={LoginScreen} />
      <stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <stack.Screen
        name="SignUpScreenByPhoneNumber"
        component={SignUpScreenByPhoneNumber}
      />
      <stack.Screen name="SetUpProfile" component={SetUpProfileStack} />
      <stack.Screen name="OtherProfileScreen" component={OtherProfileScreen} />
      <stack.Screen name="StartScreen" component={StartScreen} />
      <stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
    </stack.Navigator>
  );
};

export default Stack;
