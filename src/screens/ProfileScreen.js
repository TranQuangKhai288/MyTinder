import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import { useSelector } from "react-redux";
import { LIGHT_GRAY_COLOR, RED_COLOR } from "../constants/color";
import { FIREBASE_REALTIME_DB } from "../../firebaseConfig";
import { ref, set, push, onValue } from "@firebase/database";

const ProfileScreen = ({ navigation }) => {};

export default ProfileScreen;
