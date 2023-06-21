/** @format */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState, lazy, Suspense } from "react";
import AppRoutes from "./components/AppRoutes";
const SecuritySection = lazy(() => import("./components/SecuritySection"));
const HostelwardenSection = lazy(() => import("./components/HostelwardenSection"));
const MessSection = lazy(() => import("./components/MessSection"));
const StudentSection = lazy(() => import("./components/StudentSection"));
const QRScanner = lazy(() => import("./components/generic_components/QRScanner"));
const ViewMenu = lazy(() => import("./components/ViewMenu"));
const SList = lazy(() => import("./components/search_list"));
const AppSettings = lazy(() => import("./components/AppSetting"));
import UserProfile from "./components/userProfile";
import ViewExitEntry from "./components/View-exit-entry";
import PendingFees from "./components/PendingFees";
import PaidFees from "./components/PaidFees";
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

	const { bgColor, hColor, hTextColor, topNav, bottomNav, cardsColor, cardsTextColor, font_Family } = color;

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
				<Suspense fallback={() => <Text>Loading...</Text>}>
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

							<Stack.Screen name="Mess Supervisor" options={{ ...topNav }} component={MessSection} initialParams={{ user: "Mess" }} />

							<Stack.Screen name="QRScanner" options={{ ...topNav }} component={QRScanner} />
							<Stack.Screen name="Menu" options={{ ...topNav }} component={ViewMenu} />
							<Stack.Screen name="Settings" options={{ headerShown: false }} component={AppSettings} />
							<Stack.Screen name="User Profile" options={{ ...topNav }} component={UserProfile} />
							<Stack.Screen name="View Exit Entry" options={{ ...topNav }} component={ViewExitEntry} />
							<Stack.Screen name="Mess Fees" options={{ ...topNav }} component={PendingFees} />
							<Stack.Screen name="Hostel Fees" options={{ ...topNav }} component={PaidFees} />

							<Stack.Screen name="Student's List" options={{ ...topNav }} component={SList} />
						</Stack.Navigator>
					</NavigationContainer>
				</Suspense>
			</View>
		</ColorsContext.Provider>
	);
}
