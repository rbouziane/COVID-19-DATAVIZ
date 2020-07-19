import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { getSearchCountryConfirmedDeaths, numberWithSpaces } from "../Script/DataScript"

export default class US extends React.Component {

  constructor() {
      super();

      this.state = {
        searchQuery: '',
        confirmedCountry: 0,
        countryArray: [],
        countryName: "",
        ready: false
      }
  }

  async fetchCountry(country) {
    if (country != "") {
      this.setState({ready: false})
      const dataJson = require('../../data/last_data.json');

      var {confirmedCountry, countryArray} = await getSearchCountryConfirmedDeaths(dataJson, country)

      console.log(confirmedCountry, countryArray)
      if (confirmedCountry == 0 && countryArray.length == 0) {
        Alert.alert(
          'This country does not exist or is misspelled',
          '',
          [
            { text: 'OK' }
          ],
        );
        this.setState({ready: true})
      }
      else {
        countryArray.sort((a, b) => {
          return b.confirmed - a.confirmed
        })
        this.setState({confirmedCountry: confirmedCountry, countryArray: countryArray, countryName: country, ready: true})
      }
    }
  }

  casesList(data) {
    const cases = [];
    cases.push(
      <View key={"guest_" + data.name} style={styles.border}>
        <View style={{ margin: 10, flexDirection: "row"}}>
          <Text style={styles.casesText}>{numberWithSpaces(data.confirmed)}</Text>
          <Text style={styles.deathText}>  </Text>
          <Text style={styles.deathText}>{data.name} ({numberWithSpaces(data.death)})</Text>
        </View>
      </View>
    )
    return cases;
  }


  listView() {
    return (
      this.state.ready
        ?
          <ScrollView style={{flex: 1}}>
            <View style={[styles.container, {borderBottomWidth: 3, borderColor: "grey"}]}>
              <Text style={styles.title}>Total Confirmed</Text>
              <Text style={styles.titleCasesText}>{numberWithSpaces(this.state.confirmedCountry)}</Text>
              <Text style={styles.title}>in the {this.state.countryName}</Text>
            </View>
            <View style={{flex: 4}}>
              <View style={{marginVertical: 20}}>
                <Text style={[styles.secondTitle, {color: "#e60000"}]}>Confirmed</Text>
                <Text style={[styles.secondTitle, {color: "white"}]}>per {this.state.countryName} Region (Deaths)</Text>
              </View>
              <ScrollView>
                {this.state.countryArray.map((data) => this.casesList(data))}
              </ScrollView>
            </View>
          </ScrollView>
        :
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="white"/>
          </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#222327"}}>
        <View style={styles.searchBox}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search country"
            onSubmitEditing={() => this.fetchCountry(this.state.searchQuery)}
            onChangeText={(searchtext) => this.setState({ searchQuery: searchtext})}
            value={this.state.searchQuery}
          />
        </View>
        {this.state.countryName != ""
        ?
          <View style={{flex: 4}}>
            {this.listView()}
          </View>
        :
          <View style={{flex: 4}}>
          </View>
        }
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
    textAlign: 'center',
    fontSize: 25,
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
  },
  searchBar: {
    flex: 1,
    margin: 15,
    borderRadius: 20,
    backgroundColor: "#b0abaa",
  },
  searchBox: {
    flexDirection:"row",
    alignSelf:'center',
  }
});
