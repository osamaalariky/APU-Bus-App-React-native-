import React, { useContext } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import App from '../App';
import Providers from '../studentAuth';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../studentAuth/AuthProvider';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

export default function Logout(){
    const { user, logout } = useContext(AuthContext);
    const navigation = useNavigation();

  return (
    <View style = {styles.top}>
      <Text style={styles.messeageOnTop}> Are you sure you want to sign out</Text>
      <TouchableOpacity onPress={() => logout()}  style={styles.press}>
              <Text style={styles.presstext}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity   onPress={navigation.goBack} style={styles.pressre}>
              <Text style={styles.presstextre}>No</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    main: {
        flex: 2,
        backgroundColor: '#b0c4de'
    },
    top: {
          flex: 1,
          paddingBottom: 49,
          justifyContent: 'center',
          paddingHorizontal: 19,
          alignItems: 'center'
    },
    bottom: {
      backgroundColor:'#4682b4',  
      flex: 2,
      paddingVertical: 29,
      borderTopLeftRadius:29,
      paddingHorizontal:19,
      borderTopRightRadius:29

    },
    messeageOnTop:{
      fontSize: 29,
      color: "black",
      fontStyle: 'normal',
      fontWeight: 'bold'
    },
    messageOnBottom:{
      fontSize: 20,
      color: '#fafad2',
      fontWeight: 'bold'
    },
    act: {
        flexDirection : 'row', 
        paddingBottom : 1,
        marginTop: 9,
        borderBottomColor: '#808080',
        borderBottomWidth: 2
    },
    userInput: {
      color: '#053b5a',
      flex: 1,
      marginTop: Platform.OS === 'android' ? 0 : -11,
      paddingLeft: 9
    },
    press: {
        marginTop:49,
        alignItems: 'center',
        justifyContent:'center',
        elevation: 8,
        backgroundColor: "#778899",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 30,
        width: '100%',
        height: 49,
    },
    presstext:{
      fontSize: 18,
      color: "#fafad2",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    pressre: {
      marginTop:49,
      alignItems: 'center',
      justifyContent:'center',
      elevation: 8,
      backgroundColor: "#b0c4de",
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 30,
      width: '100%',
      height: 49,
      borderWidth: 1,
      marginTop: 14,
      borderColor: '#778899'
  },
  presstextre:{
    fontSize: 18,
    color: "#778899",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
    login:{
        borderRadius: 9,
        width: '100%',
        height: 49,
        alignItems: 'center',
        justifyContent:'center'
    },
    messagelog: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    Imagestyle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height: 150,
      resizeMode: "stretch"
    }
});