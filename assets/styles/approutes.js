/** @format */

import { StyleSheet } from "react-native";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";

const getAlignment = (j, a) => {
	return {
		justifyContent: j,
		alignItems: a,
	};
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		...getAlignment("space-between", "center"),
	},
	header: {
		// flex: 0.3,
		height: HEIGHT * 0.3,
		width: WIDTH,
	},

	cardContainer: {
		// flex: 0.7,
		height: HEIGHT * 0.6,
		marginTop: 5,
		marginBottom: 5,
		width: WIDTH,
		...getAlignment("space-evenly", "center"),
	},
	card: {
		width: WIDTH * 0.92,
		height: HEIGHT * 0.1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 8,
		shadowColor: "#52006A",
		elevation: 20,
	},

	cardtext: {
		fontSize: HEIGHT * 0.023,
		textAlign: "left",
		padding: HEIGHT * 0.03,
		textTransform: "uppercase",
		// fontWeight: "bold",
		// color: "black",
		width: "100%",
	},
});

export { styles };
