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

  // const Login = async () => {
  //   await instance
  //     .get(`${IP}/hostel/${user}`)
  //     .then(function (response) {
  //       if (response.data.length == 0) alert("Please Register....");
  //       else if (
  //         response.data[0].cnic == user &&
  //         response.data[0].password == password
  //       ) {
  //         setUserP(user, "Hostel Supervisor");
  //         setShow(false);
  //       } else alert("Invalid Password");
  //     })
  //     .catch(function (error) {
  //       alert(error.message.toString());
  //     });
  // };
  // const SignUp = async () => {
  //   const payloadset = {
  //     user,
  //     password,
  //   };
  //   await instance
  //     .patch(`${IP}/hostelRegister`, payloadset)
  //     .then(function (response) {
  //       let msg = response.data;
  //       Alert.alert("SignUp", msg, [{ text: "OK" }]);
  //     })
  //     .catch(function (error) {
  //       alert(error.message.toString());
  //     });
  // };

  // const modaL = () => {
  //   return (
  //     <Modal animationType="slide" transparent={false} visible={show}>
  //       <View
  //         style={[loginStyles.loginContainer, { backgroundColor: bgColor }]}
  //       >
  //         <View style={{ flex: 1, backgroundColor: hColor }}>
  //           <Header />
  //         </View>
  //         <ScrollView>
  //           <View style={loginStyles.textinputs}>
  //             <Text style={[loginStyles.loginSignUpText,{fontFamily:font_Family}]}>
  //               Login/SignUp for further process
  //             </Text>

  //             <TextInput
  //               style={loginStyles.inputs}
  //               label="CNIC"
  //               mode="outlined"
  //               keyboardType="number-pad"
  //               maxLength={13}
  //               value={user}
  //               onChangeText={(text) => setUser(text)}
  //               activeOutlineColor="green"
  //             />

  //             <TextInput
  //               style={loginStyles.inputs}
  //               label="Password"
  //               mode="outlined"
  //               value={password}
  //               onChangeText={(text) => setpassword(text)}
  //               maxLength={20}
  //               activeOutlineColor="green"
  //               secureTextEntry={true}
  //             />
  //             <View style={{ flexDirection: "row" }}>
  //               <TouchableOpacity
  //                 style={[loginStyles.button, { backgroundColor: "#414FCA" }]}
  //                 onPress={() => {
  //                   SignUp();
  //                 }}
  //               >
  //                 <Text style={[loginStyles.buttonText,{fontFamily:font_Family}]}>SignUp</Text>
  //               </TouchableOpacity>
  //               <TouchableOpacity
  //                 style={loginStyles.button}
  //                 onPress={() => {
  //                   Login();
  //                 }}
  //               >
  //                 <Text style={[loginStyles.buttonText,{fontFamily:font_Family}]}>Login</Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //           <View>
  //             <TouchableOpacity
  //               style={loginStyles.backbutton}
  //               onPress={() => {
  //                 setShow(false);
  //                 navigation.goBack();
  //               }}
  //             >
  //               <Icon name="arrow-left" color="black" size={30} />
  //               <Text style={[loginStyles.backbuttonText,{fontFamily:font_Family}]}>Go Back</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </ScrollView>
  //       </View>
  //     </Modal>
  //   );
  // };
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
