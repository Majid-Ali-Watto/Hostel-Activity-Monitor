import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import ColorsContext from "../ContextAPI/ColorsContext";
import React from "react";
const Tab = createBottomTabNavigator();
import ViewStudentDataMess from "../components/ViewStudentDataMess";
import MarkAttendance from "./MarkAttendance";
import AddMessMenu from "./AddMessMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MessSection() {
  const { bottomNav } = React.useContext(ColorsContext);

  return (
    <Tab.Navigator screenOptions={{ ...bottomNav }}>
      <Tab.Screen
        name="View Student's Mess Fee"
        listeners={() => {
          const storeData = async () => {
            try {
              await AsyncStorage.setItem("tab", "View Student's Mess Fee");
            } catch (e) {}
          };

          storeData();
        }}
        component={ViewStudentDataMess}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              name="list-alt"
              color={bottomNav.tabBarIconStyles.color}
              size={bottomNav.tabBarIconStyles.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Mess Menu"
        listeners={() => {
          const storeData = async () => {
            try {
              await AsyncStorage.setItem("tab", "Add Mess Menu");
            } catch (e) {}
          };

          storeData();
        }}
        component={AddMessMenu}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              name="list"
              color={bottomNav.tabBarIconStyles.color}
              size={bottomNav.tabBarIconStyles.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mark Attendance"
        listeners={() => {
          const storeData = async () => {
            try {
              await AsyncStorage.setItem("tab", "Mark Attendance");
            } catch (e) {}
          };

          storeData();
        }}
        component={MarkAttendance}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon
              name="calendar-check"
              color={bottomNav.tabBarIconStyles.color}
              size={bottomNav.tabBarIconStyles.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
