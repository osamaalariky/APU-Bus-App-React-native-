import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import APUhome from './APUhome';
import detailsScreen from './detailsScreen';
import Map from './Map';
import profile from './profile';
import { Image } from 'react-native';


const HomeStack = createStackNavigator();
const detailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();


const mainScreens = () => (

    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#a9a9a9"
      barStyle={{ backgroundColor: '#6495ed' }}
    >
      <Tab.Screen
        name="APUHome"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'APU',
          tabBarColor: '#6495ed',
          tabBarIcon: ({color}) => (
            < Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="details"
        component={detailsStackScreen}
        options={{
          tabBarLabel: 'schdules',
          tabBarColor: '#6495ed', 
          tabBarIcon: ({ color }) => (
            <Icon name="md-bus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: 'Map',
          tabBarColor: '#6495ed',
          tabBarIcon: ({ color }) => (
            <Icon name="map" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="profile"
        component={profile}
        options={{
          tabBarLabel: 'profile',
          tabBarColor: '#6495ed',
          tabBarIcon: ({ color }) => (
            <Icon name="md-person-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
); 

export default mainScreens;

const HomeStackScreen =({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#6495ed"
      },
      headerTintColor: '#ffff',
      headerTitleStyle:{
      fontWeight: 'bold'
      },
    }}>
     <HomeStack.Screen name="Home" component={APUhome} options={{
       title: 'APU Shuttle Bus',
       headerLeft: () => (
         <Icon.Button name= 'reorder-three-sharp' size ={30}
         backgroundColor = "#6495ed" onPress={()=> {navigation.openDrawer()}}>
  
         </Icon.Button>
       )
     }} />
   </HomeStack.Navigator>
  );
  
  const detailsStackScreen =({navigation}) => (
    <detailsStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "#6495ed"
      },
      
      headerTintColor: '#ffff',
      headerTitleStyle:{
        fontWeight: 'bold'
      },
    }}>
     <detailsStack.Screen name="details" component={detailsScreen} options={{
        headerLeft: () => (
          <Icon.Button name= 'reorder-three-sharp' size ={30}
          backgroundColor = "#6495ed" onPress={()=> {navigation. openDrawer()}}>
   
          </Icon.Button>
        )
     }} />
     
   </detailsStack.Navigator>
  );
  