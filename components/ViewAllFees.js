/** @format */

import React, { useState } from "react";
import ViewFeesChild from "./ViewFeeschild";
import { styles } from "../assets/styles/viewallfees";

import { View, ScrollView, Text, Modal, TouchableOpacity, Pressable, Alert } from "react-native";
import { Divider, DataTable } from "react-native-paper";
import axios from "axios";
import IP from "../Constants/NetworkIP";
import ColorsContext from "../ContextAPI/ColorsContext";
import LoginOrSignUp from "./generic_components/Login";
const instance = axios.create();
function ViewAllFees({ navigation }) {
	const [modal, viewModal] = useState(false);
	const [showLogin, setShowLogin] = useState("flex");
	const [hideLogin, setHideLogin] = useState("none");
	const [modalSem, viewModalSem] = useState(false);
	const [title, setTitle] = useState("");
	const [titleSem, setTitleSem] = useState("");
	const [user, setUser] = useState("");
	const [ee, setEE] = useState([]);
	const [feee, setFeee] = useState("");
	const { bgColor, font_Family } = React.useContext(ColorsContext);

	const [Semester, setSemester] = useState([
		{ Semester: "1st", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "2nd", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "3rd", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "4th", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "5th", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "6th", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "7th", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "8th", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "9th", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "10th", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "11th", paid: "Pending Fees Status", fee: 0 },
		{ Semester: "12th", paid: "Pending Fees Status", fee: 0 },
	]);
	const getDataEE = async (u, s) => {
		setEE([]);
		const user = {
			rollno: u,
			sems: s,
		};
		await instance
			.post(`${IP}/getExitEntry`, user)
			.then(function (response) {
				console.log(response.data);
				if (response.data.length == 0) {
					alert("No data found....");
					viewModalSem(true);
					viewModal(false);
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

	const getFees = async (u) => {
		setEE([]);
		let sem = [];
		const user = {
			rollno: u,
		};
		await instance
			.post(`${IP}/hostelSupervisor/getHostelFee`, user)
			.then(function (response) {
				if (response.data.length == 0) {
					alert("No data found....");
					viewModalSem(true);
					viewModal(false);
				} else {
					response.data.map((fee, index) => {
						if (fee.status == true) {
							sem.push({
								Semester: fee.semno,
								paid: "All Paid Fees Status",
								fee: fee.hostelfee,
							});
						} else if (fee.status == false) {
							sem.push({
								Semester: fee.semno,
								paid: "Pending Fees Status",
								fee: fee.hostelfee,
							});
						}
					});
				}

				setSemester(sem);
			})
			.catch(function (error) {
				alert(error.message.toString());
			});
	};

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
				<Modal animationType="slide" transparent={true} visible={modalSem}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<ScrollView>
								<Text style={[styles.modalText, { fontFamily: font_Family }]}>{titleSem}</Text>
								<Text
									style={{
										textAlign: "center",
										fontWeight: "bold",
										fontFamily: font_Family,
									}}
								>
									RegNo: {user}
								</Text>
								<Divider style={{ height: 2, width: "100%" }} />
								{title == "Entry Exit Status" ? (
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
															}}
														>
															<Text
																style={{
																	fontFamily: font_Family,
																	margin: 5,
																	fontSize: 12,
																	textAlign: "left",
																	flex: 1,
																}}
																onPress={() => displaySecurityManName(e.cnic)}
															>
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
																onPress={() => displaySecurityManName(e.cnic)}
															>
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
																onPress={() => displaySecurityManName(e.cnic)}
															>
																{e.cnic}
															</Text>
														</View>
														<Divider />
													</View>
												);
											})}
									</DataTable>
								) : (
									<Text
										style={{
											textAlign: "center",
											marginTop: 20,
											fontFamily: font_Family,
										}}
									>
										{feee}
									</Text>
								)}
							</ScrollView>
							<View style={{ justifyContent: "center" }}>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => {
										viewModal(true);
										viewModalSem(!modalSem);
									}}
								>
									<Text style={[styles.textStyle, { fontFamily: font_Family }]}>Close</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>

				<Modal animationType="fade" transparent={true} visible={modal}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={[styles.modalText, { fontFamily: font_Family }]}>{title}</Text>
							<ScrollView>
								{Semester.map((s) => {
									if (title == s.paid || title == "Entry Exit Status") {
										let tit = "Semester-" + s.Semester;
										return (
											<Text
												style={{
													fontWeight: "bold",
													backgroundColor: "lightgreen",
													padding: 10,
													margin: 10,
													fontFamily: font_Family,
												}}
												onPress={() => {
													viewModal(false);
													setTitleSem(tit);
													viewModalSem(true);
													if (title == "Entry Exit Status") getDataEE(user, s.Semester);
													else {
														setFeee(s.fee);
													}
												}}
												key={s.Semester}
											>
												Semester-{s.Semester}
											</Text>
										);
									}
								})}
							</ScrollView>
							<View style={{ justifyContent: "center", width: "100%" }}>
								<Pressable style={[styles.button, styles.buttonClose]} onPress={() => viewModal(!modal)}>
									<Text style={[styles.textStyle, { fontFamily: font_Family }]}>Close</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						style={styles.childViews}
						onPress={() => {
							getFees(user);
							setTitle("All Paid Fees Status");
							viewModal(!modal);
						}}
					>
						<ViewFeesChild title="Fees Paid Status" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.childViews}
						onPress={() => {
							getFees(user);
							setTitle("Pending Fees Status");
							viewModal(!modal);
						}}
					>
						<ViewFeesChild title="Pending Fees Status" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.childViews}
						onPress={() => {
							setTitle("Entry Exit Status");
							viewModal(!modal);
						}}
					>
						<ViewFeesChild title="Entry Exit Status" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
export default React.memo(ViewAllFees);
