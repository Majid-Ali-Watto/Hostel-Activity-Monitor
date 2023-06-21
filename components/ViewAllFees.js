/** @format */

import React, { useState } from "react";
import ViewFeesChild from "./ViewFeeschild";
import { styles } from "../assets/styles/viewallfees";
import { View, TouchableOpacity } from "react-native";

import ColorsContext from "../ContextAPI/ColorsContext";
import LoginOrSignUp from "./generic_components/Login";
function ViewAllFees({ navigation }) {
	const [showLogin, setShowLogin] = useState("flex");
	const [hideLogin, setHideLogin] = useState("none");
	const [user, setUser] = useState("");


	const { bgColor, font_Family } = React.useContext(ColorsContext);

	

	return (
		<View style={[styles.mainView, { backgroundColor: bgColor }]}>
			<View style={{ flex: 1, display: showLogin }}>
				<LoginOrSignUp
					navigation={navigation}
					userData={["students", "RegNo", 11, "Student"]}
					hideLogin={setHideLogin}
					showLogin={setShowLogin}
					setUserData={setUser}
				/>
			</View>
			<View style={{ flex: 1, display: hideLogin }}>
				

			
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<TouchableOpacity
						style={styles.childViews}
						onPress={()=>navigation.navigate('Hostel Fees',{user: user})}>
						<ViewFeesChild title="Hostel Fees Status" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.childViews}
						onPress={()=>navigation.navigate('Mess Fees',{user: user})}>
						<ViewFeesChild title="Mess Fees Status" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.childViews}
						onPress={()=>navigation.navigate('View Exit Entry',{user: user})}>
						<ViewFeesChild title="Entry Exit Status" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
export default React.memo(ViewAllFees);
