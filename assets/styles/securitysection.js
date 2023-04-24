import { StyleSheet } from "react-native";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
import { AppBackGroundColor } from "./AppBackGroun_Header/AppAndHeaders";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...AppBackGroundColor,
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
    width: WIDTH * 0.42,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export { styles };
