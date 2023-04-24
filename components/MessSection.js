import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BottomNavigationStyles } from "../assets/styles/AppBackGroun_Header/AppAndHeaders";

const Tab = createBottomTabNavigator();
import ViewStudentDataMess from "../components/ViewStudentDataMess";
import MarkAttendance from "./MarkAttendance";
import AddMessMenu from "./AddMessMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function MessSection() {
  return (
    <Tab.Navigator screenOptions={{ ...BottomNavigationStyles }}>
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
              color={BottomNavigationStyles.tabBarIconStyles.color}
              size={BottomNavigationStyles.tabBarIconStyles.size}
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
              color={BottomNavigationStyles.tabBarIconStyles.color}
              size={BottomNavigationStyles.tabBarIconStyles.size}
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
              color={BottomNavigationStyles.tabBarIconStyles.color}
              size={BottomNavigationStyles.tabBarIconStyles.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
