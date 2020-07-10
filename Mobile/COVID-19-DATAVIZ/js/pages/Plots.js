import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import {
  LineChart,
  BarChart
} from "react-native-chart-kit";

export default class Plots extends React.Component {

  constructor() {
    super()

    this.state = {
      data1: [
        0,
        5,
        10,
        15,
        100
      ],
      data2: [
        1,
        10,
        100,
        1000,
        1300
      ],
      data3: [
        0,
        50,
        100,
        100,
        150,
        100,
        150,
        150,
        150,
        150,
        120,
        112,
        112,
        112,
        112,
        200,
        250,
        300
      ]
    }
  }

  graphDailyCases() {
    return (
      <View style={{paddingTop: 30, backgroundColor: "#222327"}}>
        <Text style={{fontWeight: "bold", fontSize: 20, textAlign: "center", color: "white"}}>Daily cases</Text>
        <BarChart
          data={{
            labels: ["Février", "Mars", "Avril", "Mai", "Juin", "Juillet"],
            datasets: [{
              data: this.state.data3
            }]
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: "#222327",
            backgroundGradientFrom: "#222327",
            backgroundGradientTo: "#222327",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </View>
    )
  }

  graphLogarithmic() {
    return (
      <View style={{paddingTop: 30, backgroundColor: "#222327"}}>
        <Text style={{fontWeight: "bold", fontSize: 20, textAlign: "center", color: "white"}}>Logarithmic</Text>
        <LineChart
          data={{
            labels: ["Février", "Mars", "Avril", "Mai", "Juin", "Juillet"],
            datasets: [{
              data: this.state.data2
            }]
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisSuffix="k"
          yAxisInterval={10}
          chartConfig={{
            backgroundColor: "#222327",
            backgroundGradientFrom: "#222327",
            backgroundGradientTo: "#222327",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </View>
    )
  }

  graphConfirmedCases() {
    return (
      <View style={{paddingTop: 30, backgroundColor: "#222327"}}>
        <Text style={{fontWeight: "bold", fontSize: 20, textAlign: "center", color: "white"}}>Confirmed cases</Text>
        <LineChart
          data={{
            labels: ["Février", "Mars", "Avril", "Mai", "Juin", "Juillet"],
            datasets: [{
              data: this.state.data1
            }]
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisSuffix="M"
          yAxisInterval={10}
          chartConfig={{
            backgroundColor: "#222327",
            backgroundGradientFrom: "#222327",
            backgroundGradientTo: "#222327",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.graphConfirmedCases()}
          {this.graphLogarithmic()}
          {this.graphDailyCases()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
