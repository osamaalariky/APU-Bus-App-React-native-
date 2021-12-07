import React from 'react';

import {createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Register from './Register';
import logindesign from './logindesign';

const loggstack = createStackNavigator();

const Studentlogin = ({navigation}) =>(
    <loggstack.Navigator headerMode='none'>
      
        <loggstack.Screen name = "Login" component = {Login}/>
        <loggstack.Screen name = "Register" component = {Register}/>
    </loggstack.Navigator>
);

export default Studentlogin;