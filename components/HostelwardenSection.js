import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";

import { BottomNavigationStyles } from "../assets/styles/AppBackGroun_Header/AppAndHeaders";
import StudentData from "./ViewStudentData";
import RegisterComplaints from "./RegisterComplaints";
import ViewComplaints from "./ViewComplaints";
import ColorsContext from "../ContextAPI/ColorsContext";
const Tab = createBottomTabNavigator();

export default function StudentSection() {
  const { bottomNav } = React.useContext(ColorsContext);
  return (
    <Tab.Navigator screenOptions={{ ...bottomNav }}>
      <Tab.Screen
        name="View Student Data"
        component={StudentData}
        options={{
          headerShown: false,
          style: { fontSize: 20 },
          tabBarIcon: () => (
            <Icon
              name="clipboard-list"
              color={BottomNavigationStyles.tabBarIconStyles.color}
              size={BottomNavigationStyles.tabBarIconStyles.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Register Complaint"
        component={RegisterComplaints}
        options={{
          headerShown: false,
          style: { fontSize: 20 },
          tabBarIcon: () => (
            <Icon
              name="file-signature"
              color={BottomNavigationStyles.tabBarIconStyles.color}
              size={BottomNavigationStyles.tabBarIconStyles.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="View Complaint"
        component={ViewComplaints}
        options={{
          headerShown: false,
          style: { fontSize: 20 },
          tabBarIcon: () => (
            <Icon
              name="list-alt"
              color={BottomNavigationStyles.tabBarIconStyles.color}
              size={BottomNavigationStyles.tabBarIconStyles.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
