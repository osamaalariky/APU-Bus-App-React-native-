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
import Constants from "./Constants";
import MapConfig from "./MapConfig";
import _ from "lodash";
import PolyLine from "@mapbox/polyline";
import Geolocation from 'react-native-geolocation-service';
import haversine from 'haversine';
import PubNubReact from 'pubnub-react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
let pointCoords = [];
let points = []; 

const lat = 3.0553;
const lon = 101.7005;
const laD = 0.009;
const loD = 0.009;

export default class mapp extends Component {
 
    constructor(props) {
      super(props);
      
      this.state = {
        latitude: lat,
        longitude: lon,
        driverCoordinates: [],
        driverDis: 0,
        trk: {},
        coordinate: new AnimatedRegion({
          latitudeDelta: 0,
          longitudeDelta: 0,
          latitude: lat,
          longitude: lon,
        })
      };
      this.nub = new PubNubReact({
        publishKey: "pub-c-2b6fbffd-62d9-4ab4-a832-cb5f650782a1",
        subscribeKey: "sub-c-b4e20cfe-dd79-11eb-be2b-a639cde32e15"
      });
      this.nub.init(this);
    }
  
    componentDidMount() {
    //  this.watchPosition();
      const { coordinate } = this.state;
  
      this.watchID = Geolocation.watchPosition(
        position => {
          const { driverCoordinates, driverDis } = this.state;
          const { latitude, longitude } = position.coords;
  
          const conew = {
            latitude,
            longitude
          };
  
          if (Platform.OS === "android") {
            if (this.marker) {
              this.marker.animateMarkerToCoordinate(
                conew,
                200
              );
            }
          } else {
            coordinate.timing(conew).start();
          }
  
          this.setState({
            latitude,
            longitude,
            driverCoordinates: driverCoordinates.concat([conew]),
            driverDis:
              driverDis + this.calcDistance(conew),
            trk: conew
          });
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 500,
          distanceFilter: 10
        }
      );
    }
    componentDidUpdate(ppro, storeState) {
      if (this.props.latitude !== storeState.latitude) {
        this.nub.publish({
          message: {latitude: this.state.latitude,
            longitude: this.state.longitude,
          },
          channel: 'Channel-jwlw3zoxd',
        });
      }
    }
    componentWillUnmount() {
      Geolocation.clearWatch(this.watchID);
    }
  
    getMapRegion = () => ({
      latitudeDelta: laD,
      longitudeDelta: loD,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  
    calcDistance = newLatLng => {
      const { trk } = this.state;
      return haversine(trk, newLatLng) || 0;
    };
    
  
    render() {
      return (
        <View style={styles.container}>
         
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}

            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
          >
            <Polyline coordinates={this.state.driverCoordinates} strokeWidth={6} />
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
          <View style={styles.buttonContainer1}>
            <TouchableOpacity style={[styles.calc, styles.press2]}>
              <Text style={styles.bottomBarContent}>
                {parseFloat(this.state.driverDis).toFixed(2) } ...km
              </Text>
            </TouchableOpacity>
      
            </View>
          <View style={styles.bressc}>
            <TouchableOpacity style={[styles.calc2, styles.press]}
            onPress={() =>  this.props.navigation.navigate("TripDetail")}>
              <Text style={styles.bottomBarContent}>
               End trip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    map: {
      ...StyleSheet.absoluteFillObject
    },
    calc: {
      backgroundColor: "#7cfc00",
      flex: 1,
      borderRadius: 19,
      paddingHorizontal: 20,
      paddingVertical: 9,
    },
    calc2: {
      backgroundColor: "#8b0000",
      flex: 1,
      borderRadius: 19,
      paddingHorizontal: 20,
      paddingVertical: 9,
    },
    press: {
      marginHorizontal: 9,
      paddingHorizontal: 9,
      alignItems: "center",
      width: 79,
    },
    press2: {
      width: 79,
      paddingHorizontal: 79,
      alignItems: 'flex-start',
      marginHorizontal: 79
    },
    bressc: {
      flexDirection: "row",
      backgroundColor: "transparent",
      marginVertical: 19,
    },
    buttonContainer1: {
      flexDirection: "row",
      marginTop:22,
      alignItems:'center',
      backgroundColor: "transparent"
    }
  });