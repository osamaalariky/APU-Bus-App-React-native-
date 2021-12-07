import 'react-native-gesture-handler';

 import React, {useState, useContext, useEffect} from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import { createStackNavigator } from '@react-navigation/stack';

 import mainScreens from '../screens/mainScreens';
 import { SliderS } from '../screens/SliderS';
 import helpCenter from '../screens/helpCenter';
 import subscription from '../screens/subscription';
 import history from '../screens/history';
 import Studentlogin from '../screens/Studentlogin';
import { ActivityIndicator, View } from 'react-native';
import Providers from '../studentAuth';
import Logout from '../screens/Logout';
import APUbus from '../schdules/APUbus';
import APIITbus from '../schdules/APIITbus';
import CObus from '../schdules/CObus';
import DetailScreen from '../screens/DetailTripDriverScreen';
import CounterDownTimer from './CounterDown';
import TrackBus from '../screens/TrckBus';
import payment from '../screens/payment';
import Admin from '../screens/admin';
import qr from '../screens/qr';
import mapp from '../screens/mapp';
import adminScreen from '../screens/adminScreen';
import studentadmin from '../screens/studentadmin';
import astrip from '../screens/astrip';

const Drawer = createDrawerNavigator();

const Drawers = () => {
  
 return(
       
     <Drawer.Navigator drawerContent = {props => <SliderS {...props}/> }>
           <Drawer.Screen name="Home" component={mainScreens} />
           <Drawer.Screen name ="helpCenter" component = {helpCenter}/>
           <Drawer.Screen name ="subscription" component = {StackNavForSubscription}/>
           <Drawer.Screen name ="TripDetail" component = {DetailScreen}/>
           <Drawer.Screen name ="admin" component = {Admin}/>
           <Drawer.Screen name ="history" component = {history}/>
           <Drawer.Screen name ="Logout" component = {Logout}/>
           <Drawer.Screen name ="APUbus" component = {APUbus}/>
           <Drawer.Screen name ="APIITbus" component = {APIITbus}/>
           <Drawer.Screen name ="CObus" component = {CObus}/>
           <Drawer.Screen name ="TrackBus" component = {TrackBus}/>
           <Drawer.Screen name ="payment" component = {payment}/>
           <Drawer.Screen name ="qr" component = {qr}/>
           <Drawer.Screen name ="adminScreen" component = {adminScreen}/>
           <Drawer.Screen name ="studentadmin" component = {studentadmin}/>
           <Drawer.Screen name ="astrip" component = {astrip}/>

     </Drawer.Navigator> 
  
  ) }
   

  
 function StackNavForSubscription() {
       const Stack = createStackNavigator();
        return (
              <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name ="subscriptionScreen" component = {subscription}/>
            <Stack.Screen name ="CounterDownTimer" component = {CounterDownTimer}/>
          
              </Stack.Navigator>
        )
  }
  

   export default Drawers;