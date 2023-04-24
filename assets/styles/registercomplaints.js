import { StyleSheet } from "react-native";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
import { AppBackGroundColor } from "./AppBackGroun_Header/AppAndHeaders";
const getCommonStyles = (mv, pad, bg, bdr) => {
  return {
    marginVertical: mv,
    padding: pad,
    backgroundColor: bg,
    borderRadius: bdr,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    ...AppBackGroundColor,
  },
  textInput: {
    ...getCommonStyles(10, 10, "#fff", 5),
  },
  complaintBody: {
    ...getCommonStyles(10, 10, "#fff", 5),
    textAlign: "auto",
    height: HEIGHT * 0.6,
    textAlignVertical: "top",
  },
  textAreaContainer: {
    borderColor: "silver",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});

export { styles };
