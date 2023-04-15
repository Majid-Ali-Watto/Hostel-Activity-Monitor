import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import AppRoutes from "./components/AppRoutes";
import SecuritySection from "./components/SecuritySection";
import HostelwardenSection from "./components/HostelwardenSection";
import MessSection from "./components/MessSection";
import StudentSection from "./components/StudentSection";
import QRScanner from "./components/QRScanner";
import ViewMenu from "./components/ViewMenu";
import SList from "./components/search_list";
import AppSettings from "./components/AppSetting";
import { styles } from "./assets/styles/app";
import { Alert, View } from "react-native";
import ColorsContext from "./ContextAPI/ColorsContext";
import NetInfo from "@react-native-community/netinfo";
import globalStylings from "./assets/styles/GlobalStyling/GlobalStyling";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [color, setBgColor] = useState(globalStylings);

  useEffect(() => {
    const fetchNetInfo = async () => {
      const state = await NetInfo.fetch();
      console.log("Connection ", state.isConnected);
      if (!state.isConnected) {
        Alert.alert("Network Status", "Internet Connection is Required", [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      }
    };
    fetchNetInfo();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const value = await AsyncStorage.getItem("settings");
        setBgColor((prevColor) => ({
          ...prevColor,
          bgColor: value?.bgColor ?? prevColor.bgColor,
        }));
      } catch (error) {}
    };
    fetchSettings();
  }, []);

  const {
    bgColor,
    hColor,
    hTextColor,
    topNav,
    bottomNav,
    cardsColor,
    cardsTextColor,
    bottomNavsTextColor,
    topNavsTextColor,
    fontFamily,
  } = color;

  return (
    <ColorsContext.Provider
      value={{
        bgColor: bgColor || color.bgColor,
        hColor,
        hTextColor,
        topNav,
        bottomNav,
        cardsColor,
        cardsTextColor,
        setBgColor,
        bottomNavsTextColor,
        topNavsTextColor,
        fontFamily,
        color,
      }}
    >
      <View style={[styles.home, { backgroundColor: bgColor }]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AppRoutes">
            <Stack.Screen
              name="QAU  ISLAMABAD"
              component={AppRoutes}
              options={{
                headerShown: false,
                headerTitleAlign: "center",
              }}
            />

            <Stack.Screen
              name="Student Section"
              options={styles.headerStyle}
              component={StudentSection}
              initialParams={{ user: "Student" }}
            />

            <Stack.Screen
              name="Security Supervisor"
              options={styles.headerStyle}
              component={SecuritySection}
              initialParams={{ user: "Security" }}
            />

            <Stack.Screen
              name="Hostel Supervisor"
              options={styles.headerStyle}
              component={HostelwardenSection}
              initialParams={{ user: "Hostel" }}
            />

            <Stack.Screen
              name="Mess Supervisor"
              options={styles.headerStyle}
              component={MessSection}
              initialParams={{ user: "Mess" }}
            />

            <Stack.Screen
              name="QRScanner"
              options={styles.headerStyle}
              component={QRScanner}
            />
            <Stack.Screen
              name="Menu"
              options={styles.headerStyle}
              component={ViewMenu}
            />
            <Stack.Screen
              name="Settings"
              options={{ headerShown: false }}
              component={AppSettings}
            />

            <Stack.Screen
              name="Student's List"
              options={styles.headerStyle}
              component={SList}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ColorsContext.Provider>
  );
}
