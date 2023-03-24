import React, { useState } from "react";
import ViewFeesChild from "./ViewFeeschild";
import { setUserP } from "../ContextAPI/userContext";
import { styles } from "../assets/styles/viewallfees";
import { loginStyles } from "../assets/styles/login";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  View,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Divider, TextInput } from "react-native-paper";
import Header from "./Header";
import axios from "axios";
import IP from "../Constants/NetworkIP";
import { getBGcolor } from "../Constants/BG_Color";
import { ColorsContext } from "../App";

const instance = axios.create();
export default function ViewAllFees({ navigation }) {
  const [modal, viewModal] = useState(false);
  const [show, setShow] = useState(true);
  const [modalSem, viewModalSem] = useState(false);
  const [title, setTitle] = useState("");
  const [titleSem, setTitleSem] = useState("");
  const [user, setUser] = useState("");
  const [password, setpassword] = useState("");
  const [ee, setEE] = useState([]);
  const [feee, setFeee] = useState("");
  const { bgColor, hColor, cardsColor } = React.useContext(ColorsContext);

  const [Semester, setSemester] = useState([
    { Semester: "1st", paid: "Pending Fees Status", fee: 0 },
    { Semester: "2nd", paid: "Pending Fees Status", fee: 0 },
    { Semester: "3rd", paid: "Pending Fees Status", fee: 0 },
    { Semester: "4th", paid: "Pending Fees Status", fee: 0 },
    { Semester: "5th", paid: "Pending Fees Status", fee: 0 },
    { Semester: "6th", paid: "Pending Fees Status", fee: 0 },
    { Semester: "7th", paid: "Pending Fees Status", fee: 0 },
    { Semester: "8th", paid: "Pending Fees Status", fee: 0 },
    { Semester: "9th", paid: "Pending Fees Status", fee: 0 },
    { Semester: "10th", paid: "Pending Fees Status", fee: 0 },
    { Semester: "11th", paid: "Pending Fees Status", fee: 0 },
    { Semester: "12th", paid: "Pending Fees Status", fee: 0 },
  ]);
  const getDataEE = async (u, s) => {
    setEE([]);
    const user = {
      rollno: u,
      sems: s,
    };
    await instance
      .post(`${IP}/getExitEntry`, user)
      .then(function (response) {
        if (response.data.length == 0) {
          alert("No data found....");
          viewModalSem(true);
          viewModal(false);
        } else setEE(response.data);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };
  const getFees = async (u) => {
    setEE([]);
    let sem = [];
    const user = {
      rollno: u,
    };
    await instance
      .post(`${IP}/getHostelFee`, user)
      .then(function (response) {
        if (response.data.length == 0) {
          alert("No data found....");
          viewModalSem(true);
          viewModal(false);
        } else {
          response.data.map((fee, index) => {
            if (fee.status == true) {
              sem.push({
                Semester: fee.semno,
                paid: "All Paid Fees Status",
                fee: fee.hostelfee,
              });
            } else if (fee.status == false) {
              sem.push({
                Semester: fee.semno,
                paid: "Pending Fees Status",
                fee: fee.hostelfee,
              });
            }
          });
        }

        setSemester(sem);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };
  const Login = async () => {
    await instance
      .get(`${IP}/students/${user}`)
      .then(function (response) {
        if (response.data.length == 0) alert("Please Register....");
        else if (
          response.data[0].rollno == user &&
          response.data[0].password == password
        ) {
          setShow(false);
          setUserP(user);
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
      .patch(`${IP}/studRegister`, payloadset)
      .then(function (response) {
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

  const modaL = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        // onRequestClose={() => setShow(false)}
      >
        <View
          style={[loginStyles.loginContainer, { backgroundColor: bgColor }]}
        >
          <View style={{ flex: 1, backgroundColor: hColor }}>
            <Header />
          </View>
          <ScrollView>
            <View style={loginStyles.textinputs}>
              <Text style={loginStyles.loginSignUpText}>
                Login/SignUp for further process
              </Text>

              <TextInput
                style={loginStyles.inputs}
                label="RegNo"
                mode="outlined"
                keyboardType="number-pad"
                maxLength={11}
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
                  <Text style={loginStyles.buttonText}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={loginStyles.button}
                  onPress={() => {
                    Login();
                  }}
                >
                  <Text style={loginStyles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={loginStyles.backbutton}
                onPress={() => {
                  // setShow(false);
                  // setTimeout(() => {
                  //   navigation.goBack();
                  // }, 100);
                  setShow(false);
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-left" color="black" size={30} />
                <Text style={loginStyles.backbuttonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.mainView, { backgroundColor: bgColor }]}>
      {/* callig login/signup modal */}
      {modaL()}
      {/*  */}
      <Modal animationType="slide" transparent={true} visible={modalSem}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalText}>{titleSem}</Text>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                RegNo: {user}
              </Text>
              {title == "Entry Exit Status" ? (
                ee.map((e) => {
                  return (
                    <View key={e.datetime + e.status}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ margin: 10 }}>{e.datetime}</Text>
                        <Text style={{ margin: 10 }}>{e.status}</Text>
                      </View>
                      <Divider />
                    </View>
                  );
                })
              ) : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  {feee}
                </Text>
              )}
            </ScrollView>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  viewModal(true);
                  viewModalSem(!modalSem);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <ScrollView>
              {Semester.map((s) => {
                if (title == s.paid || title == "Entry Exit Status") {
                  let tit = "Semester-" + s.Semester;
                  return (
                    <Text
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "lightgreen",
                        padding: 10,
                        margin: 10,
                      }}
                      onPress={() => {
                        viewModal(false);
                        setTitleSem(tit);
                        viewModalSem(true);
                        if (title == "Entry Exit Status")
                          getDataEE(user, s.Semester);
                        else {
                          setFeee(s.fee);
                        }
                      }}
                      key={s.Semester}
                    >
                      Semester-{s.Semester}
                    </Text>
                  );
                }
              })}
            </ScrollView>
            <View style={{ justifyContent: "center", width: "100%" }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => viewModal(!modal)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.childViews}
          onPress={() => {
            getFees(user);
            setTitle("All Paid Fees Status");
            viewModal(!modal);
          }}
        >
          <ViewFeesChild title="Fees Paid Status" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.childViews}
          onPress={() => {
            getFees(user);
            setTitle("Pending Fees Status");
            viewModal(!modal);
          }}
        >
          <ViewFeesChild title="Pending Fees Status" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.childViews}
          onPress={() => {
            setTitle("Entry Exit Status");
            viewModal(!modal);
          }}
        >
          <ViewFeesChild title="Entry Exit Status" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
