import React, { Component } from 'react';
import {
  Easing,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import APUhome from '../screens/APUhome';
import Icon from 'react-native-vector-icons/Ionicons'
import {Title } from 'react-native-paper'
const { width, height } = Dimensions.get('window');

const row = 5;
const column = 4;
const timer = 600;
const TEXT_HEIGHT = 20;
let picker = [];
let pressani = [];

for (var x = 0; x < row + column - 1; x++) {
  pressani.push(x);
}

Array(row * column).join('  ').split('  ').map((_, x) => {
  const seatind = x % column + Math.floor(x / column) % row;
  const seatit = {
    label: x + 1 < 10 ? '0' + (x + 1) : x + 1,
    s: seatind,
    key: x,
    animated: new Animated.Value(1)
  };

  picker.push(seatit);
});

export default class APUbus extends Component {

  constructor(props) {
    super(props);

    this.state = {
      finished: true,
      selectedItems: []
    };

    this.selectionAnimation = new Animated.Value(0);

    this.animatedValue = [];
    pressani.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }

  booking=()=>{                              //on preesing verify 'touchable opacity' on home screen

    Alert.alert
    (
      'Book this seat',
     'Are you sure you want to book this seat',
 
 
     [
 
       {text: 'No', onPress: () => console.log('Cancel Pressed'), },
       {text: 'Yes', onPress: () => this.props.navigation.navigate('APUHome') },
     ],
     { cancelable: false }
    )
 
 }
  
  
  


      // this.selectionAnimation.setValue(0);
  

  renderItem = ({ item }) => {
    const x = item.key;
    const scale = this.animatedValue[item.s].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });
    const { selectedItems } = this.state;
    const isSelected = selectedItems.includes(item.key);
   

    return (
      <TouchableOpacity
        onPress={this.booking.bind(this)}
        style={{
          opacity: 1 - parseInt(item.s) / 20
        }}>
        <Animated.View
          style={{
            transform: [
              {
                scale: item.animated
              }
            ]
          }}>
          <Animated.View
            style={[
              {
                backgroundColor: isSelected ? 'green' : 'white'
                
              },
              styles.item,
              {
                transform: [
                  {
                    scale
                  }
                ]
              }
            ]}>
              <Image style={styles.Imagestyle}  source = {require('../assets/icons/seatss.png')}/>
            <Animated.Text style={[styles.itemText]}>
              {item.label}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 120,
            width: 200,
            alignItems: 'flex-end',
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
         <View style={styles.profileinfo}>
                        <View style = {styles.locat}>
                        <Image style={styles.Imagestyle} source = {require('../assets/icons/driving_wheel.png')}/>
                       <View>
                       <Title style = {styles.titleInfo}>Choose your seat number</Title>
                        </View>
                   </View>
                    </View>
        
        </View>
        <FlatList
          numColumns={column}
          extraData={this.state.selectedItems}
          data={picker}
          style={{ flex: 1}}
          renderItem={this.renderItem}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flex: 0.4
          }}>
          <View
            style={{
              height: 22,
              backgroundColor: 'white',
              overflow: 'hidden',
            }}
            >
            <Animated.View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                transform: [
                  {
                    translateY: this.selectionAnimation
                  }
                ]
              }}>
              {Array(row * column).join(' ').split(' ').map((_, x) => {
                return (
                  <View
                    key={x}
                    style={{
                      height: TEXT_HEIGHT,
                      width: TEXT_HEIGHT ,
                      marginRight: 1,
                      alignItems: 'baseline',
                      justifyContent: 'flex-start'
                    }}>
                    <Text style={[styles.text]}>
                      {x}
                    </Text>
                  </View>
                );
              })}
            </Animated.View>
          </View>
          <Text style={styles.text}>
            Selected seats
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'snow'
  },
  item: {
    width: 90,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    color: 'black',
    fontWeight: 'bold'
  },
  act: {
    flexDirection : 'row', 
    paddingBottom : 1,
    marginTop: 9,
    borderBottomColor: 'black',
    borderBottomWidth: 2
},

  text: { fontSize: 19, fontWeight: 'bold' },
  locat:{
    flexDirection: 'row',
    marginTop: 14
},
profileinfo: {
  position: 'relative',
  right: 50,
  bottom: 5,
},
titleInfo: {
    fontSize: 20,
    marginTop:4,
    fontWeight:'bold'
},
Imagestyle: {
  justifyContent: 'center',
  alignItems: 'center',
  width: 80,
  height: 70,
  resizeMode: "stretch"
}

});