import { View, StyleSheet, Text, ImageBackground } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.img}
        resizeMode="contain"
        source={require('../../assets/Images/splash.gif')}
      >
        
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    height: '100%',
    justifyContent:'center',
    alignItems:'center',
    
    

  }
});
