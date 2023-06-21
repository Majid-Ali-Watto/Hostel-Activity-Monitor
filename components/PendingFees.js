/** @format */

import React, { useState, useEffect, useContext } from "react";
import { styles } from "../assets/styles/viewallfees";
import { View, ScrollView, Text } from "react-native";
import { Divider, DataTable } from "react-native-paper";
import axios from "axios";
const instance = axios.create();
import IP from "../Constants/NetworkIP";
import ColorsContext from "../ContextAPI/ColorsContext";
function PendingFees({ route }) {
	const [user] = useState(route.params.user);
	const [ee, setEE] = useState([]);

	const { bgColor, font_Family } = useContext(ColorsContext);

	useEffect(() => {
		getFees(user);
	}, []);
	const getFees = async (u) => {
		setEE([]);
		let sem = [];
		const user = {
			rollno: u,
		};
		await instance
			.post(`${IP}/students/getMessFee`, user)
			.then(function (response) {
				if (response.data.length == 0 || response.data == undefined) {
					alert("No data found....");
				} else {
					setEE(response.data);
				}
			})
			.catch(function (error) {
				alert(error.message.toString());
			});
	};

	return (
		<View style={[styles.mainView, { backgroundColor: bgColor }]}>
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Text
						style={{
							textAlign: "center",
							fontWeight: "bold",
							margin: 10,
							fontFamily: font_Family,
						}}>
						RegNo: {user}
					</Text>
					<Divider style={{ height: 2, width: "100%" }} />

					<DataTable style={{ margin: 1 }}>
						<DataTable.Header style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
							<DataTable.Title>Mess Fee</DataTable.Title>
							<DataTable.Title>Status</DataTable.Title>
							<DataTable.Title>Month</DataTable.Title>
                            <DataTable.Title>Year</DataTable.Title>
						</DataTable.Header>
						{ee.length > 0 &&
							ee.map((e, index) => {
								return (
									<View key={index}>
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
											}}>
											<Text
												style={{
													fontFamily: font_Family,
													margin: 5,
													fontSize: 12,
													textAlign: "center",
													flex: 1,
												}}
												// onPress={() => displaySecurityManName(e.cnic)}
											>
												{e.messfee}
											</Text>
											<Text
												style={{
													fontFamily: font_Family,
													margin: 5,
													fontSize: 12,
													textAlign: "left",
													flex: 1,
												}}
												// onPress={() => displaySecurityManName(e.cnic)}
											>
												{e.mStatus == false ? "Pending" : "Paid"}
											</Text>

											<Text
												style={{
													fontFamily: font_Family,
													margin: 5,
													fontSize: 12,
													textAlign: "left",
													flex: 1,
												}}
												// onPress={() => displaySecurityManName(e.cnic)}
											>
												{e.monthname}
											</Text>
                                            <Text
												style={{
													fontFamily: font_Family,
													margin: 5,
													fontSize: 12,
													textAlign: "left",
													flex: 1,
												}}
												// onPress={() => displaySecurityManName(e.cnic)}
											>
												{e.year}
											</Text>
										</View>
										<Divider />
									</View>
								);
							})}
					</DataTable>
				</ScrollView>
			</View>
		</View>
	);
}
export default React.memo(PendingFees);
