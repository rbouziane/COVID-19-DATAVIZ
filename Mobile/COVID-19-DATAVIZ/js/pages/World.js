import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class World extends React.Component {

  casesListUS() {
    const cases = [];
    for (let i = 0; i < 10; i++) {
      cases.push(
        <View key={"guest_" + i} style={styles.border}>
          <View style={{ margin: 10, flexDirection: "row"}}>
            <Text style={styles.casesText}>2 422 312</Text>
            <Text style={styles.deathText}>  </Text>
            <Text style={styles.deathText}>US (124 415)</Text>
          </View>
        </View>
      )
    }
    return cases;
  }
  
  casesListFrance() {
    const cases = [];
    for (let i = 0; i < 10; i++) {
      cases.push(
        <View key={"guest_" + i} style={styles.border}>
          <View style={{ margin: 10, flexDirection: "row"}}>
            <Text style={styles.casesText}>197 885</Text>
            <Text style={styles.deathText}>  </Text>
            <Text style={styles.deathText}>France (29 755)</Text>
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
          <Text style={styles.title}>Confirmed Cases by Country/Region(Deaths)</Text>
        </View>
        <View style={{flex: 3}}>
          <ScrollView>
            {this.casesListUS()}
            {this.casesListFrance()}
          </ScrollView>
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
    fontSize: 24,
    textAlign: 'center',
    color: 'white'
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
