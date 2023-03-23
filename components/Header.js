import { View, Text } from "react-native";
import { styles } from "../assets/styles/header";

export default function Header() {

  return (
    <View style={styles.header}>
      <Text style={[styles.headertext, { fontFamily: "monospace" }]}>
        HOSTEL ACTIVITY MONITOR
      </Text>
      <View style={styles.lineStyle} />
      <Text style={[styles.subheadertext, { fontFamily: "monospace" }]}>
        QAU ISLAMABAD
      </Text>
    </View>
  );
}
