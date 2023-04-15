import { View, Text } from "react-native";
import React, { useContext, memo } from "react";
import { styles } from "../assets/styles/header";
import ColorsContext from "../ContextAPI/ColorsContext";

function Header() {
  const { hTextColor, font_Family } = useContext(ColorsContext);

  const headerTextStyle = {
    fontFamily: font_Family,
    color: hTextColor,
    ...styles.headertext,
  };

  const subheaderTextStyle = {
    fontFamily: font_Family,
    color: hTextColor,
    ...styles.subheadertext,
  };

  return (
    <View style={styles.header}>
    {console.log('h render')}
      <Text style={headerTextStyle}>HOSTEL ACTIVITY MONITOR</Text>
      <View style={styles.lineStyle} />
      <Text style={subheaderTextStyle}>QAU ISLAMABAD</Text>
    </View>
  );
}

export default memo(Header);
