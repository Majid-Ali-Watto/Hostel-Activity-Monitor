import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import IP from "../Constants/NetworkIP";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "../assets/styles/search_lists";
import { getUserRole } from "../ContextAPI/userContext";
import { getUserP } from "../ContextAPI/userContext";
const instance = axios.create();

import {
  Card,
  Divider,
  Modal,
  TextInput,
  FAB,
  Button,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  FlatList,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import MonthYear from "./generic_components/MothsYearPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import ColorsContext from "../ContextAPI/ColorsContext";
import { HEIGHT } from "../Constants/GlobalWidthHeight";

function SList(props) {
  const navigation = props.navigation;
  const [names, setNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sem, setSem] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [profile, showProfile] = useState(false);
  const [showAllStud, setShowAllStud] = useState(
    props.screen == "Mark Attendance"
      ? "none"
      :props.userRole == "Security Supervisor"
      ? "none"
      : "flex"
  );
  const [showRegStud, setShowRegStud] = useState("none");
  const [showAdd, setShowAdd] = useState(false);
  const [tab, setTab] = useState();
  const [uri, setUri] = useState([]);
  const [isDisabled, setIsDisAbled] = useState(false);
  const { bgColor, cardsColor, font_Family } = useContext(ColorsContext);
  const [date, setDate] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());

  let labels = [
    // 'Name',
    "Reg No.",
    "Dept",
    "Program",
    "Semester",
    "Hostel Fee",
    "Mess Fee",
  ];
  useEffect(() => {
    fetchNames();
    const getData = async () => {
      try {
        let value = await AsyncStorage.getItem("tab");
        if (value !== null) {
          setTab(value);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchNames();
    setRefreshing(false);
  });
  const addMessStud = async () => {
    const payloadset = {
      rollno: searchTerm,
    };
    await axios
      .post(`${IP}/saveMessStud`, payloadset)
      .then((response) => {
        alert(response.data);
        setSearchTerm("");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const addHostStud = async () => {
    const payloadset = {
      rollno: searchTerm,
      status: true,
    };
    await axios
      .patch(`${IP}/saveHostStud`, payloadset)
      .then((response) => {
        response.data.rowCount > 0
          ? alert("Student Added")
          : alert("Student not Added");
        setSearchTerm("");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const saveAttendance = async (payloadset) => {
    await instance
      .post(`${IP}/markAttendance`, payloadset)
      .then(function (response) {
        let msg =
          response.data.rowCount > 0
            ? `Attendance Marked Sucessfully`
            : response.data.toString().includes("duplicate key")
            ? "Already, attendance has been marked "
            : "Attendance not Marked Sucessfully";
        Alert.alert("Attendance", msg, [{ text: "OK" }]);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };

  const fetchMenu = async (id, rollno) => {
    const today = new Date();
    const time = today.getHours();
    let session = "";

    if (time >= 2 && time <= 10) {
      session = "Morning";
    } else if (time >= 18 && time <= 22) {
      session = "Evening";
    } else {
      alert("Not suitable mess timing");
      return;
    }

    try {
      const response = await instance.get(`${IP}/todayMenu/${session}`);
      const menu = response.data.find((item) => item.daydate === id);

      if (menu) {
        const price = (menu.price * menu.units).toFixed(2);
        const payloadset = {
          price: `${price}`,
          date: menu.daydate,
          rollno,
          time: session,
        };
        saveAttendance(payloadset);
      } else {
        Alert.alert("Menu", "Today's Menu was not added", [{ text: "OK" }]);
      }
    } catch (error) {
      alert(error.message.toString());
    }
  };

  // const fetchMenu = async (id, rollno) => {
  //   const today = new Date();
  //   const time = today.getHours();
  //   let session = "";
  //   if (time >= 2 && time <= 10) {
  //     session = "Morning";
  //   }
  //   if (time >= 18 && time <= 22) {
  //     session = "Evening";
  //   }
  //   if (session.length == 0) {
  //     alert("Not suitable mess timing");
  //     return;
  //   }
  //   await instance
  //     .get(`${IP}/todayMenu/${session}`)
  //     .then(function (response) {
  //       for (let d of response.data) {
  //         if (id == d.daydate) {
  //           let p = (d.price * d.units).toFixed(2);
  //           let payloadset = {
  //             price: p,
  //             date: d.daydate,
  //             rollno: rollno,
  //             time: session,
  //           };
  //           saveAttendance(payloadset);
  //           break
  //         } else {
  //           Alert.alert("Menu", "Today's Menu was not added", [{ text: "OK" }]);
  //         }
  //       }
  //     })
  //     .catch(function (error) {
  //       alert(error.message.toString());
  //     });
  // };

  const handleAttendance = async (rollno) => {
    if (rollno.length < 11) {
      alert("RegNo is invalid");
      return;
    }
    fetchMenu(new Date().toString().slice(0, 15), rollno);
  };

  const fetchNames = async (option = "none") => {
    // hostelStudents
    const endPoint =
      props.userRole == "Hostel Supervisor" && option == "none"
        ? "hostelStudents"
        : option == "none" && props.userRole == "Mess Supervisor"
        ? "messStudents"
        : "students";

    await instance
      .get(`${IP}/${endPoint}`)
      .then(function (response) {
        setNames(response.data);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };
  const saveExitEntry = async (payloadset) => {
    await instance
      .post(`${IP}/exitentry`, payloadset)
      .then(function (response) {
        let msg =
          response.data.rowCount > 0
            ? `${payloadset.exen} Recorded Sucessfully`
            : "${payloadset.exen} not Recorded Sucessfully";
        Alert.alert("Exit-Entry", msg, [{ text: "OK" }]);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };

  const filteredNames = names.filter((name) => {
    if (name.sname.toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
    else if (name.rollno.includes(searchTerm)) return true;
    else if (name.semno.includes(searchTerm.toLowerCase())) return true;
    else if (name.dname.toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
  });


  const handleNamesPress = async (rollno, exen) => {
    if (rollno.length < 11) {
      alert("RegNo is invalid");
      return;
    }

    const today = new Date();
    const dateTime = today.toLocaleString();
    const payloadset = {
      rollno,
      sem,
      exen,
      dateTime,
      cnic: getUserP(),
    };

    saveExitEntry(payloadset);
  };
  // Define a separate function for rendering each card
  const renderCard = ({ item }) => {
    const {
      sname,
      image,
      rollno,
      dname,
      program,
      semno,
      status,
      hostelfee,
      mStatus,
      messfee,
      cnic,
    } = item;
    const fonts = { fontFamily: font_Family };
    const { titleFont, rollNoFont, programFont, semNoFont, departmentFont } =
      fonts;
    const backgroundColor = { backgroundColor: cardsColor };
    const statusText =
      (status === false ? "Pending" : "Paid") + "-->" + "Rs. " + hostelfee;
    const mStatusText =
      (mStatus === false ? "Pending" : "Paid") + "-->" + "Rs. " + messfee;

    return renderStudentCard(
      rollno,
      cnic,
      backgroundColor,
      setSem,
      semno,
      setSearchTerm,
      setUri,
      sname,
      image,
      dname,
      program,
      statusText,
      mStatusText,
      showProfile,
      titleFont,
      rollNoFont,
      programFont,
      semNoFont,
      departmentFont
    );
  };
  function rerun() {
    return true;
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {rerun()}
      <View style={styles.searchbar}>
        <TextInput
          placeholder="Search Student"
          placeholderTextColor="silver"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          style={styles.searchInput}
        />

        <Icon
          name="qrcode"
          color="black"
          size={40}
          onPress={() => {
            navigation.navigate("QRScanner", { search: setSearchTerm });
          }}
        />
      </View>

      <View
        style={{
          display:
            getUserRole() == "Mess Supervisor" ||
            getUserRole() == "Hostel Supervisor"
              ? "none"
              : "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNamesPress(searchTerm, "Entery")}
        >
          <Text style={[styles.ButtonText, { fontFamily: font_Family }]}>
            Entry
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNamesPress(searchTerm, "Exit")}
        >
          <Text style={[styles.ButtonText, { fontFamily: font_Family }]}>
            Exit
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          display:
            getUserRole() == "Security Supervisor" ||
            getUserRole() == "Hostel Supervisor" ||
            tab == "View Student's Mess Fee"
              ? "none"
              : "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAttendance(searchTerm)}
        >
          <Text style={[styles.ButtonText, { fontFamily: font_Family }]}>
            Mark Attendance
          </Text>
        </TouchableOpacity>
      </View>
      <Divider style={styles.divider} />
      {/* <View style={styles.home}>
         <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredNames}
          renderItem={({ item }) => (
            <Card
              key={item.rollno + item.cnic}
              style={[styles.card, { backgroundColor: cardsColor }]}
              onPress={() => {
                setSem(item.semno);
                setSearchTerm(item.rollno);
              }}
              onLongPress={() => {
                setUri([
                  item.sname,
                  item.image,
                  item.rollno,
                  item.dname,
                  item.program,
                  item.semno,
                  (item.status == false ? "Pending" : "Paid") +
                    "-->" +
                    "Rs. " +
                    item.hostelfee,
                  (item.mStatus == false ? "Pending" : "Paid") +
                    "-->" +
                    "Rs. " +
                    item.messfee,
                ]);
                showProfile(true);
              }}
            >
              <View style={styles.cardsItems}>
                <View>
                  <Image source={{ uri: item.image }} style={styles.img} />
                </View>

                <View style={styles.data}>
                  <View>
                    <Text style={[styles.title, { fontFamily: font_Family }]}>
                      {item.sname}
                    </Text>
                    <Text style={[styles.rollno, { fontFamily: font_Family }]}>
                      {item.rollno}
                    </Text>
                    <Text style={[styles.rollno, { fontFamily: font_Family }]}>
                      {item.cnic}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.program, { fontFamily: font_Family }]}>
                      {item.program}
                    </Text>
                    <Text style={[styles.semno, { fontFamily: font_Family }]}>
                      {item.semno}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={[styles.department, { fontFamily: font_Family }]}>
                  {item.dname}
                </Text>
              </View>
            </Card>
          )}
          keyExtractor={(item) => item.rollno}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />    
      </View> */}
      <View style={styles.home}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredNames}
          renderItem={renderCard}
          keyExtractor={(item) => item.rollno}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      {profile && (
        <Modal
          animationType="fade"
          transparent={false}
          visible={profile}
          // onRequestClose={() => setModalVisible(false)}
        >
          <View style={stylesn.containerMain}>
            <View
              style={{
                display:
                  getUserRole() == "Security Supervisor" ? "flex" : "none",
                flex: 1,
              }}
            >
              <Image
                source={{ uri: uri[1] }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View
              style={{
                display:
                  getUserRole() != "Security Supervisor" ? "flex" : "none",
                flex: 1,
              }}
            >
              {uri && (
                <View style={stylesn.container}>
                  <MonthYear
                    bgColor={cardsColor}
                    iconSize={15}
                    setMonth={setDate}
                    setYear={setYear}
                    width={"100%"}
                  />
                  <Card style={[stylesn.card, { backgroundColor: cardsColor }]}>
                    <View style={stylesn.imageSec}>
                      <Text
                        style={[stylesn.header, { fontFamily: font_Family }]}
                      >
                        {uri[0]}
                      </Text>
                      <Image source={{ uri: uri[1] }} style={stylesn.img} />
                    </View>

                    <Text style={stylesn.divider}></Text>
                    {labels.map((l, index) => {
                      return (
                        <View>
                          <View style={stylesn.row}>
                            <Text
                              style={[
                                stylesn.label,
                                { fontFamily: font_Family },
                              ]}
                            >
                              {l}
                            </Text>
                            <Text
                              style={[
                                stylesn.value,
                                { fontFamily: font_Family },
                              ]}
                            >
                              {uri[index + 2] || 0}
                            </Text>
                          </View>
                          <View style={stylesn.dividerInner}></View>
                        </View>
                      );
                    })}
                  </Card>
                </View>
              )}
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FAB
                icon="close"
                style={stylesn.fab}
                onPress={() => {
                  showProfile(false);
                }}
              />
            </View>
          </View>
        </Modal>
      )}
      {showAdd && (
        <Modal
          animationType="fade"
          transparent={false}
          visible={showAdd}
          // onRequestClose={() => setModalVisible(false)}
        >
          <View style={stylesn.containerMain}>
            <View
              style={{
                flex: 0.3,
                backgroundColor: "white",
                justifyContent: "center",
                padding: 10,
                position: "relative",
                top: HEIGHT * 0.3,
                borderRadius: 20,
              }}
            >
              <View style={{ flex: 0.8 }}>
                <Text
                  style={[stylesn.headerConfirm, { fontFamily: font_Family }]}
                >
                  {getUserRole() == "Mess Supervisor"
                    ? "Student's Mess Confirmation"
                    : "Student's Residence Confirmation"}
                </Text>
                <Divider style={{ padding: 0, margin: 0, height: 1 }} />
                <Text style={{ fontFamily: font_Family }}>
                  Are you sure to register
                  <Text style={{ fontWeight: "bold" }}> '{searchTerm}'</Text> as
                  {getUserRole() == "Mess Supervisor"
                    ? "Mess member?"
                    : " Hostel member and he/she has paid the fee?"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => {
                    setShowAdd(false);
                    setIsDisAbled(false);
                  }}
                  style={{
                    fontFamily: font_Family,
                    backgroundColor: "lightblue",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    setShowAdd(false);
                    setIsDisAbled(false);
                    getUserRole() == "Mess Supervisor"
                      ? addMessStud()
                      : addHostStud();
                  }}
                  style={{ fontFamily: font_Family, backgroundColor: "blue" }}
                >
                  Add
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: showRegStud,
        }}
      >
        <FAB
          icon="plus"
          disabled={isDisabled}
          style={stylesn.fabAdd}
          onPress={() => {
            if (searchTerm != "" && searchTerm.length == 11) {
              setShowAdd(true);
              setIsDisAbled(true);
            } else alert("Enter valid RegNo");
            // addMessStud()
          }}
        />
      </View>
      <View
        style={{
          display: showAllStud,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FAB
          disabled={isDisabled}
          label="All Students"
          style={stylesn.fabStudents}
          onPress={async () => {
            setShowRegStud("flex");
            setShowAllStud("none");
            await fetchNames("flex");
          }}
        />
      </View>
      <View
        style={{
          display: showRegStud,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FAB
          disabled={isDisabled}
          label="Registered Students"
          style={stylesn.fabStudents}
          onPress={async () => {
            setShowRegStud("none");
            setShowAllStud("flex");
            await fetchNames("none");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default React.memo(SList);
const stylesn = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // flex:1,
    // justifyContent: "center",
    // alignItems:'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  containerMain: {
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    paddingLeft: 5,
    paddingRight: 5,
    position: "relative",
    top: -10,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    padding: 5,

    elevation: 20,
    // margin: 1,
  },
  header: {
    margin: 24,
    fontSize: HEIGHT * 0.03,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'lightgray'
  },
  headerConfirm: {
    fontSize: HEIGHT * 0.025,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  imageSec: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: "20%",
    height: "80%",
    margin: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  label: {
    margin: 14,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    width: "30%",
    borderRightWidth: 1,
    borderColor: "silver",
  },
  value: {
    margin: 14,
    marginLeft: 1,
    fontSize: 14,
    textAlign: "left",
    width: "65%",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
  },
  dividerInner: {
    height: 1,
    width: "100%",
    backgroundColor: "lightgray",
  },
  row: {
    flexDirection: "row",
    // backgroundColor: 'lightgreen',

    paddingLeft: 5,
  },
  fabAdd: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "white",
  },
  fabStudents: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "white",
    height: 50,
    // width:120,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

function renderStudentCard(
  rollno,
  cnic,
  backgroundColor,
  setSem,
  semno,
  setSearchTerm,
  setUri,
  sname,
  image,
  dname,
  program,
  statusText,
  mStatusText,
  showProfile,
  titleFont,
  rollNoFont,
  programFont,
  semNoFont,
  departmentFont
) {
  return (
    <Card
      key={rollno + cnic}
      style={[styles.card, backgroundColor]}
      onPress={() => {
        setSem(semno);
        setSearchTerm(rollno);
      }}
      onLongPress={() => {
        setUri([
          sname,
          image,
          rollno,
          dname,
          program,
          semno,
          statusText,
          mStatusText,
        ]);
        showProfile(true);
      }}
    >
      <View style={styles.cardsItems}>
        <View>
          <Image source={{ uri: image }} style={styles.img} />
        </View>

        <View style={styles.data}>
          <View>
            <Text style={[styles.title, titleFont]}>{sname}</Text>
            <Text style={[styles.rollno, rollNoFont]}>{rollno}</Text>
            <Text style={[styles.rollno, rollNoFont]}>{cnic}</Text>
          </View>
          <View>
            <Text style={[styles.program, programFont]}>{program}</Text>
            <Text style={[styles.semno, semNoFont]}>{semno}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.department, departmentFont]}>{dname}</Text>
      </View>
    </Card>
  );
}
