
import React, {Component} from 'react';
import {

  StyleSheet,
  View,
  Alert,
  Dimensions,
} from 'react-native';

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
} from 'react-native-maps';
import {locations} from '../Data/Data';
import CuMarker from '../source/CuMarker';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import firestore, { firebase } from "@react-native-firebase/firestore";
import Auth from "@react-native-firebase/auth";
//
const {width, height} = Dimensions.get('window');

export default class TrackBus extends Component {
  state = {
    BusLocations: [],
    studentLocation: [],
    MarkerLocation: [],
    isReady:false
  };

  region = {
    latitude: 3.0553,
    longitude: 101.7005,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  showtable = () => {
    Alert.alert(
      'Do you want to check for bus schdules',
      'choose one',

      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
        },
      ],
    );
  };

  driverlo = () => {
    Geolocation.getCurrentPosition(position => {
      let region = position.coords;
      console.log(typeof region);
      this.setState({studentLocation: [region]});
    });
  };

  onCarouselItemChange = index => {
    let location = locations[index];
    this.region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.01,
    };
    // this._map.animateToRegion =( {

    // })
    this._map.animateToRegion(this.region);
    // console.log(location);
  };
  markpress = (location, index) => {
    this.region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.01,
    };
    // this._map.animateToRegion =( {

    // })
    this._map.animateToRegion(this.region);
  };
  getStartingPoint=()=>{
    var fromlocation;
    firestore()
   .collection('Users')
   .doc(Auth().currentUser.uid)
   .collection("TripData")
   .doc('bookedData').get().then((data)=>{
     if(data.exists)
 {
    fromlocation=data.data().fromlocation;
    this.setState({
        MarkerLocation: locations.filter(item => item.title == fromlocation),
      });
 }})
  }
  componentDidMount = () => {
    this.getStartingPoint()
    this.driverlo();
  };

  render() {
    if(this.state.studentLocation[0]){
        console.log(this.state.studentLocation[0].latitude);
    }



    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => (this._map = map)}
          style={styles.map}
          initialRegion={this.region}>
          {typeof(this.state.studentLocation[0])=='object' &&typeof(this.state.MarkerLocation[0])=="object" ? (<MapViewDirections
            origin={{latitude:this.state.studentLocation[0].latitude,longitude:this.state.studentLocation[0].longitude}}
            destination={{latitude:this.state.MarkerLocation[0].latitude,longitude:this.state.MarkerLocation[0].longitude}}
            apikey="AIzaSyAhB0KN4uZzrHpTvpgNrJx3yE1Dt-sZ2vM"
            strokeWidth={4}
            mode="WALKING"
            splitWaypoints={true}
            strokeColor="#000"
            optimizeWaypoints={true}
          />):null}  

          {this.state.MarkerLocation.map((marker, index) => (
            <Marker
              key={index}
              //onPress={() => this.markpress(marker, index)}
              //  onPress = {this.showtable}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              onPress={this.showtable}
              onPress={() => this.markpress(marker, index)}>
              <CuMarker item={marker} />
            </Marker>
          ))}
          {this.state.studentLocation.map((marker, index) => (
            <Marker
              key={index}
              //onPress={() => this.markpress(marker, index)}
              //  onPress = {this.showtable}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              onPress={this.showtable}
              onPress={() => this.markpress(marker, index)}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 20,
                  backgroundColor: '#000',
                }}></View>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
  picCard: {
    backgroundColor: 'cornflowerblue',
    height: 200,
    width: 300,
    padding: 24,
    borderRadius: 24,
  },
  titleCard: {
    fontSize: 20,
    alignSelf: 'center',
  },
  swipeCard: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  cardpress: {
    width: '100%',
    borderWidth: 1,
    padding: 3,
    backgroundColor: '#4682b4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 3,
  },
  cardtext: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
