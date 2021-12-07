
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Alert, 
  Dimensions,
  Platform
} from 'react-native';


import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {locations} from '../Data/Data';
import CuMarker from '../source/CuMarker';
import Geolocation from '@react-native-community/geolocation';
import{request, PERMISSIONS} from 'react-native-permissions';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default class Map extends Component{

  region = {
    latitude: 3.0553,
    longitude: 101.7005,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

showtable =() => {
  Alert.alert(
  'Do you want to check for bus schdules',
  "choose one",

    [
    {
      text: 'Cancel',
      style: 'cancel'
    },
    {
      text: 'Yes'
      
    }
  ]
  )
}


userLocation = () =>{
  Geolocation.getCurrentPosition(
    position => {
      console.log(JSON.stringify(position));
      let region = {}
    })
}

onCarouselItemChange = (index) => {
  let location = locations[index];
  this.region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01
  }
  // this._map.animateToRegion =( {
    
    
  // })
  this._map.animateToRegion(this.region)
 // console.log(location);
  
}
markpress = (location, index) => {
  this.region = ({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01
  })
  // this._map.animateToRegion =( {
    
    
  // })
  this._map.animateToRegion(this.region);
  this._carousel.snapToItem(index);
 // console.log(location);
  
}
renderCarouselItem = ({item}) =>
<View style={styles.picCard}>
 <Text style={styles.titleCard}>{item.title}</Text>
 <Image style={styles.swipeCard} source ={item.image}/>
 
 <View style={styles.button}>
   <TouchableOpacity 
  onPress={() => { this.props.navigation.navigate("details") }} 
   style={[styles.cardpress, {

    borderColor: '#4682b4',
    borderWidth: 1
  }]}>
     <Text style={[styles.cardtext, {
                  color: '#fff5ee',
                }]}>check bus schdules</Text>
   </TouchableOpacity>
 </View>
</View>
render(){
  //console.log(locations);
  return( 
    <View style = {styles.container}>
      <MapView 
      provider = {PROVIDER_GOOGLE}
      ref={map=> this._map = map}
      style = {styles.map}
      initialRegion ={this.region}
>
      

        {
          locations.map((marker, index) =>(
            <Marker
            key={index}
            //onPress={() => this.markpress(marker, index)}
          //  onPress = {this.showtable}
            coordinate = {{latitude: marker.latitude, 
              longitude: marker.longitude,
              
              
            }}
            title = {marker.title}
            onPress = {this.showtable}
            onPress={() => this.markpress(marker, index)}
            
            
            >
              
              <CuMarker item = {marker}/>
            
             
              
            </Marker>

          ))
        }


      </MapView>
      <Carousel
            ref={(c) => { this._carousel = c; }}
            data={locations}
            containerCustomStyle={styles.carousel}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            onSnapToItem={(index) => this.onCarouselItemChange(index)}
          />
    </View>
  );
  }
};



  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#ffff'
    },
    map:{
      ...StyleSheet.absoluteFillObject
    },
    carousel: {
      position: 'absolute',
      bottom: 0,
      marginBottom: 48
    },
    picCard: {
      backgroundColor: 'cornflowerblue',
      height : 200,
      width: 300,
      padding: 24,
      borderRadius: 24
    },
    titleCard: {
      fontSize: 20,
      alignSelf: 'center'
    },
    swipeCard: {
      height: 120,
      width: 300,
      bottom: 0,
      position: 'absolute',
      borderBottomRightRadius: 24,
      borderBottomLeftRadius: 24
    },
    cardpress: {
      width: '100%',
      borderWidth: 1,
      padding:3,
      backgroundColor:'#4682b4',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      padding: 3,
   
      
     
  },
  cardtext: {
      fontSize: 14,
      fontWeight: 'bold',
      
  }
  });

  