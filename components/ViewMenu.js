import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "../assets/styles/viewmenu";
import { Card, Divider, Searchbar } from "react-native-paper";
import axios from "axios";
import IP from "../Constants/NetworkIP";
import ColorsContext from "../ContextAPI/ColorsContext";
import { getDate } from "../Utils/DaysAndDate";
import { getdata } from "../Utils/DaysAndDate";
const instance = axios.create();


const ItemCard = ({ item }, cardsColor, font_Family) => {
  return (
    <View>
      <Card style={[styles.card, { backgroundColor: cardsColor }]}>
        <View style={styles.menuDay}>
          <Text style={[styles.day, { fontFamily: font_Family }]}>
            {item.day}
          </Text>
          <Text style={[styles.day, { fontFamily: font_Family }]}>
            {item.date}
          </Text>
        </View>

        <Divider />
        {item.hasOwnProperty("Morning") ? (
          <View style={styles.timeStyle}>
            <Text style={{ fontFamily: font_Family }}>{item.Morning.dish}</Text>
            <Text style={[styles.timeAM, { fontFamily: font_Family }]}>
              {item.Morning.time}
            </Text>
          </View>
        ) : (
          ""
        )}
        <Divider />
        {item.hasOwnProperty("Morning") ? (
          <View style={styles.timeStyle}>
            <Text style={{ fontFamily: font_Family }}>
              Rs.{item.Morning.unitPrice}*{item.Morning.units}
            </Text>
            <Text style={[styles.total, { fontFamily: font_Family }]}>
              Rs. {item.Morning.units * item.Morning.unitPrice}
            </Text>
          </View>
        ) : (
          ""
        )}

        <Divider style={{ backgroundColor: "black" }} />
        {item.hasOwnProperty("Evening") ? (
          <View style={styles.timeStyle}>
            <Text style={{ fontFamily: font_Family }}>{item.Evening.dish}</Text>
            <Text style={[styles.timePM, { fontFamily: font_Family }]}>
              {item.Evening.time}
            </Text>
          </View>
        ) : (
          ""
        )}
        <Divider />
        {item.hasOwnProperty("Evening") ? (
          <View style={styles.timeStyle}>
            <Text style={{ fontFamily: font_Family }}>
              Rs.{item.Evening.unitPrice}*{item.Evening.units}
            </Text>
            <Text style={[styles.total, { fontFamily: font_Family }]}>
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
  const { bgColor, font_Family, cardsColor } = React.useContext(ColorsContext);

  let menu = [];
  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await instance.get(`${IP}/getMenu`);
      menu = response.data;
      menu = createObject(response.data);
      setMenu(menu);
    } catch (error) {
      alert(error.message.toString());
    }
  };

  // const createObject = () => {
  //   let arr = [];
  //   let obj = {};
  //   for (let i = 0; i < menu.length; i++) {
  //     const { currDay, fullDate } = getdata(menu[i].daydate);

  //     if (menu[i + 1] == undefined) {
  //       let key = menu[i].time;
  //       let inner = {
  //         dish: menu[i].name,
  //         unitPrice: menu[i].price,
  //         units: menu[i].units,
  //         time:
  //           key == "Evening"
  //             ? "7PM-9PM"
  //             : currDay == "Sunday"
  //             ? "11AM-12AM"
  //             : "7AM-9AM",
  //       };
  //       obj.day = "" + currDay;
  //       obj.date = "" + fullDate;
  //       obj[key] = inner;
  //       arr.push(obj);
  //       obj = {};
  //       inner = {};
  //     } else if (menu[i].daydate == menu[i + 1].daydate) {
  //       arr.push({
  //         day: "" + currDay,
  //         date: "" + fullDate,
  //         Morning: {
  //           dish: menu[i].name,
  //           unitPrice: menu[i].price,
  //           units: menu[i].units,
  //           time: this.day == "Sunday" ? "11AM-12AM" : "7AM-9AM",
  //         },
  //         Evening: {
  //           dish: menu[i + 1].name,
  //           unitPrice: menu[i + 1].price,
  //           units: menu[i + 1].units,
  //           time: "7PM-9PM",
  //         },
  //       });
  //       i = i + 1;
  //     } else {
  //       let key = menu[i].time;
  //       let inner = {
  //         dish: menu[i].name,
  //         unitPrice: menu[i].price,
  //         units: menu[i].units,
  //         time:
  //           key == "Evening"
  //             ? "7PM-9PM"
  //             : currDay == "Sunday"
  //             ? "11AM-12AM"
  //             : "7AM-9AM",
  //       };
  //       obj.day = "" + currDay;
  //       obj.date = "" + fullDate;
  //       obj[key] = inner;
  //       arr.push(obj);
  //       obj = {};
  //       inner = {};
  //     }
  //   }
  //   return arr;
  // };

  const createObject = (menu) => {
    const result = [];
    let obj = {};
    for (let i = 0; i < menu.length; i++) {
      const { currDay, fullDate } = getdata(menu[i].daydate);
      let key = menu[i].time;
      let inner = {
        dish: menu[i].name,
        unitPrice: menu[i].price,
        units: menu[i].units,
        time:
          key == "Evening"
            ? "7PM-9PM"
            : currDay == "Sunday"
            ? "11AM-12AM"
            : "7AM-9AM",
      };
      if (menu[i + 1] == undefined) {
        obj = {
          day: "" + currDay,
          date: "" + fullDate,
          [key]: inner,
        };
        result.push(obj);
      } else if (menu[i].daydate == menu[i + 1].daydate) {
        obj = {
          day: "" + currDay,
          date: "" + fullDate,
          Morning: {
            dish: menu[i].name,
            unitPrice: menu[i].price,
            units: menu[i].units,
            time: currDay == "Sunday" ? "11AM-12AM" : "7AM-9AM",
          },
          Evening: {
            dish: menu[i + 1].name,
            unitPrice: menu[i + 1].price,
            units: menu[i + 1].units,
            time: "7PM-9PM",
          },
        };
        result.push(obj);
        i = i + 1;
      } else {
        obj = {
          day: "" + currDay,
          date: "" + fullDate,
          [key]: inner,
        };
        result.push(obj);
      }
    }
    return result;
  };

 
  const filteredNames =  menus.filter(({ day, date, Morning, Evening }) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    if (day.toLowerCase().includes(searchTermLowerCase)) return true;
    if (date.includes(searchTerm)) return true;
    if (Morning && Morning.dish.toLowerCase().includes(searchTermLowerCase)) return true;
    if (Evening && Evening.dish.toLowerCase().includes(searchTermLowerCase)) return true;
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
      <Text style={[styles.header, { fontFamily: font_Family }]}>
        Today's Menu
      </Text>
      <Divider />

      {filteredNames.map((item) => {
        if (item.date == getDate()) {
          return ItemCard({ item }, cardsColor, font_Family);
        }
      })}
      <Divider />
      <Text style={[styles.header, { fontFamily: font_Family }]}>
        Complete Menu
      </Text>
      <Divider />

      <FlatList
        data={filteredNames}
        renderItem={({ item }) => {
          return ItemCard({ item }, cardsColor, font_Family);
        }}
        keyExtractor={(item, index) => index + item.day + item.date}
        // onEndReached={fetchNames}
      />
    </View>
  );
}
