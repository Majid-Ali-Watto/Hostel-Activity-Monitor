import React, { useState } from "react";
import SList from "./search_list";
import { styles } from "../assets/styles/securitysection";
import { View, SafeAreaView } from "react-native";
import LoginOrSignUp from "./generic_components/Login";
export default function SecuritySection({ navigation }) {
  const [user, setUser] = useState("");
  const [hideLogin, setHideLogin] = useState("none");
  const [showLogin, setShowLogin] = useState("flex");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, display: showLogin }}>
        <LoginOrSignUp
          navigation={navigation}
          userData={["security", "CNIC", 13, "Security Supervisor"]}
          hideLogin={setHideLogin}
          showLogin={setShowLogin}
          setUserData={setUser}
        />
      </View>
      <View style={{ flex: 1, display: hideLogin }}>
        {hideLogin == "flex" && <SList navigation={navigation} />}
      </View>
    </SafeAreaView>
  );
}
