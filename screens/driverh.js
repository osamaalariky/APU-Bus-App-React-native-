import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import APUhome from './APUhome';
import detailsScreen from './detailsScreen';
import Map from './Map';
import profile from './profile';
import mapp from './mapp';
import { Image } from 'react-native';


const ma = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();


const driverh = () => (

    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#a9a9a9"
      barStyle={{ backgroundColor: '#6495ed' }}
    >
      <Tab.Screen
        name="mapp"
        component={mappp}
        options={{
          tabBarLabel: '',
          tabBarColor: 'snow',
          tabBarIcon: () => (
            < Icon name="map" color='white' size={26} />
          ),
        }}
      />
     
    </Tab.Navigator>
); 

export default driverh;

const mappp =({navigation}) => (
    <ma.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#6495ed"
      },
      headerTintColor: '#ffff',
      headerTitleStyle:{
      fontWeight: 'bold'
      },
    }}>
     <ma.Screen name="Home" component={mapp} options={{
       title: 'Driver Map',
       headerLeft: () => (
         <Icon.Button name= 'reorder-three-sharp' size ={30}
         backgroundColor = "#6495ed" onPress={()=> {navigation.navigate("TripDetail")}}>
  
         </Icon.Button>
       )
     }} />
   </ma.Navigator>
  );
  
 
  