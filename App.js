import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import React from "react";
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

NetInfo.fetch().then(state => {
  console.log("Connection ", state.isConnected);
  if(!state.isConnected){
      // alert('Internet Connection is Required');
    Alert.alert('Network Status', 'Internet Connection is Required', [
      {
        text: 'Cancel',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      // {text: 'OK', onPress: () => console.log('OK Pressed')},
    ])
  }
    // console.log("Connection type", state.type);
   
});
export default function App() {
  const [color, setBgColor] = React.useState(globalStylings);
  const [load,setLoad] =React.useState({})
  React.useEffect(()=>{
   
      try {
        const value =  AsyncStorage.getItem("settings");
        if (value !== null) {
          setLoad(JSON.parse(value));
        }
      } catch (error) {
  
      }
    
  },[])
  return (
    <ColorsContext.Provider
      value={{
        bgColor: load.bgColor|| color.bgColor,
        hColor: color.hColor,
        topNav: color.topNav,
        bottomNav: color.bottomNav,
        cardsColor: color.cardsColor,
        cardsTextColor:color.cardsTextColor,
        setBgColor: setBgColor,
        bottomNavsTextColor:color.bottomNavsTextColor,
        topNavsTextColor:color.topNavsTextColor,
        color
      }}
    >
      {/* <View style={[styles.home, { backgroundColor: getBGcolor() }]}> */}
      <View style={[styles.home, { backgroundColor: color.bgColor }]}>
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

