import React, { useCallback, useMemo, useState } from "react";
import { setUserP } from "../../ContextAPI/userContext";
import { loginStyles } from "../../assets/styles/login";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  View,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import {TextInput } from "react-native-paper";
import Header from "../Header";
import axios from "axios";
import IP from "../../Constants/NetworkIP";
import ColorsContext from "../../ContextAPI/ColorsContext";
const instance = axios.create();
const LoginOrSignUp = (props) => {

    const [show, setShow] = useState(true);
    const [user, setUser] = useState("");
    const [password, setpassword] = useState("");
    const { bgColor, hColor, font_Family } = React.useContext(ColorsContext);
    const navigation=props.navigation
    const Login = async () => {
      const endPoint=props.userData[0]=='students'?'studLogin':props.userData[0]
      console.log('end',endPoint);
        await instance
          .get(`${IP}/${endPoint}/${user}`)
          .then(function (response) {
            if (response.data.length == 0) alert("Please Register....");
            else{
               const userN= props.userData[0]=='students'?response.data[0].rollno : response.data[0].cnic
               if (
                    userN == user &&
                 response.data[0].password== password
                ) {
                setShow(false);
                props.hideLogin('flex')
                props.showLogin('none')
                props.setUserData(user)
                 setUserP(user,props.userData[3]);
                } else alert("Invalid Password");
            }
            
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
    
        let regUser=''
        if(props.userData[0]=='students') regUser = 'studRegister'
        else if(props.userData[0]=='hostel') regUser ='hostelRegister'
        else if(props.userData[0]=='mess') regUser ='messRegister'
        else if(props.userData[0]=='security') regUser ='securityRegister'
        await instance
          .patch(`${IP}/${regUser}`, payloadset)
          .then(function (response) {
            console.log(response.data);
            let msg =
              response.data.rowCount > 0
                ? `User Registered Sucessfully`
                : "Unable to Register";
            Alert.alert("SignUp", msg, [{ text: "OK" }]);
          })
          .catch(function (error) {
            alert(error.message.toString());
          });
      };
      const setReg=useCallback((text) => setUser(text),[user.length==11])
    return (
      <Modal animationType="slide"
       transparent={false}
       statusBarTranslucent={true}
       visible={show}>
        <View
          style={[loginStyles.loginContainer, { backgroundColor: bgColor }]}
        >
          <View style={{ flex: 1, backgroundColor: hColor }}>
            <Header />
          </View>
          <ScrollView>
            <View style={loginStyles.textinputs}>
              <Text style={[loginStyles.loginSignUpText,{fontFamily:font_Family}]}>
                Login/SignUp for further process {props.userData[0]}
              </Text>

              <TextInput
                style={loginStyles.inputs}
                label={props.userData[1]}
                mode="outlined"
                keyboardType="number-pad"
                maxLength={props.userData[2]}
                value={user}
                onChangeText={(text)=>setReg(text)}
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
  export default React.memo(LoginOrSignUp)