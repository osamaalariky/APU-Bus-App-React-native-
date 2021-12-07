import React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import firestore, { firebase } from "@react-native-firebase/firestore";


const APUhome = ({navigation}) => {
    return(
        <View style = {styles.main}>
        <View style = {styles.top}>
           <Image style={styles.Imagestyle} source = {require('../assets/apu.png')}/>
           <Text style={styles.messeageOnTop}>
              APU Shuttle Bus
           </Text>
       </View>

      <View style={styles.container}>
      <View style={styles.cardpress,{paddingBottom:22}}>
        
      <TouchableOpacity 
     onPress={() => navigation.navigate("subscription")}
      style={[styles.cardpress, {
   
       borderColor: 'royalblue',
     
     }]}>
         <View>
        <Text style={[styles.cardtext, {
                     color: '#fff5ee',
                   }]}> <Icon
                name="ios-receipt-outline"
                size={25}

                color = "#fafad2"
                
                />    Book trip</Text>
                   </View>
      </TouchableOpacity>
      
    </View>
    <View style={styles.cardpress,{paddingBottom:22}}>
        
      <TouchableOpacity 
     onPress={() => navigation.navigate("payment")}
      style={[styles.cardpress, {
   
       borderColor: 'royalblue',
      
     }]}>
         <View>
        <Text style={[styles.cardtext, {
                     color: '#fff5ee',
                   }]}> <Icon
                   name="md-cash-outline"
                   size={25}
                   
                   color = "#fafad2"
                   
                   />    Pay</Text>
                   </View>
      </TouchableOpacity>
      
    </View>
    <View style={styles.cardpress,{paddingBottom:22}}>
        
      <TouchableOpacity 
     onPress={() => navigation.navigate("qr")}
      style={[styles.cardpress, {
   
       borderColor: 'royalblue',
      
     }]}>
         <View>
        <Text style={[styles.cardtext, {
                     color: '#fff5ee',
                   }]}> <Icon
                   name="qr-code-outline"
                   size={25}
                   
                   color = "#fafad2"
                   
                   />    Scan QR</Text>
                   </View>
      </TouchableOpacity>
      
    </View>
      
      </View>
      <View style={styles.cardpress,{paddingBottom:22}}>
        
        <TouchableOpacity 
       onPress={() => navigation.navigate("qr2")}
        style={[styles.cardpress, {
     
         borderColor: 'royalblue',
        
       }]}>
           <View>
          <Text style={[styles.cardtext, {
                       color: '#fff5ee',
                     }]}> <Icon
                     name="qr-code-outline"
                     size={25}
                     
                     color = "#fafad2"
                     
                     />    Scan QR</Text>
                     </View>
        </TouchableOpacity>
        
      </View>
      </View>
    );
  };
  export default APUhome;

  const styles = StyleSheet.create({
      container: {
        backgroundColor:'snow',  
        flex: 2,
        paddingVertical: 1,
        justifyContent: 'flex-start',
        paddingHorizontal:19,
        

      },
        main: {
            flex: 2,
            backgroundColor: 'snow',
        },
        top: {
              flex: 1,
              paddingBottom: 49,
              justifyContent:'flex-start',
              paddingHorizontal: 49,
              alignItems: 'center',
              marginTop: 30
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
            backgroundColor: "#8E44AD",
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
          width: 120,
          height: 120,
          resizeMode: "stretch"
        },
        cardpress: {
          width: '100%',
          height: 60,
          borderWidth: 1,
          padding:3,
          backgroundColor:'#2980B9',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          padding: 3,
          flexDirection: 'row',
          justifyContent: 'flex-start'
          
       
          
         
      },
      cardtext: {
          fontSize: 20,
          fontWeight: 'bold',
          
      },

  });