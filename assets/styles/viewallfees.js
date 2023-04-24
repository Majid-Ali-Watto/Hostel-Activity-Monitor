import { StyleSheet, Dimensions } from "react-native";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
import { AppBackGroundColor } from "./AppBackGroun_Header/AppAndHeaders";
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    ...AppBackGroundColor,
    padding:0,
    margin:0,
  },
  childViews: {
    // flex: 0.33,
    height: HEIGHT * 0.28,
    width: WIDTH * 0.95,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 10,
  },
  modalView: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    height: HEIGHT * 0.8,
    width: WIDTH * 0.99,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  button: {
    // backgroundColor: "#0000FF",
    fontWeight: "bold",
    padding: 8,
    // margin: 10,
    borderRadius: 20,
    // width: WIDTH,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export { styles };
