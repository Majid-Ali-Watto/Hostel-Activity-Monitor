import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "../assets/styles/viewmenu";
import { Card, Divider, Searchbar } from "react-native-paper";
import axios from "axios";
import IP from "../Constants/NetworkIP";
import { getBGcolor } from "../Constants/BG_Color";
import { ColorsContext } from "../App";
const instance = axios.create();
// let menu = [];
function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;
  return today;
}

function ItemCard({ item }, cardsColor) {
  return (
    <View>
      <Card style={[styles.card, { backgroundColor: cardsColor }]}>
        <View style={styles.menuDay}>
          <Text style={[styles.day, { fontFamily: "monospace" }]}>
            {item.day}
          </Text>
          <Text style={[styles.day, { fontFamily: "monospace" }]}>
            {item.date}
          </Text>
        </View>

        <Divider />
        {item.hasOwnProperty("Morning") ? (
          <View style={styles.timeStyle}>
            <Text style={{ fontFamily: "monospace" }}>{item.Morning.dish}</Text>
            <Text style={[styles.timeAM, { fontFamily: "monospace" }]}>
              {item.Morning.time}
            </Text>
          </View>
        ) : (
          ""
        )}
        <Divider />
        {item.hasOwnProperty("Morning") ? (
          <View style={styles.timeStyle}>
            <Text style={{ fontFamily: "monospace" }}>
              Rs.{item.Morning.unitPrice}*{item.Morning.units}
            </Text>
            <Text style={[styles.total, { fontFamily: "monospace" }]}>
              Rs. {item.Morning.units * item.Morning.unitPrice}
            </Text>
          </View>
        ) : (
          ""
        )}

        <Divider style={{ backgroundColor: "black" }} />
        {item.hasOwnProperty("Evening") ? (
          <View style={styles.timeStyle}>
            <Text style={{ fontFamily: "monospace" }}>{item.Evening.dish}</Text>
            <Text style={[styles.timePM, { fontFamily: "monospace" }]}>
              {item.Evening.time}
            </Text>
          </View>
        ) : (
          ""
        )}
        <Divider />
        {item.hasOwnProperty("Evening") ? (
          <View style={styles.timeStyle}>
            <Text style={{ fontFamily: "monospace" }}>
              Rs.{item.Evening.unitPrice}*{item.Evening.units}
            </Text>
            <Text style={[styles.total, { fontFamily: "monospace" }]}>
              Rs. {item.Evening.units * item.Evening.unitPrice}
            </Text>
          </View>
        ) : (
          ""
        )}
      </Card>
    </View>
  );
}

export default function ViewMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenu] = useState([]);
  const { bgColor, setBgColor, cardsColor } = React.useContext(ColorsContext);

  let menu = [];
  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await instance.get(`${IP}/getMenu`);
      menu = response.data;
      console.log(menu);
      menu = createObject(response.data);
      setMenu(menu);
      console.log("creted object : ", menus);
    } catch (error) {
      alert(error.message.toString());
    }
  };

  const createObject = () => {
    let arr = [];
    let obj = {};
    for (let i = 0; i < menu.length; i++) {
      const { currDay, fullDate } = getdata(menu[i].daydate);

      if (menu[i + 1] == undefined) {
        let key = menu[i].time;
        let inner = {
          dish: menu[i].name,
          unitPrice: menu[i].price,
          units: menu[i].units,
        };
        obj.day = "" + currDay;
        obj.date = "" + fullDate;
        // console.log("date and date ", obj.day, obj.date);
        obj[key] = inner;
        arr.push(obj);
        obj = {};
        inner = {};
      } else if (menu[i].daydate == menu[i + 1].daydate) {
        arr.push({
          day: "" + currDay,
          date: "" + fullDate,
          Morning: {
            dish: menu[i].name,
            unitPrice: menu[i].price,
            units: menu[i].units,
          },
          Evening: {
            dish: menu[i + 1].name,
            unitPrice: menu[i + 1].price,
            units: menu[i + 1].units,
          },
        });
        i = i + 1;
      } else {
        let key = menu[i].time;
        let inner = {
          dish: menu[i].name,
          unitPrice: menu[i].price,
          units: menu[i].units,
        };
        obj.day = "" + currDay;
        obj.date = "" + fullDate;
        obj[key] = inner;
        arr.push(obj);
        obj = {};
        inner = {};
      }
    }
    return arr;
  };

  const filteredNames = menus.filter((name) => {
    if (name.day.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    else if (name.date.includes(searchTerm)) return true;
    if (name.hasOwnProperty("Morning")) {
      if (name.Morning.dish.toLowerCase().includes(searchTerm.toLowerCase()))
        return true;
    }
    if (name.hasOwnProperty("Evening")) {
      if (name.Evening.dish.toLowerCase().includes(searchTerm.toLowerCase()))
        return true;
    }
    // return name;
  });

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Searchbar
        placeholder="Search Menu"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        style={styles.searchbar}
      />

      <Divider />
      <Text style={[styles.header, { fontFamily: "monospace" }]}>
        Today's Menu
      </Text>
      <Divider />

      {filteredNames.map((item) => {
        if (item.date == getDate()) {
          return ItemCard({ item }, cardsColor);
        }
      })}
      <Divider />
      <Text style={[styles.header, { fontFamily: "monospace" }]}>
        Complete Menu
      </Text>
      <Divider />

      {/* <View> */}
      <FlatList
        data={filteredNames}
        renderItem={({ item }) => {
          return ItemCard({ item }, cardsColor);
        }}
        keyExtractor={(item, index) => index + item.day + item.date}
        // onEndReached={fetchNames}
      />
      {/* </View> */}
    </View>
  );
}

const days = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};
const months = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  June: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

function getdata(day1) {
  let currDay = days[day1.slice(0, 3)];
  console.log(currDay);
  let currMonth = months[day1.slice(4, 7)];
  let currDate = day1.slice(8, 10);
  let currYear = day1.slice(11, 15);
  let fullDate = currDate + "/" + currMonth + "/" + currYear;
  return { currDay, fullDate };
}
