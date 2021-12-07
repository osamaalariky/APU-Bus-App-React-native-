import React, { useContext } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import { DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Switch, Title, TouchableRipple, Caption, Paragraph, Drawer } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../studentAuth/AuthProvider'; 
import auth from '@react-native-firebase/auth';
export default function profile(props){

 const { user, logout } = useContext(AuthContext);
 return(
     <View style={{flex:1}}>
         <DrawerContentScrollView {...props}>
           <View style ={styles.drawerstyle}>
               <View style={styles.profileinfo}>
                   <View style = {styles.locat}>
               <Icon name= "ios-person-circle-outline" size= {200}/>
              </View>
                  <View>
                  <Caption style={styles.subtitle}>Joined: {user.metadata.creationTime}</Caption>
                   </View>
               </View>
              
               <Drawer.Section>
                 <View style={styles.act}>
                   
                 <Title style={{paddingBottom : 10,}}>   <Icon
               name="mail-outline"
               size={25}
               color = "black"
               />     {user.email}</Title>
                  <Text style ={{}}>    <Icon
                name="md-person-outline"
                size={25}
                color = "black"
                />       {user.uid}</Text>
                </View>
               <DrawerItem
           label="Home"
           icon = {({color, size}) =>(
               <Icon
               color = {color}
               size = {size}
               name="md-home-outline"
               />
               )}
               onPress={() => {props.navigation.navigate ('APUHome')}}
           />
             <DrawerItem
           label="Subscription"
           icon = {({color, size}) =>(
               <Icon
               color = {color}
               size = {size}
               name="md-cash-outline"
               />
               )}
               onPress={() => {props.navigation.navigate ('subscription')}}
           />
             <DrawerItem
           label="History"
           icon = {({color, size}) =>(
               <Icon
               color = {color}
               size = {size}
               name="md-calendar-outline"
               />
               )}
               onPress={() => {props.navigation.navigate ('history')}}
           />
             <DrawerItem
           label="Help Center"
           icon = {({color, size}) =>(
               <Icon
               color = {color}
               size = {size}
               name="information-circle-outline"
               />
               )}
               onPress={() => {props.navigation.navigate ('helpCenter')}}
           />
               </Drawer.Section>
           </View>
         </DrawerContentScrollView>
         <Drawer.Section style={styles.downdrawerpart}>
           <DrawerItem
           label="Log Out"
           icon = {({color, size}) =>(
               <Icon
               color = {color}
               size = {size}
               name="md-log-out-outline"
               />
               )}
               onPress={() => {props.navigation.navigate ('Logout')}}
           />
         </Drawer.Section>
     </View>
 );
}


const styles = StyleSheet.create({
 drawerstyle: {
     flex:1,
 },
 profileinfo: {
     paddingLeft: 5,
     alignItems: 'center'
 },
 titleInfo: {
     fontSize: 20,
     marginTop:4,
     fontWeight:'bold',
 },
 subtitle: {
     fontSize: 13,
     lineHeight: 13,
     fontWeight:'bold',
 },
 act: {
  flexDirection : 'column', 
  paddingBottom : 7,
  marginTop: 9,
  borderBottomColor: '#808080',
  borderBottomWidth: 2
},
 rowInfo: {
     marginTop: 19,
     flexDirection: 'row',
     alignItems: 'center',
 },
 part: {
     flexDirection: 'row',
     alignItems: 'center',
     marginRight: 16
 },
 textinfo: {
     fontWeight: 'bold',
     marginRight: 4
 },
 drawerpart: {
     marginTop: 14,
 },
 downdrawerpart: {
     marginBottom: 14,
     borderTopColor: '#c0c0c0',
     borderTopWidth: 1
 },
 choice: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     paddingVertical: 11,
     paddingHorizontal: 15
 },
 locat:{
     flexDirection: 'row',
     marginTop: 14
 }
});