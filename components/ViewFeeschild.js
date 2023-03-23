import { View, Text } from "react-native";
import { styles } from "../assets/styles/viewfeeschild";
import React from "react";
import { getBGcolor } from "../Constants/BG_Color";
export default function ViewFeesChild(props) {
  return (
    <View style={[styles.mainView, { backgroundColor: getBGcolor() }]}>
      <View style={styles.childViews1}>
        <Text style={styles.text1}>{props.title}</Text>
      </View>
    </View>
  );
}
