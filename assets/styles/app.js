import { StyleSheet } from "react-native";
import { AppNavigationHeader } from "./AppBackGroun_Header/AppAndHeaders";
const styles = StyleSheet.create({
  home: {
    display: "flex",
    flex: 1,
  },
  headerStyle: {
    ...AppNavigationHeader.NavigationTextStyle,
    headerStyle: {
      ...AppNavigationHeader
    },
  
  },  
 });

export { styles };
