import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'

import { getLatLong } from "../API/API"
import { getCountryConfirmedDeaths, numberWithSpaces } from "../Script/DataScript"

export default class Map extends React.Component {

  constructor() {
      super();

      this.state = {
        lat: 30,
        lng: 10,
        latDelta: 100,
        lngDelta: 100,
        searchQuery: '',
        coordinates: []
      }
  }

  // componentDidMount() {
  //   this.addMarkerCountry("France")
  //   this.addMarkerCountry("USA")
  //   this.addMarkerCountry("Espagne")
  //   this.addMarkerCountry("Chine")
  //   this.addMarkerCountry("Brésil")
  //   this.addMarkerCountry("Bénin")
  //   this.addMarkerCountry("Canada")
  // }

  async addMarkerCountry(country, latLng) {
    const dataJson = require('../../data/last_data.json');
    var {confirmedCountry, deathCountry} = await getCountryConfirmedDeaths(dataJson, country)
    var addCoordinates = ({name: country, lat: latLng.lat, lng: latLng.lng, caseConfirmed: confirmedCountry, caseDeath: deathCountry})
    var coordConcat = this.state.coordinates.concat(addCoordinates);
    this.setState({ coordinates: coordConcat })
  }

  async fetchNews(country) {
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

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#222327'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: this.state.latDelta,
            longitudeDelta: this.state.lngDelta
          }}
          style={{flex: 1}}>
          {/*loop to print marker on the map*/}
          {this.state.coordinates.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng
              }}
              image={require('../../assets/map_marker.png')}
              title={marker.name}
              description={"Confirmed Cases: " + numberWithSpaces(marker.caseConfirmed) + ", Death Cases: " + numberWithSpaces(marker.caseDeath)}
            />
          ))}
        </MapView>
        <View style={styles.searchBox}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Find country"
            onSubmitEditing={() => this.fetchNews(this.state.searchQuery)}
            onChangeText={(searchtext) => this.setState({ searchQuery: searchtext})}
            value={this.state.searchQuery}
          />
        </View>
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
