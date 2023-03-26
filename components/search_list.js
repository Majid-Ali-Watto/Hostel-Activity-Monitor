import React, { useState, useEffect } from "react";
import axios from "axios";
import IP from "../Constants/NetworkIP";
const instance = axios.create();
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "../assets/styles/search_lists";
import { getUserRole } from "../ContextAPI/userContext";
import { Card, Searchbar, Divider, Modal, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBGcolor } from "../Constants/BG_Color";
import { HEIGHT, WIDTH } from "../Constants/GlobalWidthHeight";
import { dishUnits } from "../Constants/dishUnits";
import { useContext } from "react";
import { ColorsContext } from "../App";
export default function SList(props) {
  const navigation = props.navigation;
  const [names, setNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sem, setSem] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [profile, showProfile] = useState(false);
  const [tab, setTab] = useState();
  const [uri, setUri] = useState([]);
  const [units, setUnits] = useState("");
  const { bgColor, cardsColor } = useContext(ColorsContext);

  let labels = [
    // 'Name',
    "Reg No.",
    "Dept",
    "Program",
    "Semester",
    "Fee Status",
    "Fee",
  ];
  let data = [
    // 'Majid Ali',
    "04071813051",
    "Department of Computer Sciences Quaid I Azam University",
    "BS",
    "9th",
    "Pending",
    "Rs. 35000",
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
    let today = new Date();
    let time = today.getHours();
    let session = "";
    if (time >= 3 && time <= 10) {
      session = "Morning";
    }
    if (time >= 18 && time <= 22) {
      session = "Evening";
    }
    if (session.length == 0) {
      alert("Not suitable mess timing");
      return;
    }
    await instance
      .get(`${IP}/todayMenu/${session}`)
      .then(function (response) {
        for (let d of response.data) {
          if (id == d.daydate) {
            let p = (d.price * d.units).toFixed(2);
            let payloadset = {
              price: p,
              date: d.daydate,
              rollno: rollno,
              time: session,
            };
            saveAttendance(payloadset);
          } else {
            Alert.alert("Menu", "Today's Menu was not added", [{ text: "OK" }]);
          }
        }
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };

  const handleAttendance = async (rollno) => {
    if (rollno.length < 11) {
      alert("RegNo is invalid");
      return;
    }
    fetchMenu(new Date().toString().slice(0, 15), rollno);
  };

  const fetchNames = async () => {
    await instance
      .get(`${IP}/students`)
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
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    const payloadset = {
      rollno,
      sem,
      exen,
      dateTime,
    };
    saveExitEntry(payloadset);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.searchbar}>
        <TextInput
          placeholder="Search Student"
          placeholderTextColor="silver"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          style={styles.searchInput}
        />
        {/* <Searchbar
          style={styles.searchInput}
          placeholder="Search Student"
          placeholderTextColor="silver"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          
        /> */}
        {/* <TextBox
          placeholder="Enter Name"
          placeholderColor="silver"
          style={styles.searchInput}
          iconColor="silver"
          borderRadius={50}
          maxLength={11}
          minLength={5}
          value={searchTerm}
          setValue={setSearchTerm}
        /> */}
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
          <Text style={styles.ButtonText}>Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNamesPress(searchTerm, "Exit")}
        >
          <Text style={styles.ButtonText}>Exit</Text>
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
          <Text style={styles.ButtonText}>Mark Attendance</Text>
        </TouchableOpacity>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.home}>
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
                  item.status == false ? "Pending" : "Paid",
                  "Rs. " + item.hostelfee,
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
                    <Text style={styles.title}>{item.sname}</Text>
                    <Text style={styles.rollno}>{item.rollno}</Text>
                    <Text style={styles.rollno}>{item.cnic}</Text>
                  </View>
                  <View>
                    <Text style={styles.program}>{item.program}</Text>
                    <Text style={styles.semno}>{item.semno}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.department}>{item.dname}</Text>
              </View>
            </Card>
          )}
          keyExtractor={(item) => item.rollno}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <Modal
          animationType="none"
          transparent={false}
          visible={profile}
          // onRequestClose={() => setModalVisible(false)}
        >
          <View style={stylesn.containerMain}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Icon
                name="times"
                color="black"
                size={40}
                onPress={() => {
                  showProfile(false);
                }}
              />
            </View>
            <View
              style={{
                display:
                  getUserRole() == "Security Supervisor" ? "flex" : "none",
              }}
            >
              <Image
                source={{ uri: uri[1] }}
                style={{ width: "90%", height: "90%", margin: 10 }}
              />
            </View>
            <View
              style={{
                display:
                  getUserRole() != "Security Supervisor" ? "flex" : "none",
              }}
            >
              {uri && (
                <View style={stylesn.container}>
                  <Card style={[stylesn.card, { backgroundColor: cardsColor }]}>
                    <View style={stylesn.imageSec}>
                      <Text style={stylesn.header}>{uri[0]}</Text>
                      <Image source={{ uri: uri[1] }} style={stylesn.img} />
                    </View>

                    <Text style={stylesn.divider}></Text>
                    {labels.map((l, index) => {
                      return (
                        <View>
                          <View style={stylesn.row}>
                            <Text style={stylesn.label}> {l}</Text>
                            <Text style={stylesn.value}> {uri[index + 2]}</Text>
                          </View>
                          <View style={stylesn.dividerInner}></View>
                        </View>
                      );
                    })}
                  </Card>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
const stylesn = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
  containerMain: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    // height: "100%",
    elevation: 20,
    margin: 1,
  },
  header: {
    margin: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'lightgray'
  },
  imageSec: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: 60,
    height: 60,
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
});
