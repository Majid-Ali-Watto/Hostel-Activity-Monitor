import React from "react";
import { styles } from "../assets/styles/search_lists";
import { Card } from "react-native-paper";
import { View, Text, Image } from "react-native";
import { HEIGHT, WIDTH } from "../Constants/GlobalWidthHeight";
export default function renderStudentCard(
  rollno,
  cnic,
  backgroundColor,
  setSem,
  semno,
  setSearchTerm,
  setUri,
  sname,
  image,
  dname,
  program,
  statusText,
  mStatusText,
  showProfile,
  titleFont,
  rollNoFont,
  programFont,
  semNoFont,
  departmentFont,
  textColor
) {
  return (
    <Card
      key={rollno + cnic}
      style={[styles.card, backgroundColor]}
      onPress={() => {
        setSem(semno);
        setSearchTerm(rollno);
      }}
      onLongPress={() => {
        setUri([
          sname,
          image,
          rollno,
          dname,
          program,
          semno,
          statusText,
          mStatusText,
        ]);
        showProfile(true);
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ margin: 0, padding: 0, width: WIDTH * 0.15 }}>
          <Image source={{ uri: image }} style={styles.img} />
        </View>
        <View>
          <View style={[styles.data, { width: WIDTH * 0.7 }]}>
            <View>
              <Text style={[styles.title, titleFont, textColor]}>{sname}</Text>
              <Text style={[styles.rollno, rollNoFont, textColor]}>
                {rollno}
              </Text>
              <Text style={[styles.rollno, rollNoFont, textColor]}>{cnic}</Text>
              <Text style={[styles.department, departmentFont, textColor]}>
                {dname}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ margin: 0, padding: 0, width: WIDTH * 0.15 }}>
          <Text style={[styles.program, programFont, textColor]}>
            {program}
          </Text>
          <Text style={[styles.semno, semNoFont, textColor]}>{semno}</Text>
        </View>
      </View>
      {/* <View style={{ flex: 1, justifyContent: "center" }}> */}
      {/* <View style={[styles.cardsItems, { height: "70%" }]}>
        <View>
          <Image source={{ uri: image }} style={styles.img} />
        </View>

        <View style={styles.data}>
          <View>
            <Text style={[styles.title, titleFont, textColor]}>{sname}</Text>
            <Text style={[styles.rollno, rollNoFont, textColor]}>{rollno}</Text>
            <Text style={[styles.rollno, rollNoFont, textColor]}>{cnic}</Text>
          </View>
          <View>
            <Text style={[styles.program, programFont, textColor]}>
              {program}
            </Text>
            <Text style={[styles.semno, semNoFont, textColor]}>{semno}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: "30%",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.department, departmentFont, textColor]}>
          {dname}
        </Text>
      </View> */}
      {/* </View> */}
    </Card>
  );
}
