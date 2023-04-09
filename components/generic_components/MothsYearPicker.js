
import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function MonthYear(props) {
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: props.bgColor || '#ecf0f1',
          width:props.width
         },
      ]}>
      <View style={styles.datecontainer}>
        <View style={styles.monthcontainer}>
        <View style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          <Icon
            name="arrow-left"
            size={props.iconSize || 15}
            onPress={() => {
              if (month < 2) {
                setMonth(12);
                props.setMonth(12);
              } else {
                setMonth(month - 1);
                props.setMonth(month - 1);
              }
            }}
          />
          </View>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{month}</Text>
          </View>
          <View style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          <Icon
            name="arrow-right"
            size={props.iconSize || 15}
            onPress={() => {
              if (month >11) {
                setMonth(1);
                props.setMonth(1);
              } else {
                setMonth(month + 1);
                props.setMonth(month + 1);
              }
            }}
          />
          </View>
        </View>
        <View style={styles.yearcontainer}>
          <Icon
            name="minus"
            size={props.iconSize || 15}
            onPress={() => {
              setYear(year - 1);
              props.setYear(year-1)
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ textAlign: 'center' }}>{year}</Text>
          </View>
          <Icon
            name="plus"
            size={props.iconSize || 15}
            onPress={() => {
              setYear(year + 1);
              props.setYear(year+1)
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  monthcontainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 24,
    width: '50%',
    flexDirection: 'row',
  },
  yearcontainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 24,
    width: '50%',
    flexDirection: 'row',
  },
  datecontainer: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
});