import React, { useState, useEffect } from "react";
import IP from "../Constants/NetworkIP";
import Header from "./Header";
import axios from "axios";
const instance = axios.create();
import { TextInput } from "react-native-paper";
import { setUserP } from "../ContextAPI/userContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "../assets/styles/viewstudentdata";
import SList from "./search_list";
import { loginStyles } from "../assets/styles/login";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
} from "react-native";
import ColorsContext from "../ContextAPI/ColorsContext";

export default function StudentData({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(true);
  const { bgColor, hColor, font_Family } = React.useContext(ColorsContext);

  const Login = async () => {
    await instance
      .get(`${IP}/hostel/${user}`)
      .then(function (response) {
        if (response.data.length == 0) alert("Please Register....");
        else if (
          response.data[0].cnic == user &&
          response.data[0].password == password
        ) {
          setUserP(user, "Hostel Supervisor");
          setShow(false);
        } else alert("Invalid Password");
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };
  const SignUp = async () => {
    const payloadset = {
      user,
      password,
    };
    await instance
      .patch(`${IP}/hostelRegister`, payloadset)
      .then(function (response) {
        let msg = response.data;
        Alert.alert("SignUp", msg, [{ text: "OK" }]);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };

  const modaL = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={show}>
        <View
          style={[loginStyles.loginContainer, { backgroundColor: bgColor }]}
        >
          <View style={{ flex: 1, backgroundColor: hColor }}>
            <Header />
          </View>
          <ScrollView>
            <View style={loginStyles.textinputs}>
              <Text style={[loginStyles.loginSignUpText,{fontFamily:font_Family}]}>
                Login/SignUp for further process
              </Text>

              <TextInput
                style={loginStyles.inputs}
                label="CNIC"
                mode="outlined"
                keyboardType="number-pad"
                maxLength={13}
                value={user}
                onChangeText={(text) => setUser(text)}
                activeOutlineColor="green"
              />

              <TextInput
                style={loginStyles.inputs}
                label="Password"
                mode="outlined"
                value={password}
                onChangeText={(text) => setpassword(text)}
                maxLength={20}
                activeOutlineColor="green"
                secureTextEntry={true}
              />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[loginStyles.button, { backgroundColor: "#414FCA" }]}
                  onPress={() => {
                    SignUp();
                  }}
                >
                  <Text style={[loginStyles.buttonText,{fontFamily:font_Family}]}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={loginStyles.button}
                  onPress={() => {
                    Login();
                  }}
                >
                  <Text style={[loginStyles.buttonText,{fontFamily:font_Family}]}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={loginStyles.backbutton}
                onPress={() => {
                  setShow(false);
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-left" color="black" size={30} />
                <Text style={[loginStyles.backbuttonText,{fontFamily:font_Family}]}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {modaL()}
      {!show && <SList navigation={navigation} />}
    </SafeAreaView>
  );
}
