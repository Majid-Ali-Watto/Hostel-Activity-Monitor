import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import AppRoutes from "./components/AppRoutes";
import SecuritySection from "./components/SecuritySection";
import HostelwardenSection from "./components/HostelwardenSection";
import MessSection from "./components/MessSection";
import StudentSection from "./components/StudentSection";
import QRScanner from "./components/generic_components/QRScanner";
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
    console.log(bottomNav);
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
    font_Family,
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
        font_Family,
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
              options={{ ...topNav }}
              component={StudentSection}
              initialParams={{ user: "Student" }}
            />

            <Stack.Screen
              name="Security Supervisor"
              options={{ ...topNav }}
              component={SecuritySection}
              initialParams={{ user: "Security" }}
            />

            <Stack.Screen
              name="Hostel Supervisor"
              options={{ ...topNav }}
              component={HostelwardenSection}
              initialParams={{ user: "Hostel" }}
            />

            <Stack.Screen
              name="Mess Supervisor"
              options={{ ...topNav }}
              component={MessSection}
              initialParams={{ user: "Mess" }}
            />

            <Stack.Screen
              name="QRScanner"
              options={{ ...topNav }}
              component={QRScanner}
            />
            <Stack.Screen
              name="Menu"
              options={{ ...topNav }}
              component={ViewMenu}
            />
            <Stack.Screen
              name="Settings"
              options={{ headerShown: false }}
              component={AppSettings}
            />

            <Stack.Screen
              name="Student's List"
              options={{ ...topNav }}
              component={SList}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ColorsContext.Provider>
  );
}
