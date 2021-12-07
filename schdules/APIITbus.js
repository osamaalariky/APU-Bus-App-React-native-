import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Alert, 
  Dimensions,
  TouchableOpacity,
  ScrollView
  } from 'react-native';
  import {APIITloc} from '../Data/APIITData';
  import profile from '../screens/profile';
  import { useNavigation } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
 
  export default class APIITbus extends Component {
    showArrayItem = (item) => {
      
      Alert.alert(item, screenName);
      
      
      
    }
    
  


   
    render(){
   
      return (
   
        <View style={styles.container}>
   
          <ScrollView>
   
            {
              APIITloc.map((item, key) => (
                <TouchableOpacity key={key} onPress={this.showArrayItem.bind(this, item.title)}>
                  <View style={styles.picCard}>
   
                
    <Text style={styles.titleCard}>To {item.title}</Text>
    <Image style={styles.swipeCard} source ={item.image}/>
    <View style={styles.button}>
      <TouchableOpacity 
     onPress={() => this.props.navigation.navigate(item.screenName)}
      style={[styles.cardpress, {
   
       borderColor: '#4682b4',
       borderWidth: 9
     }]}>
        <Text style={[styles.cardtext, {
                     color: '#fff5ee',
                   }]}>Check schdules</Text>
      </TouchableOpacity>
    </View>

                </View>
               
                </TouchableOpacity>
              ))
            }
   
            
          </ScrollView>
          
        </View>
       
      );
    }};


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    margin: 1,
    borderWidth:0,
    backgroundColor:'#ffe4e1',
    borderTopColor: "#B0B0B000",
    borderBottomColor: "#B0B0B000",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingTop: (Platform.OS) === 'android' ? 5 : 0,
    
    },
    map:{
      ...StyleSheet.absoluteFillObject
    },
    carousel: {
      position: 'absolute',
      bottom: 0,
      marginBottom: 48
    },
    picCard: {
      backgroundColor: '#4682b4',
      height : 300,
      width: 390,
      
      padding: 24,
      borderRadius: 24
    },
    titleCard: {
      fontSize: 28,
      alignSelf: 'center'
    },
    swipeCard: {
      height: 190,
      width: 390,
      bottom: 0,
      position: 'absolute',
      borderBottomRightRadius: 24,
      borderBottomLeftRadius: 24
    },
    cardpress: {
      width: '100%',
      height: 60,
      borderWidth: 1,
      padding:3,
      backgroundColor:'#778899',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      padding: 3,
   
      
     
  },
  cardtext: {
      fontSize: 20,
      fontWeight: 'bold',
      
  }
  })