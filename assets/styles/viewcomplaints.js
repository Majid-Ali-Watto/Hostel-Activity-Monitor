import { StyleSheet, StatusBar } from "react-native";
import { HEIGHT, WIDTH } from "../../Constants/GlobalWidthHeight";
import { AppBackGroundColor } from "./AppBackGroun_Header/AppAndHeaders";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
    // marginTop: StatusBar.currentHeight,
    ...AppBackGroundColor,
    // justifyContent: "center",
    // alignItems: "center",
  },
  searchBar: {
    marginVertical: 10,
    // padding: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: WIDTH * 0.94,
    height: HEIGHT * 0.06,
  },
  // searchInput: {
  //   // padding: 1,
  //   backgroundColor: "#fff",
  //   // borderBottomWidth: 0.1,
  //   // borderBottomColor: "blue",
  //   margin: 5,

  //   width: WIDTH * 0.42,
  //   height: HEIGHT * 0.06,
  // },
  searchInput: {
    paddingLeft: 5,
    backgroundColor: "#fff",
    margin: 5,
    width: WIDTH * 0.9,
    height: HEIGHT * 0.06,
  },
  divider: {
    height: 1,
    backgroundColor: "silver",
    width: WIDTH,
  },
  compCountSec: {
    alignItems: "flex-end",
  },
  compCount: {
    fontStyle: "italic",
    fontSize: 11,
    marginRight: 10,
  },
  complaintsList: {
    // flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  complaintTit: {
    fontSize: 18,
  },
  complaintTitle: {
    marginVertical: 10,
    color: "black",
    padding: 8,
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
    fontWeight: "normal",
    width: WIDTH,
  },
  modalContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "lightgreen",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "green",
    // justifyContent: "center",
    // alignContent: "center",
    textAlign: "center",
    color: "white",
    padding: 20,
  },
  modalDescription: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  modalCloseButton: {
    backgroundColor: "#007aff",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  complaintContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  id: { fontSize: 11 },
  complainer: { fontSize: 11 },
});

export { styles };
