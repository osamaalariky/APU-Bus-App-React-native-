/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';

 import React, {useState, useContext, useEffect} from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import mainScreens from './screens/mainScreens';
 import { SliderS } from './screens/SliderS';
 import helpCenter from './screens/helpCenter';
 import subscription from './screens/subscription';
 import history from './screens/history';
 import Studentlogin from './screens/Studentlogin';
import { ActivityIndicator, View } from 'react-native';
import Providers from './studentAuth/index';
import Logout from './screens/Logout';



 
 const Drawer = createDrawerNavigator();
 
 
const App = () => {
  
  
  return <Providers/>; {/* (
      <NavigationContainer>
     
   <Drawer.Navigator drawerContent = {props => <SliderS {...props}/> }>
         <Drawer.Screen name="Home" component={mainScreens} />
         <Drawer.Screen name ="helpCenter" component = {helpCenter}/>
         <Drawer.Screen name ="subscription" component = {subscription}/>
         <Drawer.Screen name ="history" component = {history}/>
         <Drawer.Screen name ="Logout" component = {Logout}/>
   </Drawer.Navigator> 
   </NavigationContainer>
   );*/}
 }
 
 export default App;