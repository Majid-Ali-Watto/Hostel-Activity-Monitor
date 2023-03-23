import React from "react";
import SList from "./search_list";
import { StyleSheet, SafeAreaView } from "react-native";
import { getBGcolor } from "../Constants/BG_Color";
export default function MarkAttendance({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getBGcolor() }]}>
      <SList navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
});
