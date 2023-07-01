import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SetUpProfile1 from "../screens/SetUpProfile1";
import SetUpProfile2 from "../screens/SetUpProfile2";
import SetUpProfile3 from "../screens/SetUpProfile3";

const Stack = createStackNavigator();

const SetUpProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Screen name="SetUpProfile1" component={SetUpProfile1} />
      <Stack.Screen name="SetUpProfile2" component={SetUpProfile2} />
      <Stack.Screen name="SetUpProfile3" component={SetUpProfile3} />
    </Stack.Navigator>
  );
};

export default SetUpProfileStack;
