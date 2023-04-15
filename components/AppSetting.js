import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../assets/styles/Colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";
import { HEIGHT } from "../Constants/GlobalWidthHeight";
import { LogBox } from "react-native";
import ColorsContext from "../ContextAPI/ColorsContext";
export default function AppSettings({ navigation }) {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);
  const [option, setOption] = React.useState();
  const {
    color,
    bgColor,
    hColor,
    hTextColor,
    topNav,
    bottomNav,
    topNavsTextColor,
    cardsColor,
    cardsTextColor,
    bottomNavsTextColor,
    setBgColor,
  } = React.useContext(ColorsContext);

  const [bColor, setBColor] = React.useState(bgColor);
  const [fColor, setFColor] = React.useState("black");
  const [header, setHeaderColor] = React.useState(hColor);
  const [HfColor, setHFColor] = React.useState(hTextColor);
  const [cardColor, setCardColor] = React.useState(cardsColor);
  const [cardTextColor, setCardTextColor] = React.useState(cardsTextColor);
  const [topNavColor, setTopNavColor] = React.useState(topNav);
  const [topNavTextColor, setTopNavTextColor] =
    React.useState(topNavsTextColor);
  const [bottomNavColor, setBottomNavColor] = React.useState(bottomNav);
  const [bottomNavTextColor, setBottomNavTextColor] =
    React.useState(bottomNavsTextColor);

  // const storeData = async (colors) => {
  //   try {
  //     await AsyncStorage.setItem("settings", JSON.stringify(colors));
  //   } catch (e) {}
  // };

  const BodyParts = (heading) => {
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
                setOption(newValue);
              }}
              value={option}
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
          style={{
            height: "40%",
            borderWidth: 0.5,
            borderColor: "silver",
            flexDirection: "row",
          }}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={colors}
            renderItem={({ item }) => (
              <View>
                <Button
                  mode="elevated"
                  style={[styles.paragraph, { backgroundColor: item }]}
                  onPress={() => {
                    if (option == "Body") {
                      setBColor(item);
                      setBgColor({
                        bgColor: item,
                        hColor: header,
                        cardsColor: cardColor,
                        bottomNav: bottomNavColor,
                        topNav: topNavColor,
                      });
                    } else if (option == "Header") {
                      setHeaderColor(item);
                      setBgColor({
                        bgColor: bColor,
                        hColor: item,
                        cardsColor: cardColor,
                        bottomNav: bottomNavColor,
                        topNav: topNavColor,
                      });
                    } else if (option == "Body Text") setFColor(item);
                    else if (option == "Header Text") {
                      setHFColor(item);
                      setBgColor({
                        bgColor: bColor,
                        hColor: header,
                        hTextColor: item,
                        cardsColor: cardColor,
                        bottomNav: bottomNavColor,
                        topNav: topNavColor,
                      });
                    } else if (option == "Card") {
                      setCardColor(item);
                      setBgColor({
                        bgColor: bColor,
                        hColor: header,
                        cardsColor: item,
                        bottomNav: bottomNavColor,
                        topNav: topNavColor,
                      });
                    } else if (option == "Cards Text") setCardTextColor(item);
                    else if (option == "Top Nav") setTopNavColor(item);
                    else if (option == "TopNav Text") setTopNavTextColor(item);
                    else if (option == "Bottom Nav") setBottomNavColor(item);
                    else if (option == "BottomNav Text")
                      setBottomNavTextColor(item);

                    // storeData(color);
                    // const getData = async () => {
                    //   try {
                    //     const value = await AsyncStorage.getItem("settings");
                    //     if (value !== null) {
                    //       return value;
                    //     }
                    //   } catch (e) {
                    //     // error reading value
                    //   }
                    // };
                    // getData();
                  }}
                >
                  C
                </Button>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1 }}
          />

          <Text style={{ flex: 1 }}>Font </Text>
        </View>
        <View
          style={{
            height: "12%",
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
                <Icon name="arrow-left" color="black" size={25} />
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
    alignItems: "center",
    flexDirection: "row",
    borderColor: "silver",
    borderWidth: 0.5,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: "45%",
  },
  paragraph: {
    borderRadius: 50,
    margin: 3,
    alignItems: "center",
    borderColor: "silver",
    borderWidth: 0.5,
    // width: "5%",
    // height: "100%",
    // padding: 15,
  },
});

//                const storeData = async () => {
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
