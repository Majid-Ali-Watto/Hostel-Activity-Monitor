import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import IP from "../Constants/NetworkIP";
import { ColorsContext } from "../App";

// import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
const instance = axios.create();
import compStatuses from "../Constants/compStatuses";
import { getUserP } from "../ContextAPI/userContext";
import { styles } from "../assets/styles/viewcomplaints";
import { getBGcolor } from "../Constants/BG_Color";
import TextBox from "./generic_components/textbox";
export default function ViewComplaints() {
  const [user, setUser] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { bgColor, cardsColor } = React.useContext(ColorsContext);

  const fetchComplaints = async () => {
    await instance
      .get(`${IP}/allComplaints`)
      .then(function (response) {
        setComplaints(response.data);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };

  useEffect(() => {
    fetchComplaints();
    setUser(getUserP());
  }, []);

  const filteredComplaints = complaints.filter((complaint) => {
    if (complaint.title.toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
    else if (complaint.id.includes(searchTerm)) return true;
    else if (complaint.complainer.includes(searchTerm)) return true;
    else if (complaint.body.includes(searchTerm.toLowerCase())) return true;
  });
  const handleDeletePress = (complaintId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to proceed?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            setComplaints(
              complaints.filter((complaint) => complaint.id !== complaintId)
            );
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
      {/* <View style={{ flex: 1 }}> */}
      {/* <TextBox
        placeholder="Search complaints"
        placeholderColor="silver"
        style={styles.searchInput}
        iconColor="silver"
        borderRadius={50}
        maxLength={11}
        minLength={5}
        value={searchTerm}
        setValue={setSearchTerm}
      /> */}
      {/* </View> */}
      <Text style={styles.divider}></Text>
      <View style={styles.compCountSec}>
        <Text style={styles.compCount}>Total: {filteredComplaints.length}</Text>
      </View>

      <View style={{ marginBottom: 30, flex: 2 }}>
        <FlatList
          data={filteredComplaints}
          renderItem={({ item }) => (
            <View
              style={[
                styles.complaintContainer,
                { backgroundColor: cardsColor },
              ]}
            >
              <TouchableOpacity onPress={() => handleComplaintPress(item)}>
                <View style={styles.complaintTitle}>
                  <Text style={styles.complaintTit}>{item.title}</Text>
                  <Text style={styles.divider}></Text>
                  <Text style={styles.id}>ComplaintId:{item.id}</Text>
                  <Text style={styles.complainer}>
                    Complainer:{item.complainer}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => handleDeletePress(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity> */}
            </View>
          )}
          keyExtractor={(item) => item.id}
          onEndReached={fetchComplaints}
          style={styles.complaintsList}
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
            <View style={{ flex: 1 }}>
              <Text style={styles.modalTitle}>{selectedComplaint.title}</Text>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={styles.modalDescription}>
                {selectedComplaint.id}
              </Text>
              <Text style={styles.modalDescription}>
                {selectedComplaint.body}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}
