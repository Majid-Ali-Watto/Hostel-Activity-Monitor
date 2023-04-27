/** @format */

import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../assets/styles/Colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";
import { HEIGHT, WIDTH } from "../Constants/GlobalWidthHeight";
import { LogBox } from "react-native";
import ColorPalette from "react-native-color-palette";
import ColorsContext from "../ContextAPI/ColorsContext";
export default function AppSettings({ navigation }) {
	LogBox.ignoreLogs(["Non-serializable values were found in the navigation state."]);
	const [option, setOption] = React.useState();
	const {
		// color,
		bgColor,
		hColor,
		hTextColor,
		topNav,
		bottomNav,
		topNavsTextColor,
		cardsColor,
		cardsTextColor,
		setBgColor,
	} = React.useContext(ColorsContext);

	const [bColor, setBColor] = React.useState(bgColor);
	const [fColor, setFColor] = React.useState("black");
	const [header, setHeaderColor] = React.useState(hColor);
	const [HfColor, setHFColor] = React.useState(hTextColor);
	const [cardColor, setCardColor] = React.useState(cardsColor);
	const [cardTextColor, setCardTextColor] = React.useState(cardsTextColor);
	const [topNavColor, setTopNavColor] = React.useState(topNav.headerStyle.backgroundColor);
	const [topNavTextColor, setTopNavTextColor] = React.useState(topNav.headerTintColor);
	const [bottomNavColor, setBottomNavColor] = React.useState(bottomNav.tabBarStyle.backgroundColor);
	const [bottomNavActiveTextColor, setBottomNavActiveTextColor] = React.useState(bottomNav.tabBarActiveTintColor);
	const [bottomNavInActiveTextColor, setBottomNavInActiveTextColor] = React.useState(bottomNav.tabBarInActiveTintColor);
	const [tabBarActiveBackgroundColor, setTabBarActiveBackgroundColor] = React.useState(bottomNav.tabBarActiveBackgroundColor);
	const [tabBarInActiveBackgroundColor, setTabBarInActiveBackgroundColor] = React.useState(bottomNav.tabBarInActiveBackgroundColor);

	// const storeData = async (colors) => {
	//   try {
	//     await AsyncStorage.setItem("settings", JSON.stringify(colors));
	//   } catch (e) {}
	// };

	const BodyParts = (heading) => {
		return (
			<View
				style={{
					flexDirection: "column",
					height: "100%",
				}}
			>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Text style={{ color: fColor }}>Body Text</Text>
					</View>

					<View style={{ height: "57.55%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
						<RadioButton.Group
							onValueChange={(newValue) => {
								setOption(newValue);
							}}
							value={option}
						>
							<View style={styles.radioButtonContainer}>
								{heading.map((d) => {
									return (
										<View key={d} style={[styles.radioButton, { backgroundColor: cardColor }]}>
											<Text style={{ color: cardTextColor, width: "80%" }}>{d}</Text>
											<RadioButton value={d} style={{ width: "10%", backgroundColor: "black" }} />
										</View>
									);
								})}
							</View>
						</RadioButton.Group>
					</View>
				</View>
				<View
					style={{
						height: "42%",
						borderWidth: 0.5,
						borderColor: "silver",
						flexDirection: "row",
					}}
				>
					<ScrollView
						style={{
							width: "30%",
							borderWidth: 0.5,
							borderColor: "silver",
						}}
					>
						<ColorPalette
							defaultColor={bColor}
							colors={[...new Set(colors)]}
							title={""}
							onChange={(color) => {
								const item = color;
								if (option == "Body") {
									setBColor(item);
									setBgColor({
										bgColor: item,
										hColor: header,
										cardsColor: cardColor,
										bottomNav: { ...bottomNav },
										topNav: { ...topNav },
										cardsTextColor: cardTextColor,
									});
								} else if (option == "Header") {
									setHeaderColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: item,
										cardsColor: cardColor,
										bottomNav: { ...bottomNav },
										topNav: { ...topNav },
										cardsTextColor: cardTextColor,
									});
								} else if (option == "Body Text") setFColor(item);
								else if (option == "Header Text") {
									setHFColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										hTextColor: item,
										cardsColor: cardColor,
										bottomNav: { ...bottomNav },
										topNav: { ...topNav },
										cardsTextColor: cardTextColor,
									});
								} else if (option == "Card") {
									setCardColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										cardsColor: item,
										bottomNav: { ...bottomNav },
										topNav: { ...topNav },
										cardsTextColor: cardTextColor,
									});
								} else if (option == "Cards Text") {
									setCardTextColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										cardsColor: cardColor,
										bottomNav: { ...bottomNav },
										topNav: { ...topNav },
										cardsTextColor: item,
									});
								} else if (option == "Top Nav") {
									setTopNavColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										cardsColor: cardColor,
										bottomNav: { ...bottomNav },
										topNav: {
											...topNav,
											headerStyle: { backgroundColor: item },
										},
										cardsTextColor: cardTextColor,
									});
								} else if (option == "TopNav Text") {
									setTopNavTextColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										cardsColor: cardColor,
										bottomNav: { ...bottomNav },
										topNav: {
											...topNav,
											headerTintColor: item,
										},
										cardsTextColor: cardTextColor,
									});
								}
								//  else if (option == "Bottom Nav") {
								// 	setBottomNavColor(item);
								// 	setBgColor({
								// 		bgColor: bColor,
								// 		hColor: header,
								// 		cardsColor: cardColor,
								// 		bottomNav: {
								// 			...bottomNav,
								// 			tabBarStyle: { backgroundColor: item },
								// 		},
								// 		topNav: { ...topNav },
								// 	});
								// }
								else if (option == "BottomNav Active") {
									setTabBarActiveBackgroundColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										cardsColor: cardColor,
										bottomNav: {
											...bottomNav,
											tabBarActiveBackgroundColor: item,
											tabBarIconStyles: item || tabBarActiveTintColor,
										},
										topNav: { ...topNav },
										cardsTextColor: cardTextColor,
									});
								} else if (option == "BottomNav InActive") {
									setTabBarInActiveBackgroundColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										cardsColor: cardColor,
										bottomNav: {
											...bottomNav,
											tabBarStyle: { backgroundColor: item },
										},
										topNav: { ...topNav },
										cardsTextColor: cardTextColor,
									});
								} else if (option == "BottomNavActive Text") {
									setBottomNavActiveTextColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										cardsColor: cardColor,
										bottomNav: {
											...bottomNav,
											tabBarActiveTintColor: item,
											tabBarIconStyles: item || tabBarActiveTintColor,
										},
										topNav: { ...topNav },
										cardsTextColor: cardTextColor,
									});
								} else if (option == "BottomNavInActive Text") {
									setBottomNavInActiveTextColor(item);
									setBgColor({
										bgColor: bColor,
										hColor: header,
										cardsColor: cardColor,
										bottomNav: {
											...bottomNav,
											tabBarInactiveTintColor: item,
										},
										topNav: { ...topNav },
										cardsTextColor: cardTextColor,
									});
								}
							}}
							style={{ flex: 1 }}
						/>
					</ScrollView>
					<Text style={{ flex: 1 }}>Font </Text>
				</View>
				<View
					style={{
						height: "12%",
						marginTop: 1,
						borderColor: "silver",
						// borderWidth: 1,
						// justifyContent: "center",
						alignItems: "center",
						backgroundColor: bottomNavColor,
						flexDirection: "row",
						// justifyContent: "space-around",
						width: WIDTH,
					}}
				>
					<View
						style={{
							width: WIDTH * 0.5,
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: tabBarActiveBackgroundColor,
						}}
					>
						<Text
							style={{
								textAlign: "center",
								color: bottomNavActiveTextColor,
							}}
						>
							BottomNavActive
						</Text>
					</View>
					<View
						style={{
							width: WIDTH * 0.5,
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: tabBarInActiveBackgroundColor,
						}}
					>
						<Text
							style={{
								textAlign: "center",
								color: bottomNavInActiveTextColor,
							}}
						>
							BottomNavInactive
						</Text>
					</View>
				</View>
			</View>
		);
	};

	return (
		<View style={[styles.container, { backgroundColor: bColor }]}>
			<View style={{ height: "20%" }}>
				<View
					style={{
						height: "50%",
						width: "100%",
						marginBottom: 1,
						borderColor: "silver",
						// borderWidth: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: topNavColor,
					}}
				>
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							alignItems: "center",
							// justifyContent: "flex-start",
						}}
					>
						<View style={{ justifyContent: "flex-start", marginLeft: 25, width: WIDTH * 0.4 }}>
							<TouchableOpacity
								onPress={() => {
									navigation.goBack();
								}}
							>
								<Icon name="arrow-left" color={topNavTextColor} size={HEIGHT * 0.02} />
							</TouchableOpacity>
						</View>
						<View style={{ justifyContent: "flex-start", width: WIDTH * 0.6 }}>
							<Text style={{ textAlign: "left", color: topNavTextColor, fontWeight: "bold" }}>Settings</Text>
						</View>
					</View>
				</View>
				<View
					style={{
						height: 100,
						width: "100%",
						marginTop: 0,
						padding: 0,
						backgroundColor: header,
						alignItems: "center",
						justifyContent: "center",
						borderColor: "silver",
						borderWidth: 1,
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontSize: HEIGHT * 0.035,
							fontWeight: "bold",
							color: HfColor,
						}}
					>
						Header
					</Text>
				</View>
			</View>
			<View style={{ height: "70%" }}>
				{BodyParts([
					"Body",
					"Header",
					"Body Text",
					"Header Text",
					"Card",
					"Cards Text",
					"Top Nav",
					"TopNav Text",
					"BottomNav Active",
					"BottomNav InActive",
					"BottomNavActive Text",
					"BottomNavInActive Text",
				])}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	radioButtonContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		flexWrap: "wrap",
		height: "60%",
	},
	radioButton: {
		margin: 1,
		alignItems: "center",
		flexDirection: "row",
		borderColor: "silver",
		borderWidth: 0.5,
		// borderRadius: 20,
		paddingLeft: 10,
		paddingRight: 10,
		width: "45%",
	},
	paragraph: {
		borderRadius: 50,
		margin: 3,
		alignItems: "center",
		borderColor: "silver",
		borderWidth: 0.5,
		// width: "5%",
		// height: "100%",
		// padding: 15,
	},
});

//                const storeData = async () => {
//                   try {
//                     await AsyncStorage.setItem("color", item);
//                   } catch (e) {
//                   }
//                 };
//                 storeData();
//                 // const getData = async () => {
//                 //   try {
//                 //     const value = await AsyncStorage.getItem("color");
//                 //     if (value !== null) {
//                 //       return value;
//                 //     }
//                 //   } catch (e) {
//                 //     // error reading value
//                 //   }
//                 // };
//                 // getData();
