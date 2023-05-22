/** @format */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import { lazy, Suspense ,useContext} from "react";
import ColorsContext from "../ContextAPI/ColorsContext";
const StudentData = lazy(() => import("./ViewStudentData"));
const RegisterComplaints = lazy(() => import("./RegisterComplaints"));
const ViewComplaints = lazy(() => import("./ViewComplaints"));
const Tab = createBottomTabNavigator();
import { Text } from "react-native";

export default function StudentSection() {
	const { bottomNav } = useContext(ColorsContext);
	return (
		<Suspense fallback={() => <Text>Loading...</Text>}>
			<Tab.Navigator screenOptions={{ ...bottomNav }}>
				<Tab.Screen
					name="View Student Data"
					component={StudentData}
					options={{
						headerShown: false,
						style: { fontSize: 20 },
						tabBarIcon: () => (
							<Icon name="clipboard-list" color={bottomNav.tabBarIconStyles.color} size={bottomNav.tabBarIconStyles.size} />
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
							<Icon name="file-signature" color={bottomNav.tabBarIconStyles.color} size={bottomNav.tabBarIconStyles.size} />
						),
					}}
				/>
				<Tab.Screen
					name="View Complaint"
					component={ViewComplaints}
					options={{
						headerShown: false,
						style: { fontSize: 20 },
						tabBarIcon: () => <Icon name="list-alt" color={bottomNav.tabBarIconStyles.color} size={bottomNav.tabBarIconStyles.size} />,
					}}
				/>
			</Tab.Navigator>
		</Suspense>
	);
}
