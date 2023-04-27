import { StyleSheet } from "react-native";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
  },
  childViews1: {
    height:HEIGHT*0.20,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    justifyContent: "center",
  },

  text1: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: HEIGHT*0.035,//30,
  },
});

export { styles };
