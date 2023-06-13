/** @format */

import React, { useState, useEffect,useContext } from "react";
import { Text, View, StyleSheet, Image, ImageBackground, Dimensions, ScrollView,TouchableOpacity } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getUserRole } from "../ContextAPI/userContext";
import axios from "axios";
const instance = axios.create();
import IP from "../Constants/NetworkIP";
import {  Card } from "react-native-paper";
import ColorsContext from "../ContextAPI/ColorsContext";

import { WIDTH } from "../Constants/GlobalWidthHeight";
const HEIGHT = Dimensions.get("window").height;
export default function UserProfile({ route }) {
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [sem, setSem] = useState(route.params.uri.semno);
	const [uri, setUri] = useState(route.params.uri);
	const { bgColor, cardsColor, cardsTextColor, font_Family } = useContext(ColorsContext);

	// const statusText = (status === false || status === undefined ? "Pending" : "Paid") + "-->" + "Rs. " + hostelfee;
	// const mStatusText = (mStatus === false || mStatus === undefined ? "Pending" : "Paid") + "-->" + "Rs. " + messfee;

	//   const [showMonths, setShowMonths] = React.useState(false);
	let labels = ["Reg No.", "Department", "Program", "Semester", "Hostel Fee Status", "Mess Fee Status"];
	const months = [
		{ key: 1, value: 1 },
		{ key: 2, value: 2 },
		{ key: 3, value: 3 },
		{ key: 4, value: 4 },
		{ key: 5, value: 5 },
		{ key: 6, value: 6 },
		{ key: 7, value: 7 },
		{ key: 8, value: 8 },
		{ key: 9, value: 9 },
		{ key: 10, value: 10 },
		{ key: 11, value: 11 },
		{ key: 12, value: 12 },
	];

	const years = [
		{ key: 2020, value: 2020 },
		{ key: 2021, value: 2021 },
		{ key: 2022, value: 2022 },
		{ key: 2023, value: 2023 },
		{ key: 2024, value: 2024 },
		{ key: 2025, value: 2025 },
		{ key: 2026, value: 2026 },
		{ key: 2027, value: 2027 },
		{ key: 2028, value: 2028 },
		{ key: 2029, value: 2029 },
		{ key: 2030, value: 2030 },
	];
	const sems = [
		{ key: "1st", value: "1st" },
		{ key: "2nd", value: "2nd" },
		{ key: "3rd", value: "3rd" },
		{ key: "4th", value: "4th" },
		{ key: "5th", value: "5th" },
		{ key: "6th", value: "6th" },
		{ key: "7th", value: "7th" },
		{ key: "8th", value: "8th" },
		{ key: "9th", value: "9th" },
		{ key: "10th", value: " 10th" },
		{ key: "11th", value: " 11th" },
		{ key: "12th", value: " 12th" },
	];

	useEffect(() => {
		// getSemesterFee
		getUserRole() == "Mess Supervisor" ? getMessFee() : getUserRole() == "Hostel Supervisor" ?getHostelFee():null;
	}, []);
	const getMessFee = async () => {
		const response = await instance.post(`${IP}/students/getMonthFee`, {
			month,
			year,
			rollno: uri.rollno,
		});
		console.log(response.data);
		if (response.data.length == 0) {
			alert(`Mess Fee of ${month},${year} is not Available`);
			setUri({ ...uri, messfee: 0 });
		} else setUri({ ...uri, messfee: (response.data[0].mStatus === false || response.data[0].mStatus === undefined ? "Pending" : "Paid") + "-->" + "Rs. " +  response.data[0].messfee || 0 });
	};
	const getHostelFee = async () => {
		const response = await instance.post(`${IP}/students/getSemesterFee`, {
			sem,
			rollno: uri.rollno,
		});
		console.log(response.data);
		if (response.data.length == 0) {
			alert(`Hostel Fee of ${sem} Semester is not Available`);
			setUri({ ...uri, hostelfee: 0 });
		} else setUri({ ...uri, hostelfee: (response.data[0].status === false || response.data[0].status === undefined ? "Pending" : "Paid") + "-->" + "Rs. " +  response.data[0].hostelfee || 0 });
	};
	function renderProfileCard(uri, labels) {
		return (
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<Card style={[stylesn.card,{backgroundColor:cardsColor,color:cardsTextColor}]} key={'profile card'}>
					<View style={stylesn.imageSec}>
						<Image
							source={{ uri: uri.image }}
							style={stylesn.img}
						/>
					</View>
					<Text style={[stylesn.header,{color:cardsTextColor,fontFamily: font_Family,}]}>{uri.sname.toUpperCase()}</Text>
					<Text style={stylesn.divider}></Text>
					{labels.map((l, index) => {
						return (
							<View>
								<View style={stylesn.row}>
									<Text
										style={{
											width: "35%",
											fontWeight: "bold",
											color:cardsTextColor,
											fontFamily: font_Family,
											display: getUserRole() == "Mess Supervisor" && l == "Hostel Fee Status" ? "none" : getUserRole() == "Hostel Supervisor" && l == "Mess Fee Status" ? "none" : "flex",
										}}>
										{l}
									</Text>
									{/* <Text style={{ marginLeft: 3, marginRight: 5 }}> | </Text> */}
									<Text
										style={{
											width: "50%",
											color:cardsTextColor,
											fontFamily: font_Family,
											display: getUserRole() == "Mess Supervisor" && l == "Hostel Fee Status" ? "none" : getUserRole() == "Hostel Supervisor" && l == "Mess Fee Status" ? "none" : "flex",
										}}>
										{Object.values(uri)[index + 2] || 0}
									</Text>
								</View>
								<View style={stylesn.dividerInner}></View>
							</View>
						);
					})}
					<TouchableOpacity
						onPress={() => {
							getUserRole() == "Mess Supervisor" ? getMessFee() : getHostelFee()
							}}
						style={stylesn.appButtonContainer}>
						<Text style={stylesn.appButtonText}>Search</Text>
					</TouchableOpacity>
					{/* <Button
						style={{ width: "100%", backgroundColor: "lightgreen", marginTop: 20 }}
						onPress={() => getMessFee()}>
						Search
					</Button> */}
				</Card>
			</ScrollView>
		);
	}
	return (
		<View style={[stylesn.container,{backgroundColor:bgColor}]}>
			<View style={{ display: getUserRole() == "Mess Supervisor" ? "flex" : "none", flexDirection: "row", padding: 8 }}>
				<SelectList
					setSelected={(val) => setMonth(val)}
					data={months}
					save="value"
					search={false}
					maxHeight={150}
					boxStyles={{
						borderRadius: 5,
						height: 43,
						width: WIDTH * 0.45,
						backgroundColor: "white",
						position: "relative",
						// right: -22,
					}} //override default styles
					dropdownStyles={{ backgroundColor: "white" }}
					defaultOption={{ key: new Date().getMonth() + 1, value: new Date().getMonth() + 1 }}
				/>
				<SelectList
					setSelected={(val) => setYear(val)}
					data={years}
					save="value"
					search={false}
					maxHeight={150}
					boxStyles={{
						borderRadius: 5,
						height: 43,
						width: WIDTH * 0.45,
						backgroundColor: "white",
						position: "relative",
						// right: -22,
					}} //override default styles
					dropdownStyles={{ backgroundColor: "white" }}
					defaultOption={{ key: new Date().getFullYear(), value: new Date().getFullYear() }}
				/>
			</View>
			<View style={{ display: getUserRole() == "Hostel Supervisor" ? "flex" : "none", flexDirection: "row", padding: 8 }}>
				<SelectList
					setSelected={(val) => setSem(val)}
					data={sems}
					save="value"
					search={false}
					maxHeight={150}
					boxStyles={{
						borderRadius: 5,
						height: 43,
						width: WIDTH * 0.9,
						backgroundColor: "white",
						position: "relative",
						// right: -22,
					}} //override default styles
					dropdownStyles={{ backgroundColor: "white" }}
					defaultOption={{ key: route.params.uri.semno, value: route.params.uri.semno }}
				/>
			</View>
			<View
				style={{
					display: getUserRole() == "Security Supervisor" ? "flex" : "none",
					flex: 1,
				}}>
				<ImageBackground
					source={{ uri: uri.image }}
					// resizeMode="contain"
					style={{
						flex: 1,
						margin: 0,
						padding: 0,
					}}></ImageBackground>
			</View>
			<View
				style={{
					display: getUserRole() != "Security Supervisor" ? "flex" : "none",
					flex: 1,
				}}>
				{uri && renderProfileCard(uri, labels)}
			</View>
		</View>
	);
}

const stylesn = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		// paddingTop: Constants.statusBarHeight,
		backgroundColor: "lightgreen", //"#ecf0f1",
		padding: 8,
	},

	card: {
		height: "100%",
		// justifyContent: 'center',
		padding: 5,
		backgroundColor: "white",
		borderRadius: 8,
		shadowColor: "#52006A",
		elevation: 20,
	},
	header: {
		margin: 24,
		fontSize: HEIGHT * 0.03,
		fontWeight: "bold",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	headerConfirm: {
		fontSize: HEIGHT * 0.025,
		fontWeight: "bold",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	imageSec: {
		width: "100%",
		height: "35%",
		// flexDirection: 'row',
		justifyContent: "center",
		alignItems: "center",
	},
	img: {
		width: "50%",
		height: "100%",
		// margin: 24,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 24,
	},
	label: {
		margin: 14,
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "left",
		width: "30%",
		borderRightWidth: 1,
		borderColor: "silver",
	},
	value: {
		margin: 14,
		marginLeft: 1,
		fontSize: 14,
		textAlign: "left",
		width: "65%",
	},
	divider: {
		height: 1,
		width: "100%",
		backgroundColor: "darkgray",
	},
	dividerInner: {
		height: 1,
		width: "100%",
		backgroundColor: "lightgray",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 8,
	},
	appButtonContainer: {
		elevation: 8,
		backgroundColor: "#0000FF",//"#009688",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginTop: 20
	  },
	  appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase"
	  }
});
