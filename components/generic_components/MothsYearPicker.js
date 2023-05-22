/** @format */

// import * as React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// export default function MonthYear(props) {
//   const [month, setMonth] = React.useState(new Date().getMonth() + 1);
//   const [year, setYear] = React.useState(new Date().getFullYear());

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: props.bgColor || '#ecf0f1',
//           width:props.width
//          },
//       ]}>
//       <View style={styles.datecontainer}>
//         <View style={styles.monthcontainer}>
//         <View style={{
//               width: '10%',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//           <Icon
//             name="arrow-left"
//             size={props.iconSize || 15}
//             onPress={() => {
//               if (month < 2) {
//                 setMonth(12);
//                 props.setMonth(12);
//               } else {
//                 setMonth(month - 1);
//                 props.setMonth(month - 1);
//               }
//             }}
//           />
//           </View>
//           <View
//             style={{
//               width: '10%',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text>{month}</Text>
//           </View>
//           <View style={{
//               width: '10%',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//           <Icon
//             name="arrow-right"
//             size={props.iconSize || 15}
//             onPress={() => {
//               if (month >11) {
//                 setMonth(1);
//                 props.setMonth(1);
//               } else {
//                 setMonth(month + 1);
//                 props.setMonth(month + 1);
//               }
//             }}
//           />
//           </View>
//         </View>
//         <View style={styles.yearcontainer}>
//           <Icon
//             name="minus"
//             size={props.iconSize || 15}
//             onPress={() => {
//               setYear(year - 1);
//               props.setYear(year-1)
//             }}
//           />
//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text style={{ textAlign: 'center' }}>{year}</Text>
//           </View>
//           <Icon
//             name="plus"
//             size={props.iconSize || 15}
//             onPress={() => {
//               setYear(year + 1);
//               props.setYear(year+1)
//             }}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',

//   },
//   monthcontainer: {
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     padding: 24,
//     width: '50%',
//     flexDirection: 'row',
//   },
//   yearcontainer: {
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     padding: 24,
//     width: '50%',
//     flexDirection: 'row',
//   },
//   datecontainer: {
//     justifyContent: 'space-between',
//     width: '100%',
//     flexDirection: 'row',
//   },
// });

// // import * as React from 'react';
// // import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
// // import Icon from 'react-native-vector-icons/FontAwesome5';

// // export default function MonthYear(props) {
// //   const [month, setMonth] = React.useState(() => new Date().getMonth() + 1);
// //   const [year, setYear] = React.useState(() => new Date().getFullYear());

// //   const memoizedMonth = React.useMemo(() => month, [month]);
// //   const memoizedYear = React.useMemo(() => year, [year]);

// //   const handleMonthDecrement = React.useCallback(() => {
// //     if (memoizedMonth < 2) {
// //       setMonth(12);
// //       props.setMonth(12);
// //     } else {
// //       setMonth(memoizedMonth - 1);
// //       props.setMonth(memoizedMonth - 1);
// //     }
// //   }, [memoizedMonth, props]);

// //   const handleMonthIncrement = React.useCallback(() => {
// //     if (memoizedMonth > 11) {
// //       setMonth(1);
// //       props.setMonth(1);
// //     } else {
// //       setMonth(memoizedMonth + 1);
// //       props.setMonth(memoizedMonth + 1);
// //     }
// //   }, [memoizedMonth, props]);

// //   const handleYearDecrement = React.useCallback(() => {
// //     setYear(memoizedYear - 1);
// //     props.setYear(memoizedYear - 1);
// //   }, [memoizedYear, props]);

// //   const handleYearIncrement = React.useCallback(() => {
// //     setYear(memoizedYear + 1);
// //     props.setYear(memoizedYear + 1);
// //   }, [memoizedYear, props]);

// //   return (
// //     <View
// //       style={[
// //         styles.container,
// //         {
// //           backgroundColor: props.bgColor || '#ecf0f1',
// //           width: props.width,
// //         },
// //       ]}
// //     >
// //       <View style={styles.datecontainer}>
// //         <View style={styles.monthcontainer}>
// //           <View
// //             style={{
// //               width: '10%',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //             }}
// //           >
// //             <Icon
// //               name="arrow-left"
// //               size={props.iconSize || 15}
// //               onPress={handleMonthDecrement}
// //             />
// //           </View>
// //           <View
// //             style={{
// //               width: '10%',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //             }}
// //           >
// //             <Text>{memoizedMonth}</Text>
// //           </View>
// //           <View
// //             style={{
// //               width: '10%',
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //             }}
// //           >
// //             <Icon
// //               name="arrow-right"
// //               size={props.iconSize || 15}
// //               onPress={handleMonthIncrement}
// //             />
// //           </View>
// //         </View>
// //         <View style={styles.yearcontainer}>
// //           <Icon
// //             name="minus"
// //             size={props.iconSize || 15}
// //             onPress={handleYearDecrement}
// //           />
// //           <View
// //             style={{
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //             }}
// //           >
// //             <Text style={{ textAlign: 'center' }}>{memoizedYear}</Text>
// //           </View>
// //           <Icon
// //             name="plus"
// //             size={props.iconSize || 15}
// //             onPress={handleYearIncrement}
// //           />
// //         </View>
// //       </View>

import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
export default function MonthYear(props) {
	const [month, setMonth] = React.useState(new Date().getMonth() + 1);
	const [year, setYear] = React.useState(new Date().getFullYear());
	// React.useEffect(() => {
	// 	props.setMonth(month);
	// 	props.setYear(year);
	// }, []);
	return (
		<View style={[styles.container, { backgroundColor: props.bgColor || "#ecf0f1", width: props.width }]}>
			<View style={styles.datecontainer}>
				<View style={styles.monthcontainer}>
					<Text>Month</Text>
					<TextInput
						style={styles.monthInput}
						value={month}
						onChangeText={(e) => {
							setMonth(e);
							props.setMonth(e);
						}}
					/>
				</View>
				<View style={{ width: 1, backgroundColor: "black" }}></View>
				<View style={styles.yearcontainer}>
					<Text>Year</Text>
					<TextInput
						style={styles.yearInput}
						value={year}
						onChangeText={(e) => {
							setYear(e);
							props.setYear(e);
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	monthInput: {
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		color: "silver",
	},
	yearInput: {
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		color: "silver",
		borderBottomColor: "red",
		borderBottomWidth: 1,
	},
	monthcontainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: 4,
		width: "50%",
	},
	yearcontainer: {
		alignItems: "center",
		justifyContent: "center",
		padding: 4,
		width: "50%",
	},
	datecontainer: {
		justifyContent: "space-between",
		width: "100%",
		flexDirection: "row",
	},
});
