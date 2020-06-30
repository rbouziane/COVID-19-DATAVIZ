import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { getLatLong } from "../API/API"

export default class Map extends React.Component {

  async makerCountry(country) {
    const cases = [];
    cases.push(
      <Marker
      coordinate={{
        latitude: latLng.lat,
        longitude: latLng.lng
      }}
      image={require('../../assets/map_marker.png')}
      title={country}
      description="Confirmed Cases 2 549 069"
    />
    )
    return cases
  }

  render() {
    // this.makerCountry("France")
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height: '100%'}}>
        <View>
        {this.makerCountry("France")}
        <Marker
        coordinate={{
          latitude: 46,
          longitude: 2
        }}
        image={require('../../assets/map_marker.png')}
        title="France"
        description="Confirmed Cases 199 476"
        />
        <Marker
        coordinate={{
          latitude: 39,
          longitude: -100
        }}
        image={require('../../assets/map_marker.png')}
        title="USA"
        description="Confirmed Cases 2 549 069"
        />
        </View>
      </MapView>
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
