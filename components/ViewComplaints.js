import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Card, TextInput } from "react-native-paper";
import IP from "../Constants/NetworkIP";
import ColorsContext from "../ContextAPI/ColorsContext";
import Icon from "react-native-vector-icons/FontAwesome5";

// import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
const instance = axios.create();
import compStatuses from "../Constants/compStatuses";
import { getUserP } from "../ContextAPI/userContext";
import { styles } from "../assets/styles/viewcomplaints";
import { HEIGHT } from "../Constants/GlobalWidthHeight";
 function ViewComplaints() {
  const [user, setUser] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { bgColor, cardsColor, font_Family } = React.useContext(ColorsContext);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComplaints = async () => {
    try {
      const { data } = await instance.get(`${IP}/allComplaints`);
      let comps = [];
      data.map((item) => {
        if (item.complainer == getUserP()) comps.unshift(item);
        else comps.push(item);
      });
      setComplaints(comps);
    } catch (error) {
      alert(error.message.toString());
    }
  };

  useEffect(() => {
    fetchComplaints();
    setUser(getUserP());
  }, []);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchComplaints();
    setRefreshing(false);
  });

  const filteredComplaints = complaints.filter((complaint) => {
    switch (true) {
      case complaint.title.toLowerCase().includes(searchTerm.toLowerCase()):
      case complaint.id.includes(searchTerm):
      case complaint.complainer.includes(searchTerm):
      case complaint.body.includes(searchTerm.toLowerCase()):
        return true;
      default:
        return false;
    }
  });

  const handleDeletePress = (complaintId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to proceed?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await instance
              .delete(`${IP}/removeComp/${complaintId}`)
              .then(function (response) {
                if (response.data == "Complaint deleted")
                  setComplaints(
                    complaints.filter(
                      (complaint) => complaint.id !== complaintId
                    )
                  );
                else if (response.data == "Complaint not deleted") {
                  alert("Complaint not deleted");
                }
              })
              .catch(function (error) {
                alert(error.message.toString());
              });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handleComplaintPress = (complaint) => {
    setSelectedComplaint(complaint);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={{ width: "100%" }}>
        <TextInput
          placeholder="Search complaints"
          placeholderTextColor="silver"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          style={styles.searchBar}
        />
      </View>

      <Text style={styles.divider}></Text>
      <View style={styles.compCountSec}>
        <Text style={[styles.compCount, { fontFamily: font_Family }]}>
          Total: {filteredComplaints.length}
        </Text>
      </View>

      <View style={{ flex: 1, backgroundColor: bgColor }}>
        <FlatList
          data={filteredComplaints}
          renderItem={({ item }) => (
            <Card
              style={[
                styles.complaintContainer,
                { backgroundColor: cardsColor },
              ]}
            >
              <TouchableOpacity onPress={() => handleComplaintPress(item)}>
                {/* <View style={styles.complaintTitle}> */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontFamily: font_Family,
                  }}
                >
                  <Text
                    style={[styles.complaintTit, { fontFamily: font_Family }]}
                  >
                    {item.title}
                  </Text>

                  {item.complainer == getUserP() && (
                    <Icon
                      name="trash"
                      color="red"
                      size={20}
                      onPress={() => {
                        handleDeletePress(item.id);
                      }}
                    />
                  )}
                </View>
                <Text style={styles.divider}></Text>
                <Text style={[styles.id, { fontFamily: font_Family }]}>
                  ComplaintId:{item.id}
                </Text>
                <Text style={[styles.complainer, { fontFamily: font_Family }]}>
                  Complainer:{item.complainer}
                </Text>
                {/* </View> */}
              </TouchableOpacity>
            </Card>
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={[styles.complaintsList, { backgroundColor: bgColor }]}
        />
      </View>
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedComplaint && (
          <View style={[styles.modalContainer, { backgroundColor: bgColor }]}>
            <Text style={[styles.modalTitle, { fontFamily: font_Family }]}>
              {selectedComplaint.title}
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  width: "100%",
                  height: "7%",
                  fontSize: 13,
                  fontFamily: font_Family,
                }}
              >
                Complaint ID: {selectedComplaint.id} | Complaint By :{" "}
                {selectedComplaint.complainer}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  marginTop: 10,
                  fontSize: HEIGHT * 0.027,
                  fontFamily: font_Family,
                }}
              >
                Description
              </Text>
              <ScrollView>
                <Text
                  style={[styles.modalDescription, { fontFamily: font_Family }]}
                >
                  {selectedComplaint.body}
                </Text>
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={[
                  styles.modalCloseButtonText,
                  { fontFamily: font_Family },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
}
export default React.memo(ViewComplaints)
