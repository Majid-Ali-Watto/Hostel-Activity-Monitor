/** @format */

import { StyleSheet, Dimensions } from "react-native";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		padding: 0,
		margin: 0,
	},
	childViews: {
		height: HEIGHT * 0.2,
		width: WIDTH * 0.95,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		justifyContent: "center",
		backgroundColor: "white",
		// borderRadius: 20,
		padding: 10,
		height: HEIGHT * 0.8,
		width: WIDTH * 0.99,
		// shadowOpacity: 0.25,
		shadowRadius: 8,
		borderRadius: 8,
		shadowColor: "#52006A",
		elevation: 20,
	},
	button: {
		// backgroundColor: "#0000FF",
		fontWeight: "bold",
		padding: 8,
		// margin: 10,
		borderRadius: 20,
		// width: WIDTH,
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 24,
	},
});

export { styles };
