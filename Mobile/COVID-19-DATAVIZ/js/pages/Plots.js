import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { getPlotsConfirmedDeaths } from "../Script/DataScript"

export default class Plots extends React.Component {

  constructor() {
    super()

    this.state = {
      monthArray: [],
      confirmedArray: [],
      deathArray: [],
      ready: false,
    }
  }

  graphDeathCases() {
    return (
      <View style={{padding: 5, flex: 1, backgroundColor: "#222327"}}>
        <Text style={{fontWeight: "bold", fontSize: 20, textAlign: "center", color: "white"}}>Death cases</Text>
        <LineChart
          data={{
            labels: this.state.monthArray,
            datasets: [{
              data: this.state.deathArray
            }]
          }}
          width={Dimensions.get("window").width - 10}
          height={220}
          yAxisSuffix="k"
          yAxisInterval={25.5}
          chartConfig={{
            backgroundColor: "#696969",
            backgroundGradientFrom: "#696969",
            backgroundGradientTo: "#696969",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    )
  }

  graphConfirmedCases() {
    return (
      <View style={{padding: 5, flex: 1, backgroundColor: "#222327"}}>
        <Text style={{fontWeight: "bold", fontSize: 20, textAlign: "center", color: "white"}}>Confirmed cases</Text>
        <LineChart
          data={{
            labels: this.state.monthArray,
            datasets: [{
              data: this.state.confirmedArray
            }]
          }}
          width={Dimensions.get("window").width - 10}
          height={220}
          yAxisSuffix="M"
          yAxisInterval={25.5}
          bezier
          chartConfig={{
            backgroundColor: "#808080",
            backgroundGradientFrom: "#808080",
            backgroundGradientTo: "#808080",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    )
  }

  async getData() {
    const dataGraphicalJson = require('../../data/data_graphical.json');
    const totalsData = Object.keys(dataGraphicalJson).length;

    var {monthArray, confirmedArray, deathArray} = await getPlotsConfirmedDeaths(dataGraphicalJson, totalsData)

    this.setState({monthArray: monthArray, confirmedArray: confirmedArray, deathArray: deathArray, ready: true})
  }

  componentDidMount()
  {
    this.getData()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.ready
          ?
            <View style={{flex:1}}>
              {this.graphConfirmedCases()}
              {this.graphDeathCases()}
            </View>
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
    backgroundColor: '#222327',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
