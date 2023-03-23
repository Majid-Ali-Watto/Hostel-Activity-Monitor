import AsyncStorage from "@react-native-async-storage/async-storage";
var bgColor = "lightgreen";
var hbgColor = "green";

const storeData = async (item) => {
  try {
    await AsyncStorage.setItem("color", item);
  } catch (e) {
    alert(e)
  }
};

export const setBGcolor = (bg) => {
  bgColor = bg;
  storeData(bg);
};
export const getBGcolor = () => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("color");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  let color = getData();
  return !color ? color : bgColor;
};
export const setHBGcolor = (bg) => {
  hbgColor = bg;
};
export const getHBGcolor = () => {
  return hbgColor;
};
