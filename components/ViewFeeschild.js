import { View, Text } from "react-native";
import { styles } from "../assets/styles/viewfeeschild";
import React from "react";
import ColorsContext from "../ContextAPI/ColorsContext";
export default function ViewFeesChild(props) {
  const { bgColor, cardsColor } = React.useContext(ColorsContext);
  return (
    <View style={[styles.mainView, { backgroundColor: bgColor }]}>
      <View style={[styles.childViews1, { backgroundColor: cardsColor }]}>
        <Text style={styles.text1}>{props.title}</Text>
      </View>
    </View>
  );
}
