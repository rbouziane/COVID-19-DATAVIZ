import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

import { getWorldConfirmedDeaths, numberWithSpaces } from "../Script/DataScript"

export default class World extends React.Component {

  constructor() {
    super()

    this.state = {
      worldArray: [],
      ready: false
    }
  }

  casesList(data) {
    const cases = [];
      cases.push(
        <View key={"guest_" + data.name} style={styles.border}>
          <View style={{ margin: 10, flexDirection: "row"}}>
            <Text style={styles.casesText}>{numberWithSpaces(data.confirmed)}</Text>
            <Text style={styles.deathText}>  </Text>
            <Text style={styles.deathText}>{data.name}</Text>
            <Text style={styles.deathText}> (</Text>
            <Text style={styles.deathText}>{numberWithSpaces(data.death)}</Text>
            <Text style={styles.deathText}>)</Text>
          </View>
        </View>
      )
    return cases;
  }

  async getData() {
    const dataJson = require('../../data/last_data.json');
    const totalsCountries = Object.keys(dataJson).length;

    var worldArray = await getWorldConfirmedDeaths(dataJson, totalsCountries)

    worldArray.sort((a, b) => {
      return b.confirmed - a.confirmed
    })

    this.setState({worldArray: worldArray, ready: true})
  }

  componentDidMount()
  {
    this.getData()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#222327"}}>
        <View style={[styles.container, {borderBottomWidth: 3, borderColor: "grey"}]}>
          <Text style={styles.title}>Confirmed Cases by Country/Region(Deaths)</Text>
        </View>
        <View style={{flex: 3}}>
          {this.state.ready
            ? <ScrollView>
                {this.state.worldArray.map((data) => this.casesList(data))}
              </ScrollView>
            :
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="white"/>
              </View>
          }
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
    fontSize: 20,
    color: "white"
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "white"
  }
});
