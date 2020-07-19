import React from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps'

import { numberWithSpaces } from "../Script/DataScript"

export default class Map extends React.Component {

  _isMounted = false

  constructor() {
      super();

      this.state = {
        lat: 30,
        lng: 10,
        latDelta: 100,
        lngDelta: 100,
        circleArray: [],
        ready: false
      }
  }

  async getCircleData() {
    var circleArray = []

    const dataJson = require('../../data/last_data.json');
    const countriesNumbers = Object.keys(dataJson).length;

    for (var i = 0; i < countriesNumbers; i++) {
      var countryName = Object.keys(dataJson)[i];
      var countryRegionsNumbers = Object.keys(dataJson[countryName]).length;

      for (var j = 0; j < countryRegionsNumbers; j++) {
        var regionName = Object.keys(dataJson[countryName])[j];
        if (regionName != "Unknown" && regionName != "Recovered") {
          if (dataJson[countryName][regionName].Latitude != 0 && dataJson[countryName][regionName].Longitude != 0 && dataJson[countryName][regionName].Incidence_Rate != 0) {
            if (regionName == "") {
              circleArray.push({name: countryName, confirmed: dataJson[countryName][regionName].Confirmed, death: dataJson[countryName][regionName].Deaths, lat: parseInt(dataJson[countryName][regionName].Latitude), lng: parseInt(dataJson[countryName][regionName].Longitude), incidence: parseInt(dataJson[countryName][regionName].Incidence_Rate)})
              if (this._isMounted) {
                this.setState({circleArray: circleArray})
              }
            }
            else {
              circleArray.push({name: regionName, confirmed: dataJson[countryName][regionName].Confirmed, death: dataJson[countryName][regionName].Deaths, lat: parseInt(dataJson[countryName][regionName].Latitude), lng: parseInt(dataJson[countryName][regionName].Longitude), incidence: parseInt(dataJson[countryName][regionName].Incidence_Rate)})
              if (this._isMounted) {
                this.setState({circleArray: circleArray})
              }
            }
          }
        }
      }
    }
  }

  componentDidMount()
  {
    this._isMounted = true;
    this.getCircleData()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  radiusCercle(confirmed) {
    if (2.5 * confirmed < 10000) {
      return 50 * confirmed
    }
    else if (2.5 * confirmed < 50000) {
      return 4 * confirmed
    }
    else
      return 2.5 * confirmed
  }

  mapVisual() {
    return (
      <View style={{flex: 1, backgroundColor: '#222327'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          rotateEnabled={false}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: this.state.latDelta,
            longitudeDelta: this.state.lngDelta
          }}

          onRegionChangeComplete={(selectedRegion) => this.setState({lat: selectedRegion.latitude, lng: selectedRegion.longitude, latDelta: selectedRegion.latitudeDelta, lngDelta: selectedRegion.longitudeDelta})}
          style={{flex: 1}}>
          {/*loop to print circle and marker on the map*/}
          {this.state.circleArray.map((circle, index) => (
            <View key={index}>
            <TouchableOpacity style={{backgroundColor: "red"}} onPress={() => console.log("press")}>
              <Circle
                center={{
                  latitude: circle.lat,
                  longitude: circle.lng
                }}
                radius={this.radiusCercle(circle.confirmed)}
                fillColor={'rgba(255, 0, 0, 0.5)'}
              />
              </TouchableOpacity>
              <Marker
                coordinate={{
                  latitude: circle.lat,
                  longitude: circle.lng
                }}
                image={require('../../assets/clickCircle.png')}
                title={circle.name}
                style={{width: 15, height: 15}}
                description={"Confirmed Cases: " + numberWithSpaces(circle.confirmed) + ", Death Cases: " + numberWithSpaces(circle.death)}
              />
            </View>
          ))}
        </MapView>
        {/*this.state.ready == false
          &&
            <View style={styles.indicatorView}>
              <ActivityIndicator size="large" color="blue"/>
            </View>
        */}
        </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#222327'}}>
        {this.mapVisual()}
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   indicatorView: {
//     flex: 1,
//     position:'absolute',
//     alignSelf:'center',
//     marginTop: '100%',
//     justifyContent: 'center'
//   }
// });
