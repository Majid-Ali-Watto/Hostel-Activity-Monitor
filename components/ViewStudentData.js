import React, { useState } from "react";


import { styles } from "../assets/styles/viewstudentdata";
import SList from "./search_list";
import {
  View,

  SafeAreaView,
} from "react-native";
import LoginOrSignUp from "../components/generic_components/Login";

export default function StudentData({ navigation }) {
  const [user, setUser] = useState("");
  const [hideLogin, setHideLogin] = useState("none");
  const [showLogin, setShowLogin] = useState("flex");

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ flex: 1, display: showLogin }}>
      <LoginOrSignUp
        navigation={navigation}
        userData={["hostel", "CNIC", 13, "Hostel Supervisor"]}
        hideLogin={setHideLogin}
        showLogin={setShowLogin}
        setUserData={setUser}
      />
    </View>
    <View style={{ flex: 1, display: hideLogin }}>
      {hideLogin == "flex" && <SList navigation={navigation} userRole={'Hostel Supervisor'}/>}
    </View>
  </SafeAreaView>
  );
}
