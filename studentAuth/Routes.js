import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Login from '../screens/Studentlogin';
import HomeStackScreen from '../screens/mainScreens';
import { AuthContext } from './AuthProvider';
import Loading from '../source/Loading';
import Drawers from '../source/Drawers';
import firestore from '@react-native-firebase/firestore'
import DetailScreen from '../screens/DetailTripDriverScreen'
import DriverDrawers from '../source/DriverDrawer';
import {View} from 'react-native'
import AdminDrawer from '../source/AdminDrawer';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [ userType, setUserType ] = useState("");
  // Handle user state changes
  
 async function onAuthStateChanged(User) {
  if (initializing) setInitializing(false);
  setLoading(false);
  setUser(User)
  if(User!=null)
  {
    setLoading(true);
    let useDocref= await firestore().collection('Users').doc(User.uid).get()
    setUserType(useDocref.data().userType)
    setLoading(false);
    
  }else
  {
    setUser("")
  }
    
    
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (user&&userType=="") {
    return <Loading />;
  }
 if(!user)
 {
  return (
    
      <Login />
    
  );
 }
 if(user && userType=="Student")
 {
  return (
   <Drawers />
  );
 }
 if(user && userType=="Driver")
 {
  return (
    <DriverDrawers />
  );
 }
 if(user && userType=="Admin")
 {
  return (
    <AdminDrawer />
  );
 }
}