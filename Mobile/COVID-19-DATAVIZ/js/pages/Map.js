import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps'

import { getLatLong } from "../API/API"
import { getCountryConfirmedDeaths, numberWithSpaces } from "../Script/DataScript"

export default class Map extends React.Component {

  _isMounted = false

  constructor() {
      super();

      this.state = {
        lat: 30,
        lng: 10,
        latDelta: 100,
        lngDelta: 100,
        searchQuery: '',
        coordinates: [],
        circleArray: [],
        ready: false
      }
  }

  async addMarkerCountry(country, latLng) {
    const dataJson = require('../../data/last_data.json');
    var {confirmedCountry, deathCountry} = await getCountryConfirmedDeaths(dataJson, country)
    var addCoordinates = ({name: country, lat: latLng.lat, lng: latLng.lng, caseConfirmed: confirmedCountry, caseDeath: deathCountry})
    var coordConcat = this.state.coordinates.concat(addCoordinates);
    this.setState({ coordinates: coordConcat })
  }

  async fetchNews(country) {
    if (country != "") {
      let addMarker = true
      for (let valueCoord of this.state.coordinates) {
        if (valueCoord.name == country)
          addMarker = false
      }
      let latLng = await getLatLong(country)
      if (addMarker == true) {
        this.addMarkerCountry(country, latLng)
      }
      this.setState({ lat: latLng.lat, lng: latLng.lng, latDelta: 50, lngDelta: 50 });
    }
  }

  async getCircleData() {
    var circleArray = []

    const dataJson = require('../../data/last_data.json');
    const countriesNumbers = Object.keys(dataJson).length;

    for (var i = 0; i < 10; i++) {
      console.log(i)
      var countryName = Object.keys(dataJson)[i];
      var countryRegionsNumbers = Object.keys(dataJson[countryName]).length;
      var confirmedCountry = 0
      var deathCountry = 0

      for (var j = 0; j < countryRegionsNumbers; j++) {
        var regionName = Object.keys(dataJson[countryName])[j];
        confirmedCountry += parseInt(dataJson[countryName][regionName].Confirmed)
        deathCountry += parseInt(dataJson[countryName][regionName].Deaths)
      }
      let latLng = await getLatLong(countryName)
      circleArray.push({name: countryName, confirmed: confirmedCountry, death: deathCountry, lat: latLng.lat, lng: latLng.lng})
      if (this._isMounted) {
        this.setState({circleArray: circleArray, ready: true})
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

  render() {
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
          {/*loop to print marker on the map*/}
          {this.state.circleArray.map((circle, index) => (
            <View key={index}>
            <TouchableOpacity style={{backgroundColor: "red"}} onPress={() => console.log("press")}>
              <Circle
                center={{
                  latitude: circle.lat,
                  longitude: circle.lng
                }}
                radius={2.5 * circle.confirmed}
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
        {/*<View style={styles.searchBox}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Find country"
            onSubmitEditing={() => this.fetchNews(this.state.searchQuery)}
            onChangeText={(searchtext) => this.setState({ searchQuery: searchtext})}
            value={this.state.searchQuery}
          />
        </View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    borderRadius: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: "#b0abaa",
  },
  searchBox: {
    position:'absolute',
    marginTop: '12%',
    flexDirection:"row",
    width: '90%',
    height: '3%',
    alignSelf:'center',
  }
});
