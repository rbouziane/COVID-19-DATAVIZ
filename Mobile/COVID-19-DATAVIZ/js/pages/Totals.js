import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { getTotalsConfirmedDeaths, numberWithSpaces } from "../Script/DataScript"

export default class Totals extends React.Component {

  constructor() {
    super()

    this.state = {
      totalsConfirmed: 0,
      totalsDeath: 0,
      totalsCountries: 0,
      ready: false
    }
  }

  totalsView() {
    return (
      <View style={{flex: 1, backgroundColor: "#222327"}}>
        <View style={styles.container}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.title, {color: "#e60000"}]}>Total Confirmed</Text>
          <Text style={[styles.text, {color: "#e60000"}]}>{numberWithSpaces(this.state.totalsConfirmed)}</Text>
        </View>
        <View style={[styles.container, {borderTopWidth: 1, borderBottomWidth: 1, borderColor: "white"}]}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.title, {color: "#808080"}]}>Total Deaths</Text>
          <Text style={[styles.text, {color: "#808080"}]}>{numberWithSpaces(this.state.totalsDeath)}</Text>
        </View>
        <View style={styles.container}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.title, {color: "#7bb974"}]}>Countries/Regions</Text>
          <Text style={[styles.text, {color: "#7bb974"}]}>{this.state.totalsCountries}</Text>
        </View>
      </View>
    )
  }

  async getData() {
    const dataJson = require('../../data/last_data.json');
    const totalsCountries = Object.keys(dataJson).length;

    var {totalsConfirmed, totalsDeath} = await getTotalsConfirmedDeaths(dataJson, totalsCountries)

    this.setState({totalsConfirmed: totalsConfirmed, totalsDeath: totalsDeath, totalsCountries: totalsCountries, ready: true})
  }

  componentDidMount()
  {
    this.getData()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#222327"}}>
        {this.state.ready
          ? this.totalsView()
          :
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="white"/>
            </View>
        }
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
