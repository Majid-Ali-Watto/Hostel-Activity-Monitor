/** @format */

import { View, StyleSheet, Text, ImageBackground } from "react-native";

export default function SplashScreen() {
	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.img}
				resizeMode="stretch"
				// source={require('../../assets/Images/splash.gif')}
				source={require("../../assets/Images/host1.webp")}
			></ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#03C03C",
	},
	img: {
		width: "100%",
		height: "100%",

		justifyContent: "center",
		alignItems: "center",
		// opacity: 0.8,
	},
});
