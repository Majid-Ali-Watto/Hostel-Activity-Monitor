import React, { useEffect, useState } from "react";
import { TextInput, Button, ScrollView, Alert } from "react-native";

import axios from "axios";
const instance = axios.create();
import IP from "../Constants/NetworkIP";
import { getUserP } from "../ContextAPI/userContext";
import { styles } from "../assets/styles/registercomplaints";
import { getBGcolor } from "../Constants/BG_Color";
import { ColorsContext } from "../App";
export default function RegisterComplaints(props) {
  const [text, setText] = useState("");
  const [textArea, setTextArea] = useState("");
  const [user, setUser] = useState("");
  const { bgColor, setBgColor, cardsColor } = React.useContext(ColorsContext);

  const postComplaint = async () => {
    if (text.length == 0) {
      alert("Please enter complaint title");
      return;
    }
    if (textArea.length == 0) {
      alert("Please enter complaint body");
      return;
    }
    let id = Math.floor(Math.random() * 10000); // Returns a random integer from 0 to 10000:

    await instance
      .post(`${IP}/postComplaints`, {
        title: text.toLowerCase(),
        body: textArea.toLowerCase(),
        id,
        user,
      })
      .then(function (response) {
        let msg =
          response.data.rowCount > 0
            ? `Complaint with ID ${id} registered sucessfully`
            : "Complaint not registered sucessfully";
        Alert.alert("Complaint", msg, [{ text: "OK" }]);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };
  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleTextAreaChange = (newTextArea) => {
    setTextArea(newTextArea);
  };

  useEffect(() => {
    setUser(getUserP());
  }, []);
  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <TextInput
        maxLength={50}
        placeholder="Enter Complaint Title"
        onChangeText={handleTextChange}
        value={text}
        style={styles.textInput}
      />
      <TextInput
        multiline={true}
        placeholder="Enter Your Complaint Here"
        onChangeText={handleTextAreaChange}
        value={textArea}
        style={styles.complaintBody}
      />

      <Button title="Submit" onPress={postComplaint} />
    </ScrollView>
  );
}
