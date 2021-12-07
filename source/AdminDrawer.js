import React, {useState, useContext, useEffect} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { SliderS } from '../screens/SliderS';

import Admin from '../screens/admin';
import adminScreen from '../screens/adminScreen';
import studentadmin from '../screens/studentadmin';
import astrip from '../screens/astrip';


const Drawer = createDrawerNavigator();

const AdminDrawer = () => {
 
return(
      
    <Drawer.Navigator>

          <Drawer.Screen name ="admin" component = {Admin}/>
          <Drawer.Screen name ="adminScreen" component = {adminScreen}/>
          <Drawer.Screen name ="studentadmin" component = {studentadmin}/>
          <Drawer.Screen name ="astrip" component = {astrip}/>
          

    </Drawer.Navigator> 
 
 ) }
  
  export default AdminDrawer;