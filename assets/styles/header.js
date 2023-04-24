import { StyleSheet } from "react-native";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
import { AppHeader } from "./AppBackGroun_Header/AppAndHeaders";
const styles = StyleSheet.create({
  header: {
    // backgroundColor:AppHeader,
    width: WIDTH,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headertext: {
    fontSize: WIDTH * 0.06,
    fontWeight: "bold",
    
    paddingLeft: 10,
    paddingRight: 10,
  },
  subheadertext: {
    fontSize: WIDTH * 0.04,
    fontWeight: "bold",
  },
  lineStyle: {
    borderWidth: 0.3,
    borderColor: "white",
    margin: 10,
    width: WIDTH * 0.95,
  },
});
export { styles };
