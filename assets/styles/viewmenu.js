import { StyleSheet } from "react-native";
import { WIDTH } from "../../Constants/GlobalWidthHeight";
import { HEIGHT } from "../../Constants/GlobalWidthHeight";
const total = {
  fontStyle: "italic",
};
const flexStyles = {
  justifyContent: "space-between",
  flexDirection: "row",
};

const getStyles = () => {
  return {
    flex: 1,
  };
};
const getStylesFontPadding = (f, p) => {
  return {
    fontWeight: f,
    padding: p,
  };
};

const styles = StyleSheet.create({
  container: {
    ...getStyles(),
  },
  searchbar: {
    margin: 5,
    height: HEIGHT * 0.06,
    backgroundColor: "white",
  },
  header: {
    fontSize: 18,
    color: "black",
    ...getStylesFontPadding("bold", 2),
    paddingLeft: 10,
    width: WIDTH,
  },
  card: {
    margin: 10,
    padding: 8,
    borderColor: "black",
    borderWidth: 1,
  },
  day: {
    ...getStylesFontPadding("bold", 5),
  },
  menuDay: {
    ...flexStyles,
    backgroundColor: "orange",
  },
  timeStyle: {
    ...flexStyles,
    padding: 2,
  },

  total: {
    ...total,
  },
  timeAM: {
    ...total,
  },
  timePM: {
    ...total,
  },
});

export { styles };
