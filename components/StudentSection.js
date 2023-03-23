import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import ViewAllFees from "./ViewAllFees";
import RegisterComplaints from "./RegisterComplaints";
import ViewComplaints from "./ViewComplaints";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BottomNavigationStyles } from "../assets/styles/AppBackGroun_Header/AppAndHeaders";
export default function StudentSection() {

  return (
    <Tab.Navigator
      screenOptions={
        {...BottomNavigationStyles}
      }
    >

      <Tab.Screen
        name="View All Your Data"
        component={ViewAllFees}

        options={{
          headerShown: false,
          
          tabBarIcon: () => (
            <Icon name="clipboard-list" color={BottomNavigationStyles.tabBarIconStyles.color} size={BottomNavigationStyles.tabBarIconStyles.size} />
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
            <Icon name="file-signature" color={BottomNavigationStyles.tabBarIconStyles.color} size={BottomNavigationStyles.tabBarIconStyles.size} />
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
            <Icon name="list-alt" color={BottomNavigationStyles.tabBarIconStyles.color} size={BottomNavigationStyles.tabBarIconStyles.size} />
          ),

        }}
      />
    </Tab.Navigator>
  );
}
