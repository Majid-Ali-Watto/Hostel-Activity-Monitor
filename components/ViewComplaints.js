/** @format */

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, Alert, ScrollView, RefreshControl } from "react-native";
import { Card, Divider, TextInput } from "react-native-paper";
import IP from "../Constants/NetworkIP";
import ColorsContext from "../ContextAPI/ColorsContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
const instance = axios.create();
import compStatuses from "../Constants/compStatuses";
import { getUserP, getUserRole } from "../ContextAPI/userContext";
import { styles } from "../assets/styles/viewcomplaints";
import { HEIGHT, WIDTH } from "../Constants/GlobalWidthHeight";
function ViewComplaints() {
	const [, setUser] = useState("");
	const [complaints, setComplaints] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedComplaint, setSelectedComplaint] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const { bgColor, cardsColor, cardsTextColor, font_Family } = React.useContext(ColorsContext);
	const [refreshing, setRefreshing] = useState(false);

	const fetchComplaints = async () => {
		try {
			const { data } = await instance.get(`${IP}/allComplaints`);
			let comps = [];
			data.map((item) => {
				if (item.complainer == getUserP()) comps.unshift(item);
				else comps.push(item);
			});
			setComplaints(comps);
		} catch (error) {
			alert(error.message.toString());
		}
	};

	useEffect(() => {
		fetchComplaints();
		setUser(getUserP());
	}, []);
	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		fetchComplaints();
		setRefreshing(false);
	});

	const filteredComplaints = complaints.filter((complaint) => {
		switch (true) {
			case complaint.title.toLowerCase().includes(searchTerm.toLowerCase()):
			case complaint.id.includes(searchTerm):
			case complaint.complainer.includes(searchTerm):
			case complaint.body.includes(searchTerm.toLowerCase()):
				return true;
			default:
				return false;
		}
	});
	const updateComp = async (status, id) => {
		const payloadset = {
			status,
			compID: id,
		};

		await instance
			.patch(`${IP}/updateCompStatus`, payloadset)
			.then(function (response) {
				alert(response.data);
			})
			.catch(function (error) {
				alert(error.message.toString());
			});
	};
	const handleDeletePress = (complaintId) => {
		Alert.alert(
			"Confirmation",
			"Are you sure you want to proceed?",
			[
				{ text: "No", style: "cancel" },
				{
					text: "Yes",
					onPress: async () => {
						await instance
							.delete(`${IP}/removeComp/${complaintId}`)
							.then(function (response) {
								if (response.data == "Complaint deleted")
									setComplaints(complaints.filter((complaint) => complaint.id !== complaintId));
								else if (response.data == "Complaint not deleted") {
									alert("Complaint not deleted");
								}
							})
							.catch(function (error) {
								alert(error.message.toString());
							});
					},
				},
			],
			{ cancelable: false }
		);
	};
	const handleComplaintPress = (complaint) => {
		setSelectedComplaint(complaint);
		setModalVisible(true);
	};

	return (
		<View style={[styles.container, { backgroundColor: bgColor }]}>
			<View style={{ width: "100%" }}>
				<TextInput
					placeholder="Search complaints"
					placeholderTextColor="silver"
					onChangeText={(text) => setSearchTerm(text)}
					value={searchTerm}
					style={styles.searchBar}
				/>
			</View>

			{/* <Divider style={styles.divider} /> */}
			<View style={styles.compCountSec}>
				<Text style={[styles.compCount, { fontFamily: font_Family }]}>Total: {filteredComplaints.length}</Text>
			</View>

			<View style={{ flex: 1, backgroundColor: bgColor }}>
				<FlatList
					data={filteredComplaints}
					renderItem={renderCompCard(cardsColor, handleComplaintPress, font_Family, cardsTextColor, handleDeletePress)}
					keyExtractor={(item) => item.id}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					style={[styles.complaintsList, { backgroundColor: bgColor }]}
				/>
			</View>

			{selectedComplaint &&
				renderCompModal(modalVisible, setModalVisible, selectedComplaint, bgColor, font_Family, cardsColor, cardsTextColor, updateComp)}
		</View>
	);
}
export default React.memo(ViewComplaints);
function renderCompModal(modalVisible, setModalVisible, selectedComplaint, bgColor, font_Family, cardsColor, cardsTextColor, updateComp) {
	return (
		<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
			{selectedComplaint && (
				<View style={[styles.modalContainer, { backgroundColor: bgColor }]}>
					{console.log(selectedComplaint)}
					<Text
						style={[
							styles.modalTitle,
							{
								fontFamily: font_Family,
								backgroundColor: cardsColor,
								color: cardsTextColor,
							},
						]}
					>
						{selectedComplaint.title}
					</Text>
					<View style={{ flex: 1 }}>
						<Text
							style={{
								width: "100%",
								height: "7%",
								fontSize: HEIGHT * 0.018,
								fontFamily: font_Family,
								marginTop: 2,
							}}
						>
							Complaint ID: {selectedComplaint.id} | Complaint By : {selectedComplaint.complainer}
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								style={{
									textAlign: "left",
									fontWeight: "bold",
									// marginTop: 10,
									fontSize: HEIGHT * 0.027,
									fontFamily: font_Family,
								}}
							>
								DESCRIPTION
							</Text>
							<View>
								<SelectList
									search={false}
									setSelected={(val) => {
										updateComp(val, selectedComplaint.id);
									}}
									data={compStatuses}
									save="value"
									// maxHeight={getUserRole() == "Hostel Supervisor" ? 150:0}
									boxStyles={{
										height: 44,
										width: 120,
										backgroundColor: bgColor,
										position: "relative",
									}}
									dropdownStyles={{
										backgroundColor: bgColor,
										fontFamily: font_Family,
										height: getUserRole() == "Hostel Supervisor" ? 150 : 0,
										borderWidth: getUserRole() == "Hostel Supervisor" ? 1 : 0,
									}}
									// defaultOption={selectedComplaint.status}
									placeholder={selectedComplaint.status}
								/>
							</View>
						</View>
						<ScrollView>
							<Text style={[styles.modalDescription, { fontFamily: font_Family }]}>{selectedComplaint.body}</Text>
						</ScrollView>
					</View>
					<TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
						<Text style={[styles.modalCloseButtonText, { fontFamily: font_Family }]}>Close</Text>
					</TouchableOpacity>
				</View>
			)}
		</Modal>
	);
}

function renderCompCard(cardsColor, handleComplaintPress, font_Family, cardsTextColor, handleDeletePress) {
	return ({ item }) => (
		<Card style={[styles.complaintContainer, { backgroundColor: cardsColor }]}>
			<TouchableOpacity onPress={() => handleComplaintPress(item)}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						fontFamily: font_Family,
						width: WIDTH * 0.9,
					}}
				>
					<Text style={[styles.complaintTit, { fontFamily: font_Family, color: cardsTextColor }]}>{item.title}</Text>

					{item.complainer == getUserP() && (
						<Icon
							name="trash"
							color="red"
							size={20}
							onPress={() => {
								handleDeletePress(item.id);
							}}
						/>
					)}
				</View>
				<Divider />
				<Text style={[styles.id, { fontFamily: font_Family, color: cardsTextColor }]}>ComplaintId:{item.id}</Text>
				<Text style={[styles.complainer, { fontFamily: font_Family, color: cardsTextColor }]}>Complainer:{item.complainer}</Text>
			</TouchableOpacity>
		</Card>
	);
}
