import React, {Component, useContext} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  LogBox
} from 'react-native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../studentAuth/AuthProvider';
import {Picker} from '@react-native-picker/picker';
import Auth from '@react-native-firebase/auth';
import {Title} from 'react-native-paper';
import CounterDownTimer from '../source/CounterDown'
// let difference = arr1.filter(x => !arr2.includes(x));
LogBox.ignoreAllLogs();
const NameOfCity = [
  {
    City: 'Please Select Location',
    id: "01102",
  },
  {
    City: 'APU',
    id: 0,
  },
  {
    City: 'APIIT',
    id: 1,
  },
  {
    City: 'SOUTH CITY',
    id: 2,
  },
  {
    City: 'FORTUNE PARK',
    id: 3,
  },
  {
    City: 'SKY VILLA',
    id1: 4,
  },
  {
    City: 'LRT',
    id: 5,
  },
  {
    City: 'ENDAH',
    id: 6,
  },
  {
    City: 'COVILLEA',
    id: 7,
  },
];
const TimeToStart = [
  {
    time: '9:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '11:00 AM',
  },
  {
    time: '12:00 PM',
  },
  {
    time: '1:00 PM',
  },
];

const Seats = [
  {
    seat: '1',
  },
  {
    seat: '2',
  },
  {
    seat: '3',
  },
  {
    seat: '4',
  },
  {
    seat: '5',
  },
  {
    seat: '6',
  },
  {
    seat: '7',
  },
  {
    seat: '8',
  },
  {
    seat: '9',
  },
  {
    seat: '10',
  },
  {
    seat: '11',
  },
  {
    seat: '12',
  },
  {
    seat: '13',
  },
  {
    seat: '14',
  },
  {
    seat: '15',
  },
  {
    seat: '16',
  },
  {
    seat: '17',
  },
  {
    seat: '18',
  },
  {
    seat: '19',
  },
  {
    seat: '20',
  },
];

export default function subscription({navigation,route}) {
  const [fromLocation, setFromLocation] = React.useState('APU');
  const [toLocation, setToLocation] = React.useState();
  const [totalSeatsItems, settotalSeatsItems] = React.useState(Seats);
  const [documentId, setDocumentId] = React.useState('');
  const [ToLocationCity, setToLocationCity] = React.useState([
    {
      City: 'select from location',
      id: 0,
    },
  ]);
  const [FromLocationCity, setFromLocationCity] = React.useState(NameOfCity);
  const [tripStartingTime, setTripStartingTime] = React.useState('9:40 PM');
  const [seatNumber, setSeatNumber] = React.useState();
  const [tripStatus, setTripStatus] = React.useState('');
  const [CountDown, setCountDown] = React.useState();
  // React.useEffect(()=>{
  //   let arrayCity=NameOfCity;

  //   setToLocationCity(arrayCity.filter((city)=>!(city.City==fromLocation)))
  // },[fromLocation])


  React.useEffect(()=>{
    checkBooking()
    if(tripStatus=="upcoming")
    {
      navigation.replace("CounterDownTimer")
    }
   
  },[tripStatus])

  React.useEffect(() => {
    let arrayCity = NameOfCity;

    setFromLocationCity(arrayCity.filter(city => !(city.City == toLocation)));
  }, [toLocation]);

  React.useEffect(async()=>{
    let city = [];
    await firestore()
      .collection('Upcoming_Trips')
      .where('fromlocation', '==', fromLocation)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          city.push({
            City: documentSnapshot.get('tolocation'),
          });
        });
      });
    setToLocationCity(city);
  },[])


 

  const checkBooking = async ()=>{
    let data=await firestore()
      .collection('Users')
      .doc(Auth().currentUser.uid)
      .collection("TripData")
      .doc('bookedData').get()
      if(data.exists)
      {
      setTripStatus(data.data().tripStatus)
      }
      
      
  }

  const updateBookedSeat = async () => {

    let docref=firestore().collection('Upcoming_Trips').doc(documentId);
    if((typeof(await docref.get()).data().bookedSeatsNumber)=="undefined")
    {
      docref
    .update({
      bookedSeatsNumber:[{
        StudentBooked: Auth().currentUser.uid,
        seat: seatNumber,
      }]
    });
    }
    else{
      docref
    .update({
      bookedSeatsNumber: firebase.firestore.FieldValue.arrayUnion({
        StudentBooked: Auth().currentUser.uid,
        seat: seatNumber,
      }),
    });
    }
  };

  const addRandomUser = async (fromlocation,tolocation,documentid,seat,startingtime) => {
    //let locto = this.setState({ selectedcat1: value});
    // const {user} = React.useContext(AuthContext);
    updateBookedSeat();
    await firestore()
      .collection('Users')
      .doc(Auth().currentUser.uid)
      .collection("TripData")
      .doc('bookedData')
      .set({
         fromlocation:fromlocation,
         tolocation:tolocation,
         documentId:documentid,
         seat:seat,
         startingTime:startingtime,
         tripStatus:"upcoming",
        }).then(()=>{
          setTripStatus("booked")
          updateBookedSeat()
        })
  };

  const getToLocation = async fromLocationValue => {
    let city = [{
      City: 'Please Select Location',
      id: "01102",
    }];
    await firestore()
      .collection('Upcoming_Trips')
      .where('fromlocation', '==', fromLocationValue)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          city.push({
            City: documentSnapshot.get('tolocation'),
          });
        });
      });
      if(city!="undefined")
      {
        
    setToLocationCity(city);
    getBookedSeats()
      }else{
        setToLocationCity([{
          City: 'No Bus On This route',
          id: "01102",
        }]);
      }
    
  };

  const getBookedSeats = async (tolocation,time) => {
    let seat = [],match='no';
    let difference = Seats;
    await firestore()
      .collection('Upcoming_Trips')
      .where('fromlocation', '==', fromLocation)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          if (tolocation == documentSnapshot.get('tolocation')&&time == documentSnapshot.get('time')&&match=="no") {
            setDocumentId(documentSnapshot.id);
            

            seat = documentSnapshot.get('bookedSeatsNumber');
           if(typeof(seat)=="object"){
            for (let i = 0; i < seat.length; i++) {
              for (let j = 0; j < Seats.length; j++) {
                if (Number(Seats[j].seat) != seat[i].seat) {
                  difference = difference.filter(x => x.seat != seat[i].seat);
                }
              }
            }
            setSeatNumber(difference[0].seat)
            settotalSeatsItems(difference);
            console.log("reach")
            match='yes'
           }
           
          } 
          if(match=='no')
          {
            
              setSeatNumber(Seats[0].seat)
              settotalSeatsItems(Seats);
             
          }
        })
      })
  };

  return (
    <View style={styles.main}>
   
    <View style={{padding: 10}}>
      <View style={styles.titleContainer}>
        <Title style={styles.titlestyle}>Book your Trip</Title>
      </View>
      <Text
        style={[
          styles.cardtext,
          {
            color: '#2980B9',
            marginLeft:10
          },
        ]}>
        From
      </Text>

      <View style={styles.act}>
        <Picker
          itemStyle={styles.press}
          mode="dropdown"
          style={styles.userInput}
          selectedValue={fromLocation}
          onValueChange={value => {
            setFromLocation(value);
            getToLocation(value);
          }}>
          {FromLocationCity.map((item, index) => (
            <Picker.Item
              key={index}
              color="#0087F0"
              label={item.City}
              value={item.City}
              index={index}
            />
          ))}
        </Picker>
      </View>

      <Text
        style={[
          styles.cardtext,
          {
            color: '#2980B9',
            marginLeft:10
          },
        ]}>
        To
      </Text>
      <View style={styles.act}>
        <Picker
          itemStyle={styles.itemStyle}
          mode="dropdown"
          style={styles.userInput}
          enabled={ToLocationCity!=""?true:false}
          selectedValue={toLocation}
          onValueChange={value => {
            setToLocation(value);
            
          }}>
          {ToLocationCity.map((item, index) => (
            <Picker.Item
              color="#0087F0"
              key={index}
              label={item.City}
              value={item.City}
              index={index}
            />
          ))}
        </Picker>
      </View>
      <Text
        style={[
          styles.cardtext,
          {
            color: '#2980B9',
            marginLeft:10
          },
        ]}>
        Schedules
      </Text>

      <View style={styles.act}>
        <Picker
          itemStyle={styles.press}
          mode="dropdown"
          enabled={toLocation!=''?true:false}
          style={styles.userInput}
          selectedValue={tripStartingTime}
          onValueChange={time => {
            setTripStartingTime(time);
            getBookedSeats(toLocation,time);
          }}>
          {TimeToStart.map((item, index) => (
            <Picker.Item
              color="#0087F0"
              key={index}
              label={item.time}
              value={item.time}
              index={index}
            />
          ))}
        </Picker>
      </View>
      <Text
        style={[
          styles.cardtext,
          {
            color: '#2980B9',
            marginLeft:10
          },
        ]}>
        Seat Number
      </Text>

      <View style={styles.act}>
        <Picker
          itemStyle={styles.press}
          mode="dropdown"
          style={styles.userInput}
          selectedValue={seatNumber}
          onValueChange={value => {
            setSeatNumber(value);
            
          }}>
          {totalSeatsItems.map((item, index) => (
            <Picker.Item
              color="#0087F0"
              key={index}
              label={item.seat}
              value={item.seat}
              index={index}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
      
        style={styles.ArrangeTripButton}
        onPress={() => {
          if(ToLocationCity.length<=0)
          {
            alert("please select all the required field")
          }
          else
          {
            addRandomUser(fromLocation,toLocation,documentId,seatNumber,tripStartingTime);
          }
        }}>
        <Text style={styles.ButtonText}>Book Trip</Text>
      </TouchableOpacity>
    </View>
    </View>

 );
}

const styles = StyleSheet.create({
  main: {
    flex: 2,
    backgroundColor: 'snow',
  },
  top: {
    flex: 1,
    paddingBottom: 49,
    justifyContent: 'center',
    paddingHorizontal: 19,
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: 'snow',
    flex: 2,
    paddingVertical: 29,
    borderTopLeftRadius: 29,
    paddingHorizontal: 19,
    borderTopRightRadius: 29,
  },
  messeageOnTop: {
    
    fontSize: 29,
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  messageOnBottom: {
    fontSize: 20,
    color: '#fafad2',
    fontWeight: 'bold',
  },
  act: {
    flexDirection: 'row',
    paddingBottom: 1,
    marginTop: 9,
    borderBottomWidth: 2,
    width: '100%',
    height: 55,
    borderWidth: 1,

    padding: 3,
    backgroundColor: '#6495ed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: 3,
    
  },
  userInput: {
    color: 'snow',
    flex: 1,
    marginTop: Platform.OS === 'android' ? 0 : -11,
    paddingLeft: 9,
  },
  press: {
    marginTop: 49,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    backgroundColor: 'snow',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 30,
    width: '100%',
    height: 49,
  },
  presstext: {
    fontSize: 18,
    color: '#fafad2',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  pressre: {
    marginTop: 49,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    backgroundColor: 'snow',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 30,
    width: '100%',
    height: 49,
    borderWidth: 1,
    marginTop: 14,
    borderColor: 'snow',
  },
  presstextre: {
    fontSize: 18,
    color: '#778899',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  login: {
    borderRadius: 9,
    width: '100%',
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagelog: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Imagestyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  ArrangeTripButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#3366FF',
    marginTop: 20,
  },
  ButtonText: {color: '#ffffff'},
  titleContainer: {margin: 30, justifyContent: 'center', alignItems: 'center'},
  titlestyle: {color: '#6495ed'},
});

{
  /* <TextInput 
onChangeText={(value)=>setTotalSeats(value)}
keyboardType="number-pad"
value={totalseats}
style={[styles.act,{paddingLeft: 20}]}
maxLength={2}
returnKeyType="go"

/> */
}

const addRandomUser = async () => {
  //let locto = this.setState({ selectedcat1: value});
  // const {user} = React.useContext(AuthContext);
  let uid='';
  let TripTime='';

  console.log(totalseats)
  if(parseInt(totalseats)<5)
  {
Alert.alert('Error Messgae', 'Please Enter Correct Number Of Toatal seats!', [

  {text: 'Try Again', onPress: () => {}},
]);
    return ;
  }
await  firestore().collection('Upcoming_Trips').where("uid", '==', Auth().currentUser.uid).get().then(querySnapshot => {
querySnapshot.forEach(documentSnapshot => {
  uid = documentSnapshot.get('uid');
  TripTime = documentSnapshot.get('time');

});
});

console.log(uid)

if(uid==Auth().currentUser.uid)
  {
    // Show alert that trip already aranged go to detail screen to view trip
    Alert.alert('Messgae', 'Trip is already arranged against this driver!', [
      {
        text: 'Go to Trip Detail',
        onPress: () => navigation.navigate("TripDetail"),
        style: 'cancel',
      },
      {text: 'ok', onPress: () => {}},
    ]);
  }
  else {
    const result = await firestore()
    .collection('Upcoming_Trips')
    .add({
      uid: Auth().currentUser.uid,
      //locto: selectedcat1,
      StartTimetime: firestore.Timestamp.fromDate(new Date()),
      //mail: user.email,
      totalseats: totalseats,
      fromlocation: fromLocation,
      tolocation: toLocation,
      time: tripStartingTime,
      bookedSeatsNumber:[{seat:1,StudentBooked:"student_id"},{seat:2,StudentBooked:"student_id"}]
    })
    .then(() => {
      Alert.alert('Messgae', 'successfully updated your data', [

        {text: 'New Trip', onPress: () => {}},
        {
          text: 'Trip detail',
          onPress: () => navigation.navigate("TripDetail"),
          style: 'cancel',
        },
      ]);
    })
    .catch(e => {
      Alert.alert('Alert Title', 'Error Message' + e, [
        {
          text: 'Try again',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    });
  }

};
