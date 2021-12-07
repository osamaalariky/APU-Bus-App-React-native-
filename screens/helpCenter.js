import React from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { Linking } from 'react-native'


const helpCenter = ({navigation}) => {
    return(
      <View style={styles.main}>
       <View style = {styles.top}>
           <Image style={styles.Imagestyle} source = {require('../assets/apu.png')}/>
           <Text style={styles.messeageOnTop}>
              Welcome to APU Shuttle bus help center
           </Text>
           <Text style={styles.messageOnBottom}>
              Looking for help with APU Shuttle bus app, or you have questions about the app??{"\n"}
              Contact us via mail or call us.
           </Text>
           </View>
           <View style={styles.act}>
         <View style={{flexDirection: 'row'}}>
           
            <Icon
                 name="mail-outline"
                 size={25}
                 color = "black"
                 
                 />   
                  <Button  size={25} onPress={() => Linking.openURL('mailto:tp052107@mail.apu.edu.my') }
      title="support@example.com" />
      </View>
   
      <View style={{flexDirection: 'row'}}>
                    <Icon 
                   name="ios-call-outline"
                  size={25}
                  color = "black"
                  />     
        </View>
                  
               <Button  size={25} onPress={() => Linking.openURL(`tel:${'+60189873452'}`) }
      title="+60189873452" />
              </View>
          
       </View>
       
    
       
    );
  };
  export default helpCenter;

  const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'snow'
    },
    top: {
          flex: 1,
          paddingBottom: 69,
          justifyContent: 'flex-start',
          paddingHorizontal: 49,
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
    act: {
      flexDirection : 'row', 
      borderBottomColor: '#808080',
      borderBottomWidth: 3,
      alignItems: 'center'
      
  },
    messeageOnTop:{
      fontSize: 25,
      color: "black",
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom : 77,
    },
    messageOnBottom:{
      fontSize: 30,
      color: "black",
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    act: {
        flexDirection : 'row', 
        paddingBottom : 80,
        marginTop: 9,
        borderBottomColor: '#808080',
        borderBottomWidth: 2,
        
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
      width: 155,
      height: 155,
      resizeMode: "stretch"
    }
});