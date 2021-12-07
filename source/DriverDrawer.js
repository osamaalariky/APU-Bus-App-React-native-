import 'react-native-gesture-handler';

 import React, {useState, useContext, useEffect} from 'react';

 import { createDrawerNavigator } from '@react-navigation/drawer';

 import { SliderS } from '../screens/SliderS';
 import DetailScreen from '../screens/DetailTripDriverScreen';
import mapp from '../screens/mapp';
import driverh from '../screens/driverh';


const Drawer = createDrawerNavigator();

const DriverDrawers = () => {
  
 return(
       
     <Drawer.Navigator>
      
           <Drawer.Screen name ="TripDetail" component = {DetailScreen}/>
           <Drawer.Screen name ="mapp" component = {mapp}/>
     </Drawer.Navigator> 
  
  ) }
   
   export default DriverDrawers;