import { View, Text, Image } from "react-native";
import { Card } from "react-native-paper";
import Header from "./Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BottomNavigationStyles } from "../assets/styles/AppBackGroun_Header/AppAndHeaders";
import mainButtons from "../Constants/mainButtons";
import React from "react";
import { styles } from "../assets/styles/approutes";
import { useState } from "react";
import SplashScreen from "./generic_components/SplashScreen";
import { useContext } from "react";
import ColorsContext from "../ContextAPI/ColorsContext";
export default function AppRoutes({ navigation }) {

  const [display, setDisplay] = useState("flex");
  const [displayRoute, setDisplayRoute] = useState("none");
  const { bgColor, hColor, cardsColor,font_Family } = useContext(ColorsContext);
  const icons = ["user-graduate", "user-lock", "user-check", "user-secret"];
  
  const disp = () => {
    setTimeout(() => {
      setDisplay("none");
      setDisplayRoute("flex");
    }, 5000);
    return (
      <View style={{ height: "100%", width: "100%", display: display }}>
        <SplashScreen visible={true} />
      </View>
    );
  };
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {disp()}
      {/* backgroundColor: color */}
      <View
        style={[
          styles.container,
          { backgroundColor: bgColor, display: displayRoute },
        ]}
      >
        <View style={[styles.header, { backgroundColor: hColor }]}>
          <Header />
        </View>
        <View style={styles.cardContainer}>
          {mainButtons.map(function (item, index) {
            return (
              <Card
                key={index}
                style={[styles.card, { backgroundColor: cardsColor }]}
                onPress={() => {
                  navigation.navigate(Object.entries(item)[0][0]);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name={icons[index]}
                      // color={BottomNavigationStyles.tabBarIconStyles.color}
                      size={BottomNavigationStyles.tabBarIconStyles.size}
                      // size={"5%"}
                    />

                    {/* <Image
                      source={require("../assets/Images/secrity.png")}
                      style={{ width: 50, height: 50, borderRadius: 50 }}
                    /> */}
                  </View>
                  <View
                    style={{
                      borderRightColor: "silver",
                      borderWidth: 0.5,
                      height: 50,
                    }}
                  ></View>
                  <View
                    style={{
                      width: "75%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[styles.cardtext, { fontFamily: font_Family }]}
                    >
                      {Object.entries(item)[0][1]}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
        <View
          style={{
            height: "5%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopColor: "silver",
            borderTopWidth: 0.5,
          }}
        >
          <Text
            onPress={() => {
              navigation.navigate("Settings", {
                // setColor: setColor,
                // setHColor: setHColor,
              });
            }}
            style={{
              width: "50%",
              borderRightWidth: 0.5,
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: font_Family,
            }}
          >
            App Settings
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("Menu");
            }}
            style={{
              width: "50%",
              textAlign: "center",
              fontWeight: "bold",
              fontFamily:font_Family,
            }}
          >
            View Mess Menu
          </Text>
        </View>
      </View>
    </View>
  );
}
