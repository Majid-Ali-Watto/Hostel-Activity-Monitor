import { View, Text } from "react-native";
import React from "react";
import { styles } from "../assets/styles/header";
import ColorsContext from "../ContextAPI/ColorsContext";
export default function Header() {
  const { hTextColor,font_Family } = React.useContext(ColorsContext);

  return (
    <View style={styles.header}>
      <Text style={[styles.headertext, { fontFamily: font_Family,color:hTextColor }]}>
        HOSTEL ACTIVITY MONITOR
      </Text>
      <View style={styles.lineStyle} />
      <Text style={[styles.subheadertext, { fontFamily: font_Family,color:hTextColor}]}>
        QAU ISLAMABAD 
      </Text>
    </View>
  );
}
