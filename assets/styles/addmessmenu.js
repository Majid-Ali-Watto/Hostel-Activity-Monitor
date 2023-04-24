import { StyleSheet } from "react-native";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
import { AppBackGroundColor } from "./AppBackGroun_Header/AppAndHeaders";
const getCommonStyles = (fw, ta, fs, pos, l, fstyle) => {
  return {
    fontWeight: fw,
    textAlign: ta,
    fontSize: fs,
    position: pos,
    left: l,
    fontStyle: fstyle,
  }
}
const getJustAlign=(j,a)=>{
  return {
    justifyContent: j,
    alignItems: a,
  }
}
const styles = StyleSheet.create({
  container: {
    ...AppBackGroundColor,
    width: WIDTH,
    height: HEIGHT,
  },
  textinputs: {
    fontWeight: "bold",
    width: WIDTH,
    ...getJustAlign("space-around","center"),
    alignContent: "center",
    flex: 1,
  },
  inputs: {
    marginBottom: 5,
    width: WIDTH * 0.9,
  },
  button: {
    backgroundColor: "#0000FF",
    width: WIDTH * 0.9,
    margin: 10,
    marginTop: 30,
    padding: 10,
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  addMenuHeader: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,

    textAlign: "center",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.9,

  },
  dayDate: {
    marginBottom: 5,
    width: WIDTH * 0.71,
    marginRight: 10,
  },
  select: {
    backgroundColor: "silver",
    width: WIDTH * 0.15,
    height: 40,
    marginTop: 10,
    justifyContent: "space-around",
  },
  selectText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  dishUnitContainer: {
    flexDirection: "row",
    ...getJustAlign("space-between","center"),
    marginTop: 10,
    width: WIDTH * 0.9,

  },
  dishUnitLabel: {
    ...getCommonStyles("normal", 'left', 18, "relative", 15, 'italic'),
    marginRight: 20,
  },
  radiobuttonLabel: {
    ...getCommonStyles("normal", 'left', 14, "relative", -100, 'italic'),
    marginTop: 10,
  },
  addDishContainer: { flexDirection: "row" },
  radioButtonContainer: {
    width: WIDTH,
    display: "flex",
    flexDirection: "row",
  },
  radioButton: {
    width: WIDTH * 0.45,
    padding: 10,
    flexDirection: "row",
    ...getJustAlign("center","center"),

  },
});

export { styles };
