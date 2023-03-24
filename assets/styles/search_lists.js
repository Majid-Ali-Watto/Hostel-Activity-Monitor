import { StyleSheet } from "react-native";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
import { AppBackGroundColor } from "./AppBackGroun_Header/AppAndHeaders";
const getWH = (w, h) => {
  return {
    width: HEIGHT * w,
    height: HEIGHT * h,
  };
};
const getAlignment = (a, j) => {
  return {
    alignItems: a,
    justifyContent: j,
  };
};

const getMF = (m, f) => {
  return {
    marginLeft: WIDTH * m,
    fontSize: HEIGHT * f,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    ...AppBackGroundColor,
  },
  home: {
    elevation: 10,
    flex: 1,
    ...getAlignment("center", "space-evenly"),
    marginTop: 0,
    marginBottom: 10,
  },

  card: {
    shadowColor: AppBackGroundColor.backgroundColor,
    ...getWH(0.5, 0.16),
    paddingTop: 5,
    elevation: 10,
    backgroundColor: "white",
    marginTop: WIDTH * 0.03,
  },
  img: {
    ...getWH(0.08, 0.08),
    borderRadius: 50,
    margin: WIDTH * 0.01,
  },
  cardsItems: {
    flexDirection: "row",
  },
  title: {
    ...getMF(0.05, 0.03),
    fontWeight: "bold",
    // fontStyle: "italic",
  },
  rollno: {
    ...getMF(0.05, 0.02),
  },
  department: {
    ...getMF(0.05, 0.02),
    // fontWeight: "bold",
  },
  data: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  program: {
    marginRight: WIDTH * 0.05,
    fontSize: HEIGHT * 0.025,
  },
  semno: {
    marginRight: WIDTH * 0.05,
    fontSize: HEIGHT * 0.02,
  },
  searchInput: {
    paddingLeft: 5,
    backgroundColor: "#fff",
    margin: 5,
    ...getWH(0.42, 0.06),
  },
  divider: {
    height: 1,
    backgroundColor: "silver",
    width: WIDTH,
    marginLeft: 0,
  },
  ButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    // #0000FF  #007aff
    backgroundColor: "#0000FF",
    fontWeight: "bold",
    padding: 8,
    margin: 10,
    // width: "42%",
    flex: 1,
    ...getAlignment("center", "center"),
  },
  searchbar: {
    flexDirection: "row",
    ...getAlignment("center", "center"),
  },
});

export { styles };
