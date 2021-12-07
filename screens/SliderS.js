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
  export function SliderS (props){
    const { user, logout } = useContext(AuthContext);
      return(
          <View style={{flex:1}}>
              <DrawerContentScrollView {...props}>
                <View style ={styles.drawerstyle}>
                    <View style={styles.profileinfo}>
                        <View style = {styles.locat}>
                    <Icon name= "ios-person-circle-outline" size= {61}/>
                       <View>
                       <Title style = {styles.titleInfo}>{user.email}</Title>
                       <Caption style={styles.subtitle}>userID: {user.uid}</Caption>
                        </View>
                   </View>
                    </View>
                    <Drawer.Section>
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
                label="Profile"
                icon = {({color, size}) =>(
                    <Icon
                    color = {color}
                    size = {size}
                    name="md-person-outline"
                    />
                    )}
                    onPress={() => {props.navigation.navigate ('profile')}}
                />
                  <DrawerItem
                label="Book a trip"
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
          paddingLeft: 18,
      },
      titleInfo: {
          fontSize: 20,
          marginTop:4,
          fontWeight:'bold'
      },
      subtitle: {
          fontSize: 13,
          lineHeight: 13,
          fontWeight:'bold'
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