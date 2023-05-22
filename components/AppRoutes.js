/** @format */

import React, { useCallback, useContext, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Card } from "react-native-paper";
import Header from "./Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import mainButtons from "../Constants/mainButtons";
import { styles } from "../assets/styles/approutes";
import SplashScreen from "./generic_components/SplashScreen";
import ColorsContext from "../ContextAPI/ColorsContext";
import { HEIGHT } from "../Constants/GlobalWidthHeight";

export default function AppRoutes({ navigation }) {
	const [display, setDisplay] = useState("flex");
	const [displayRoute, setDisplayRoute] = useState("none");
	const { bgColor, hColor, cardsColor, cardsTextColor, font_Family } = useContext(ColorsContext);
	const icons = ["user-graduate", "user-lock", "user-check", "user-secret"];

	const handleSettingsPress = useCallback(() => {
		navigation.navigate("Settings");
	}, [navigation]);

	const handleMenuPress = useCallback(() => {
		navigation.navigate("Menu");
	}, [navigation]);

	const disp = () => {
		setTimeout(() => {
			setDisplay("none");
			setDisplayRoute("flex");
		}, 5000);
		return (
			<View style={{ height: "100%", width: "100%", display: display }}>
				<SplashScreen />
			</View>
		);
	};
	const renderCardItem = useCallback(
		({ item, index }) => {
			return (
				<Card
					style={[styles.card, { backgroundColor: cardsColor }]}
					onPress={() => {
						navigation.navigate(Object.entries(item)[0][0]);
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
						}}
					>
						<View
							style={{
								width: "25%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Icon name={icons[index]} color={cardsTextColor} size={HEIGHT * 0.03} />
						</View>
						<View
							style={{
								borderRightColor: "silver",
								borderWidth: 0.5,
								height: 50,
							}}
						></View>
						<View
							style={{
								width: "75%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text style={[styles.cardtext, { fontFamily: font_Family, color: cardsTextColor }]}>{Object.entries(item)[0][1]}</Text>
						</View>
					</View>
				</Card>
			);
		},
		[navigation, cardsColor]
	);

	return (
		<View style={[styles.container, { backgroundColor: bgColor }]}>
			{display === "flex" && disp()}
			<View style={[styles.container, { backgroundColor: bgColor, display: displayRoute }]}>
				<View style={[styles.header, { backgroundColor: hColor, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }]}>
					<Header />
				</View>
				<View style={styles.cardContainer}>
					<FlatList
						data={mainButtons}
						keyExtractor={(item, index) => index.toString()}
						renderItem={renderCardItem}
						contentContainerStyle={styles.cardContainer}
					/>
				</View>
				<View
					style={{
						height: "5%",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						borderTopColor: "silver",
						borderTopWidth: 0.5,
					}}
				>
					<Text
						onPress={handleSettingsPress}
						style={{
							width: "50%",
							borderRightWidth: 0.5,
							textAlign: "center",
							fontWeight: "bold",
							fontFamily: font_Family,
						}}
					>
						App Settings
					</Text>
					{/* <Icon
						name="settings"
						color={cardsTextColor}
						size={HEIGHT * 0.03}
						// size={"5%"}
					/> */}
					<Text
						onPress={handleMenuPress}
						style={{
							width: "50%",
							textAlign: "center",
							fontWeight: "bold",
							fontFamily: font_Family,
						}}
					>
						View Mess Menu
					</Text>
				</View>
			</View>
		</View>
	);
}
