import { View, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useState } from "react";
export default function TextBox(props) {
  const [height, setHeight] = useState(height || 40);
  const [width, setWidth] = useState(width || "90%");

  return (
    <View
      style={[
        styles.container,
        {
          // borderRadius: props.borderRadius,
          margin: props.style.margin,
          backgroundColor: props.style.backgroundColor,
          height: height,
        },
      ]}
    >
      <View
        style={{
          backgroundColor: props.style.backgroundColor,
          height: height,
          justifyContent: "center",
          borderTopLeftRadius: props.borderRadius,
          borderBottomLeftRadius: props.borderRadius,
        }}
      >
        <Icon
          style={styles.icon}
          name="search"
          color={props.iconColor}
          size={height * 0.5}
        />
      </View>
      <View>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderColor}
          style={[
            props.style,
            {
              width: width,
              height: height,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRadius: 0,
            },
          ]}
          value={props.value}
          onChangeText={(text) => {
            props.setValue(text);
          }}
          maxLength={props.maxLength}
          minLength={props.minLength}
        />
      </View>
      <View
        style={{
          backgroundColor: props.style.backgroundColor,
          height: height,
          justifyContent: "center",
          borderTopRightRadius: props.borderRadius,
          borderBottomRightRadius: props.borderRadius,
        }}
      >
        <Icon
          style={styles.icon}
          name="backspace"
          color={props.iconColor}
          size={height * 0.5}
          onPress={() => {
            props.setValue("");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
});
