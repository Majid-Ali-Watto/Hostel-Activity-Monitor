// import * as React from "react";
// import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { colors } from "../assets/styles/Colors/colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Divider } from "react-native-paper";
// import { HEIGHT } from "../Constants/GlobalWidthHeight";
// import { LogBox } from "react-native";
// import { setBGcolor } from "../Constants/BG_Color";
// import { setHBGcolor } from "../Constants/BG_Color";
// import { getBGcolor } from "../Constants/BG_Color";
// import { getHBGcolor } from "../Constants/BG_Color";
// export default function AppSettings({ route }) {
//   LogBox.ignoreLogs([
//     "Non-serializable values were found in the navigation state.",
//   ]);

//   const [bColor, setBColor] = React.useState(getBGcolor());
//   const [header, setHeaderColor] = React.useState(getHBGcolor());
//   const [fColor, setFColor] = React.useState("black");
//   const [HfColor, setHFColor] = React.useState("black");
//   const BodyParts = (heading) => {
//     return (
//       <View style={{ height: "30%", justifyContent: "space-between" }}>
//         <Text style={{ color: fColor }}>{heading}</Text>
//         <Divider />
//         <FlatList
//           data={colors}
//           renderItem={({ item }) => (
//             <Text
//               style={[styles.paragraph, { backgroundColor: item }]}
//               onPress={() => {
//                 async () => {
//                   try {
//                     await AsyncStorage.setItem("color", item);
//                   } catch (e) {
//                   }
//                 };
//                 if (heading == "Body") {
//                   setBColor(item);
//                   setBGcolor(item);
//                   route.params.setColor(item);

//                 } else if (heading == "Header") {
//                   setHeaderColor(item);
//                   setHBGcolor(item);
//                   route.params.setHColor(item);
//                 } else if (heading == "Body Text") setFColor(item);
//                 else if (heading == "Header Text") {
//                   setHFColor(item);
//                 }
//                 const storeData = async () => {
//                   try {
//                     await AsyncStorage.setItem("color", item);
//                   } catch (e) {
//                   }
//                 };
//                 storeData();
//                 // const getData = async () => {
//                 //   try {
//                 //     const value = await AsyncStorage.getItem("color");
//                 //     if (value !== null) {
//                 //       return value;
//                 //     }
//                 //   } catch (e) {
//                 //     // error reading value
//                 //   }
//                 // };
//                 // getData();
//               }}
//             >
//               {item}
//             </Text>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />

//         {/* <Button title="Reload" onPress={() => reloadApp()} /> */}
//       </View>
//     );
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: bColor }]}>
//       <View
//         style={{
//           height: "20%",
//           width: "100%",
//           marginTop:0,
//           padding:0,
//           backgroundColor: header,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Text
//           style={{
//             textAlign: "center",
//             fontSize: HEIGHT * 0.035,
//             fontWeight: "bold",
//             color: HfColor,
//           }}
//         >
//           QAU
//         </Text>
//       </View>
//       {BodyParts("Body")}
//       {BodyParts("Header")}
//       {BodyParts("Body Text")}
//       {BodyParts("Header Text")}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     flexWrap: "wrap",
//     // alignItems: "flex-start",
//     // paddingTop: Constants.statusBarHeight,

//     // padding: 8,
//   },
//   paragraph: {
//     width: "100%",
//     borderRadius: 50,
//     marginBottom: 3,
//   },
// });

import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";

import { LogBox } from "react-native";
import { ColorsContext } from "../App";
export default function AppSettings({ navigation }) {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);
  const [time, setTime] = React.useState();
  const { bgColor, hColor, setBgColor } = React.useContext(ColorsContext);

  const [bColor, setBColor] = React.useState(bgColor);
  const [fColor, setFColor] = React.useState("black");
  const [header, setHeaderColor] = React.useState(hColor);
  const [HfColor, setHFColor] = React.useState("black");
  const [cardColor, setCardColor] = React.useState("silver");
  const [cardTextColor, setCardTextColor] = React.useState("");
  const [topNavColor, setTopNavColor] = React.useState("");
  const [topNavTextColor, setTopNavTextColor] = React.useState("");
  const [bottomNavColor, setBottomNavColor] = React.useState("");
  const [bottomNavTextColor, setBottomNavTextColor] = React.useState("");
  const BodyParts = (heading) => {
    console.log(bColor, header);
    return (
      <View
        style={{
          flexDirection: "column",
          height: "100%",
        }}
      >
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: fColor }}>Body Text</Text>
          <View
            style={{ height: "57.55%", flexDirection: "row", flexWrap: "wrap" }}
          >
            <RadioButton.Group
              onValueChange={(newValue) => {
                setTime(newValue);
              }}
              value={time}
            >
              <View style={styles.radioButtonContainer}>
                {heading.map((d) => {
                  return (
                    <View
                      key={d}
                      style={[
                        styles.radioButton,
                        { backgroundColor: cardColor },
                      ]}
                    >
                      <Text style={{ color: cardTextColor, width: "80%" }}>
                        {d}
                      </Text>
                      <RadioButton
                        value={d}
                        style={{ width: "10%", backgroundColor: "black" }}
                      />
                    </View>
                  );
                })}
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View
          style={{ height: "40%", borderWidth: 0.5, borderColor: "silver" }}
        >
          <FlatList
            // showsHorizontalScrollIndicator={false}
            // horizontal={true}
            style={{
              flexDirection: "column",
              // justifyContent: 'flex-start',
              // alignItems: 'center',
              flexWrap: "wrap",
              // height: '100%',
              // width: '90%',
            }}
            data={colors}
            renderItem={({ item }) => (
              <View
                style={{
                  // flex: 1,
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Text
                  style={[styles.paragraph, { backgroundColor: item }]}
                  onPress={() => {
                    if (time == "Body") {
                      setBColor(item);
                      setBgColor({ bgColor: bColor, hColor: header });
                    } else if (time == "Header") {
                      setHeaderColor(item);
                      setBgColor({ bgColor: bColor, hColor: header });
                      console.log(bgColor, hColor);
                    } else if (time == "Body Text") setFColor(item);
                    else if (time == "Header Text") {
                      setHFColor(item);
                    } else if (time == "Card") setCardColor(item);
                    else if (time == "Cards Text") setCardTextColor(item);
                    else if (time == "Top Nav") setTopNavColor(item);
                    else if (time == "TopNav Text") setTopNavTextColor(item);
                    else if (time == "Bottom Nav") setBottomNavColor(item);
                    else if (time == "BottomNav Text")
                      setBottomNavTextColor(item);
                  }}
                >
                  {"color"}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={{
            height: 50,
            marginTop: 1,
            borderColor: "silver",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: bottomNavColor,
          }}
        >
          <Text style={{ textAlign: "center", color: bottomNavTextColor }}>
            BottomNav
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: bColor }]}>
      <View style={{ height: "20%" }}>
        <View
          style={{
            height: "50%",
            width: "100%",
            marginBottom: 1,
            borderColor: "silver",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: topNavColor,
          }}
        >
          <Text></Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View style={{ justifyContent: "flex-start" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-left" color="darkgray" size={25} />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ textAlign: "center", color: topNavTextColor }}>
                Settings
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 100,
            width: "100%",
            marginTop: 0,
            padding: 0,
            backgroundColor: header,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "silver",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 480 * 0.035,
              fontWeight: "bold",
              color: HfColor,
            }}
          >
            Header
          </Text>
        </View>
      </View>
      <View style={{ height: "70%" }}>
        {BodyParts([
          "Body",
          "Header",
          "Body Text",
          "Header Text",
          "Card",
          "Cards Text",
          "Top Nav",
          "Bottom Nav",
          "TopNav Text",
          "BottomNav Text",
        ])}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //  justifyContent: 'center',
    // alignItems: 'center',
    // padding:10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    height: "60%",
  },
  radioButton: {
    margin: 1,
    // flex1,
    alignItems: "center",
    // alignSelf: "flex-start",
    flexDirection: "row",
    borderColor: "silver",
    borderWidth: 0.5,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: "45%",
    // height:40
  },
  paragraph: {
    // width: '20%',
    borderRadius: 50,
    margin: 3,

    //  alignItems: 'center',
    alignItems: "flex-start",
    //  flexDirection: 'row',
    borderColor: "silver",
    borderWidth: 0.5,
    padding: 5,
  },
});
