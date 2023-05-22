import  { useState } from "react";
import { styles } from "../assets/styles/viewstudentdatamess";
import { View, SafeAreaView } from "react-native";
import SList from "./search_list";
import LoginOrSignUp from "../components/generic_components/Login";

export default function ViewStudentDataMess({ navigation }) {
  const [, setUser] = useState("");
  const [hideLogin, setHideLogin] = useState("none");
  const [showLogin, setShowLogin] = useState("flex");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, display: showLogin }}>
        <LoginOrSignUp
          navigation={navigation}
          userData={["mess", "CNIC", 13, "Mess Supervisor"]}
          hideLogin={setHideLogin}
          showLogin={setShowLogin}
          setUserData={setUser}
        />
      </View>
      <View style={{ flex: 1, display: hideLogin }}>
        {hideLogin == "flex" && <SList navigation={navigation} userRole={'Mess Supervisor'} />}
      </View>
    </SafeAreaView>
  );
}
