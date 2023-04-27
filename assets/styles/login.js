import { StyleSheet } from "react-native";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
const loginStyles = StyleSheet.create({
  loginContainer: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
  },
  textinputs: {
    fontWeight: "bold",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  loginSignUpText: { marginBottom: 25, marginTop: 25, fontWeight: "bold" },
  inputs: {
    marginBottom: 5,
    width: WIDTH * 0.9,
  },
  button: {
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
  backbutton: {
    width: WIDTH * 0.42,
    margin: 10,
    padding: 10,
    flexDirection: "row",
  },
  backbuttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: 10,
  },
});
export { loginStyles };
