import React, { useState, useEffect } from "react";
import { Text, View, LogBox } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { styles } from "../assets/styles/qrcode";
import ColorsContext from "../ContextAPI/ColorsContext";
export default function QRScanner({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { bgColor, font_Family } = React.useContext(ColorsContext);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    route.params.search(getBase64DecodedRegNo(data));
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text style={{fontFamily:font_Family}}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{fontFamily:font_Family}}>No access to camera</Text>;
  }
  function createObject() {
    let arr = [],
      char = "a";
    for (var i = 0; i < 26; i++) {
      arr.push({ ["key" + i]: char });
      char = "" + char.charCodeAt(0);
      char++;
      char = String.fromCharCode(parseInt(char));
    }
    return arr;
  }
  function getBase64DecodedRegNo(coded) {
    coded = coded.split("");
    coded = coded.map((ch) => {
      let res = String.fromCharCode(
        ch.toString().charCodeAt(0) + (100 * 10) / 100
      );
      res =
        res == ","
          ? String.fromCharCode(
              ch.toString().charCodeAt(0) - (100 * 10) / 100 - 1
            )
          : res;
      return res;
    });

    coded = coded.toString();
    for (let i = 0; i < coded.length; i++) coded = coded.replace(",", "");
    coded = coded.split("");
    let arr = createObject();
    let decoded = [];
    coded.map((code) => {
      arr.find((c, index) => {
        if (c["key" + index] === code) {
          decoded.push(index);
        }
      });
    });
    decoded = decoded.toString();
    for (let i = 0; i < decoded.length; i++) decoded = decoded.replace(",", "");
    return decoded;
  }
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={{fontFamily:font_Family}}>Scan QR Code given on student's card</Text>
      <View style={{ margin: 20 }}></View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        // style={StyleSheet.absoluteFillObject}
        style={styles.barCodeScannerContainer}
      />
    </View>
  );
}
