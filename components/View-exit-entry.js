import React, { useState,useContext,useEffect } from "react";
import { Text, View, StyleSheet, Dimensions,ScrollView } from "react-native";
import Constants from "expo-constants";
import ColorsContext from "../ContextAPI/ColorsContext";
import { Divider, DataTable } from "react-native-paper";
// import { styles } from "../assets/styles/viewallfees";

import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
const instance = axios.create();
import IP from "../Constants/NetworkIP";
const WIDTH = Dimensions.get("window").width;
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
	{ key: "10th", value: "10th" },
	{ key: "11th", value: "11th" },
	{ key: "12th", value: "12th" },
];
export default function ViewExitEntry({route}) {
	const [sem, setSem] = useState(null);
	const [ee, setEE] = useState([]);
    const [user] = useState(route.params.user);
    const { bgColor, font_Family } = useContext(ColorsContext);

    useEffect(()=>{
        getSemester()
    },[])
    const getSemester = async () => {
		
		await instance
			.post(`${IP}/students/getSemester`, {rollno:user})
			.then(function (response) {		 

                if(response.data!=undefined) {
                    setSem(response.data.toString()[0])
                    // setSem(response.data.toString()[0]) 
                    // console.log(sem);
                    // getDataEE(user, response.data)
                }
			})
			.catch(function (error) {
				alert(error.message.toString());
			});
	};
	const getDataEE = async (u, s) => {
		setEE([]);
		const user = {
			rollno: u,
			sems: s,
		};
        console.log('user ',user);
		await instance
			.post(`${IP}/ExitEntry/getExitEntry`, user)
			.then(function (response) {
				console.log(response.data);
				if (response.data.length == 0) {
					alert("No data found....");
					
				} else setEE(response.data);
			})
			.catch(function (error) {
				alert(error.message.toString());
			});
	};
	const displaySecurityManName = async (id) => {
		await instance
			.get(`${IP}/securitySupervosor/${id}`)
			.then(function (response) {
				if (response.data.length == 0) {
					alert("No data found....");
				} else Alert.alert("Details", "Name : " + response.data[0].name + "\nCNIC : " + response.data[0].cnic);
			})
			.catch(function (error) {
				alert(error.message.toString());
			});
	};
	return (
		<View style={[styles.container,{backgroundColor:bgColor}]}>
			<SelectList
				setSelected={(val) => {
                    setSem(val);
                    getDataEE(user,val)}}
				data={sems}
				save="value"
				search={false}
				maxHeight={150}
				boxStyles={{
					borderRadius: 5,
					height: 43,
					width: WIDTH * 0.95,
					backgroundColor: "white",
					position: "relative",
					// right: -22,
				}} //override default styles
				dropdownStyles={{ backgroundColor: "white" }}
				defaultOption={sems[sem-1]}
			/>
            
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<ScrollView>
						{/* <Text style={[styles.modalText, { fontFamily: font_Family }]}>{sem}</Text> */}
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
                                margin:10,
								fontFamily: font_Family,
							}}>
							RegNo: {user}
						</Text>
						<Divider style={{ height: 2, width: "100%" }} />
						
							<DataTable>
								<DataTable.Header>
									<DataTable.Title>Date/Time</DataTable.Title>
									<DataTable.Title>Status</DataTable.Title>
									<DataTable.Title numeric>Recorded By</DataTable.Title>
								</DataTable.Header>

								{ee &&
									ee.map((e) => {
										return (
											<View key={e.datetime + e.status}>
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
															textAlign: "left",
															flex: 1,
														}}
														onPress={() => displaySecurityManName(e.cnic)}>
														{e.datetime}
													</Text>
													<Text
														style={{
															fontFamily: font_Family,
															margin: 5,
															fontSize: 12,
															textAlign: "left",
															flex: 1,
														}}
														onPress={() => displaySecurityManName(e.cnic)}>
														{e.status}
													</Text>
													<Text
														style={{
															fontFamily: font_Family,
															margin: 5,
															fontSize: 12,
															textAlign: "left",
															flex: 1,
														}}
														onPress={() => displaySecurityManName(e.cnic)}>
														{e.cnic}
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "#ecf0f1",
		padding: 8,
	},
});
