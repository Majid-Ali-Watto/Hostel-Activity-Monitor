import { StyleSheet } from "react-native";
import { AppBackGroundColor } from "./AppBackGroun_Header/AppAndHeaders";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    ...AppBackGroundColor,
    justifyContent: "center",
    // alignItems:'center'
  },
  childViews1: {
    // flex: 0.8,
    height:HEIGHT*0.20,
    // width:'80%',
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderTopColor: "black",
    justifyContent: "center",
  },

  text1: {
    textAlign: "center",
    textTransform: "uppercase",
    // color: "black",
    // fontSize: "140%",
    fontSize: HEIGHT*0.035,//30,
  },
});

export { styles };
