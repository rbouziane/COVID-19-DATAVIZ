import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Totals extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#404040"}}>
        <View style={styles.container}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.title, {color: "#e60000"}]}>Total Confirmed</Text>
          <Text style={[styles.text, {color: "#e60000"}]}>9 628 658</Text>
        </View>
        <View style={[styles.container, {borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#222327"}]}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.title, {color: "#808080"}]}>Total Deaths</Text>
          <Text style={[styles.text, {color: "#808080"}]}>489 854</Text>
        </View>
        <View style={styles.container}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.title, {color: "#7bb974"}]}>Countries/Regions</Text>
          <Text style={[styles.text, {color: "#7bb974"}]}>188</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40
  },
  text: {
    fontWeight: 'bold',
    fontSize: 50
  }
});
