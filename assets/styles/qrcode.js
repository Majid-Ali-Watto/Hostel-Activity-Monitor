import { StyleSheet } from "react-native";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
  barCodeScannerContainer: {
    height: HEIGHT*.8,
    width: WIDTH*.8,
  },
});

export { styles };
