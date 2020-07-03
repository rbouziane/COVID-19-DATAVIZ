import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class US extends React.Component {

  casesList() {
    const cases = [];
    for (let i = 0; i < 10; i++) {
      cases.push(
        <View key={"guest_" + i} style={styles.border}>
          <View style={{ margin: 10, flexDirection: "row"}}>
            <Text style={styles.casesText}>394 954</Text>
            <Text style={styles.deathText}>  </Text>
            <Text style={styles.deathText}>New York (32 064)</Text>
          </View>
        </View>
      )
    }
    return cases;
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#222327"}}>
        <View style={[styles.container, {borderBottomWidth: 3, borderColor: "grey"}]}>
          <Text style={styles.title}>Total Confirmed</Text>
          <Text style={styles.titleCasesText}>2 422 312</Text>
          <Text style={styles.title}>in the US</Text>
        </View>
        <View style={{flex: 4}}>
          <View style={{marginHorizontal: 10, marginVertical: 30}}>
            <Text style={[styles.secondTitle, {color: "#e60000"}]}>Confirmed</Text>
            <Text style={[styles.secondTitle, {color: "white"}]}>per US State (Deaths)</Text>
          </View>
          <ScrollView>
            {this.casesList()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'white'
  },
  titleCasesText: {
    fontWeight: 'bold',
    fontSize: 55,
    color: "#e60000"
  },
  secondTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  casesText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "#e60000"
  },
  deathText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "white"
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "white"
  }
});
