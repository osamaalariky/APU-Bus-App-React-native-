import React, { Component } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableHighlight, 
  Dimensions,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Switch,
  Image
} from "react-native";
import MapView, { Polyline, Marker, AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import {locations} from '../Data/Data';
import CuMarker from '../source/CuMarker';
import Constants from "./Constants";
import MapConfig from "./MapConfig";
import _ from "lodash";
import PolyLine from "@mapbox/polyline";
import Geolocation from 'react-native-geolocation-service';
import firestore, { firebase } from "@react-native-firebase/firestore";
import MapViewDirections from 'react-native-maps-directions';
import Auth from "@react-native-firebase/auth";
import haversine from 'haversine';
import PubNubReact from 'pubnub-react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
let pointCoords = [];
let points = []; 
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 3.0553;
const LONGITUDE = 101.7005;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class mapp extends Component {
 
    constructor(props) {
      super(props);
      
      this.state = {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        routeCoordinates: [],
        BusLocations: [],
        studentLocation: [],
        MarkerLocation: [],
        isReady:false,
        distanceTravelled: 0,
        prevLatLng: {},
        coordinate: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: 0,
          longitudeDelta: 0
        })
      };
      this.pubnub = new PubNubReact({
        publishKey: "pub-c-2b6fbffd-62d9-4ab4-a832-cb5f650782a1",
        subscribeKey: "sub-c-b4e20cfe-dd79-11eb-be2b-a639cde32e15"
      });
      this.pubnub.init(this);
    }
  
    componentDidMount() {
      this.subscribeToPubNub();
      this.getStartingPoint();
      this.userLocation();
    }
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
  
    subscribeToPubNub = () => {
      this.pubnub.subscribe({
        channels: ['Channel-jwlw3zoxd'],
        withPresence: true,
      });
      this.pubnub.getMessage('Channel-jwlw3zoxd', msg => {
        const { coordinate } = this.state;
        const { latitude, longitude } = msg.message;
        const newCoordinate = { latitude, longitude };
  
        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
  
        this.setState({
          latitude,
          longitude,
        });
      });
    };
    userLocation = () => {
      Geolocation.getCurrentPosition(position => {
        let region = position.coords;
        console.log(typeof region);
        this.setState({studentLocation: [region]});
      });
    };

    
  
    getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });

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

  
    render() {
      if(this.state.studentLocation[0]){
        console.log(this.state.studentLocation[0].latitude);
      }
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showUserLocation
              followUserLocation
              loadingEnabled
              ref={map => (this._map = map)}
              ref={c => (this.mapView = c)}
              region={this.state.latitude ? this.getMapRegion() : null}
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
              <Marker.Animated
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}
              />
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
              >
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
        </SafeAreaView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
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