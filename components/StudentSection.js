import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ViewAllFees from "./ViewAllFees";
import RegisterComplaints from "./RegisterComplaints";
import ViewComplaints from "./ViewComplaints";
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import ColorsContext from "../ContextAPI/ColorsContext";

const Tab = createBottomTabNavigator();
function StudentSection() {
  const { bottomNav } = React.useContext(ColorsContext);

  return (
    <Tab.Navigator
      screenOptions={
        {...bottomNav}
      }
    >

      <Tab.Screen
        name="View All Your Data"
        component={ViewAllFees}

        options={{
          headerShown: false,
          
          tabBarIcon: () => (
            <Icon name="clipboard-list" 
            color={bottomNav.tabBarIconStyles.color}
             size={bottomNav.tabBarIconStyles.size} />
          ),
          
        }}
      />
      <Tab.Screen
        name="Register Complaint"
        component={RegisterComplaints}
        options={{
          headerShown: false,
          // style: { fontSize: 20 },
          tabBarIcon: () => (
            <Icon name="file-signature" 
            color={bottomNav.tabBarIconStyles.color} 
            size={bottomNav.tabBarIconStyles.size} />
          ),
        }}
      />
      <Tab.Screen
        name="View Complaint"
        component={ViewComplaints}
        options={{
          headerShown: false,
          // style: { fontSize: 20 },
          tabBarIcon: () => (
            <Icon name="list-alt" 
            color={bottomNav.tabBarIconStyles.color} 
            size={bottomNav.tabBarIconStyles.size} />
          ),

        }}
      />
    </Tab.Navigator>
  );
}

export default React.memo(StudentSection)
