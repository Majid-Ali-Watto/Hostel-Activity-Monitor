/** @format */

import { View, Text } from "react-native";
import { styles } from "../assets/styles/viewfeeschild";
import React from "react";
import PropTypes from "prop-types";
import ColorsContext from "../ContextAPI/ColorsContext";

export default function ViewFeesChild({ title }) {
	const { bgColor, cardsColor, cardsTextColor, font_Family } = React.useContext(ColorsContext);

	return (
		<View style={[styles.mainView, { backgroundColor: bgColor }]}>
			<View style={[styles.childViews1, { backgroundColor: cardsColor }]}>
				<Text style={[styles.text1, { fontFamily: font_Family, color: cardsTextColor }]}>{title}</Text>
			</View>
		</View>
	);
}

ViewFeesChild.propTypes = {
	title: PropTypes.string.isRequired,
};
