import React from "react";
import SList from "./search_list";
import { StyleSheet, SafeAreaView } from "react-native";
export default function MarkAttendance({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <SList navigation={navigation} screen='Mark Attendance' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
});
