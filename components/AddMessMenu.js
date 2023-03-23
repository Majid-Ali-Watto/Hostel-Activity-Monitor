import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IP from "../Constants/NetworkIP";
import axios from "axios";
const instance = axios.create();
import { styles } from "../assets/styles/addmessmenu";
import { TextInput, RadioButton } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { dishUnits } from "../Constants/dishUnits";
import { getBGcolor } from "../Constants/BG_Color";
export default function AddMessMenu() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("");
  const [time, setTime] = useState("");
  const data = [
    {
      label: "Morning",
    },
    {
      label: "Evening",
    },
  ];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (d) => {
    setDate(d);
    hideDatePicker();
  };

  const addMenu = async () => {
    const payloadset = {
      dishName: name,
      dishPrice: price,
      date: date.toString().slice(0, 15),
      units: units,
      time: time,
    };
    await instance
      .post(`${IP}/addMenu`, payloadset)
      .then(function (response) {
        let msg =
          response.data.rowCount > 0
            ? `Dish added sucessfully`
            : "Dish not added sucessfully";
        Alert.alert("Dish", msg, [{ text: "OK" }]);
      })
      .catch(function (error) {
        alert(error.message.toString());
      });
  };
  return (
    <View style={[styles.container, { backgroundColor: getBGcolor() }]}>
      <Text style={styles.addMenuHeader}>Add Mess Menu</Text>
      <ScrollView>
        <View style={styles.textinputs}>
          <TextInput
            style={styles.inputs}
            label="Dish Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
            keyboardType="ascii-capable"
            maxLength={100}
            activeOutlineColor="green"
          />

          <TextInput
            style={styles.inputs}
            label="Unit Price"
            mode="outlined"
            maxLength={5}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            activeOutlineColor="green"
            textColor="black"
          />
          <View style={styles.dateContainer}>
            <TextInput
              style={styles.dayDate}
              label="Day/Date"
              mode="outlined"
              value={date.toString().slice(0, 15)}
              editable={false}
              activeOutlineColor="green"
            />
            <TouchableOpacity onPress={showDatePicker} style={styles.select}>
              <Text style={styles.selectText}>Select</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dishUnitContainer}>
            <Text style={[styles.dishUnitLabel,{fontFamily: 'monospace'}]}>Select Dish Units</Text>
            <SelectList
              setSelected={(val) => setUnits(val)}
              data={dishUnits}
              save="value"
              search={false}
              maxHeight={150}
              boxStyles={{
                borderRadius: 5,
                height: 43,
                width: 100,
                backgroundColor: "white",
                position: "relative",
                // right: -22,
              }} //override default styles
              dropdownStyles={{ backgroundColor: "white" }}
              defaultOption={dishUnits[0]}
            />
          </View>
          <Text style={styles.radiobuttonLabel}>Select Mess Shift</Text>
          <RadioButton.Group
            onValueChange={(newValue) => {
              setTime(newValue);
            }}
            value={time}
          >
            <View style={styles.radioButtonContainer}>
              {data.map((d) => {
                return (
                  <View key={d.label} style={styles.radioButton}>
                    <Text>{d.label}</Text>
                    <RadioButton value={d.label} />
                  </View>
                );
              })}
            </View>
          </RadioButton.Group>
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          <View style={styles.addDishContainer}>
            <TouchableOpacity style={styles.button} onPress={addMenu}>
              <Text style={styles.buttonText}>Add Dish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
