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
  LogBox,
} from 'react-native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../studentAuth/AuthProvider';
import {Picker} from '@react-native-picker/picker';
import Auth from '@react-native-firebase/auth';
import {Title} from 'react-native-paper';
import CounterDownTimer from '../source/CounterDown';
import {RadioButton} from 'react-native-paper';
// let difference = arr1.filter(x => !arr2.includes(x));
LogBox.ignoreAllLogs();
const NameOfCity = [
  {
    City: 'Please Select Location',
    id: '01102',
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

export default function studentadmin({navigation, route}) {
  const [fromLocation, setFromLocation] = React.useState('APU');
  const [toLocation, setToLocation] = React.useState();
  const [studentlist, setstudentList] = React.useState([]);
  const [documentId, setDocumentId] = React.useState('');
  const [ToLocationCity, setToLocationCity] = React.useState(NameOfCity);
  const [FromLocationCity, setFromLocationCity] = React.useState(NameOfCity);
  const [tripStartingTime, setTripStartingTime] = React.useState('9:00 AM');
  const [seatNumber, setSeatNumber] = React.useState();
  const [selectedStudentIndex, setSelectedStudentIndex] = React.useState();
  const {user, logout} = useContext(AuthContext);
  React.useEffect(() => {
    let arrayCity = NameOfCity;

    setToLocationCity(arrayCity.filter(city => !(city.City == fromLocation)));
  }, [fromLocation]);

  React.useEffect(() => {
    let arrayCity = NameOfCity;

    setFromLocationCity(arrayCity.filter(city => !(city.City == toLocation)));
  }, [toLocation]);
  React.useEffect(async () => {
    getstudentList();
    let student = [];
  }, []);

  const getstudentList = async () => {
    let student = [];

    await firestore()
      .collection('Users')
      .where('userType', '==', 'Student')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          student.push({
            id: documentSnapshot.id,
            studentId: documentSnapshot.get('email'),
          });
        });
      });
    setstudentList(student);
  };

  const deleteDocWithId = async id => {
    await firestore()
      .collection('Users')
      .doc(id)
      .delete()
      .then(() => {
        getstudentList();
      });
  };

  const booking = () => {
    Alert.alert(
      'Delete student',
      'Are you sure you want to delete this student',

      [
        {text: 'No', onPress: () => console.log('Cancel Pressed')},
        {
          text: 'Yes',
          onPress: () => {
            if (selectedStudentIndex != null) {
              const id = studentlist[selectedStudentIndex]['id'];
              deleteDocWithId(id);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const addRandomUser = async (
    fromLocation,
    toLocation,
    tripStartingTime,
    UserUId,
  ) => {
    //let locto = this.setState({ selectedcat1: value});
    // const {user} = React.useContext(AuthContext);
    let TripTime = '';
    let uid = '';

    await firestore()
      .collection('Users')
      .where('uid', '==', UserUId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          TripTime = documentSnapshot.get('time');
          uid = documentSnapshot.get('uid');
        });
      });

    if (uid == UserUId) {
      // Show alert that trip already aranged go to detail screen to view trip
      Alert.alert('Messgae', 'Trip is already arranged against this student!', [
        {
          text: 'Go to Trip Detail',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'ok', onPress: () => {}},
      ]);
    } else {
      const result = await firestore()
        .collection('Users')
        .then(() => {
          Alert.alert('Messgae', 'successfully updated your data', [
            {text: 'New Trip', onPress: () => {}},
            {
              text: 'Trip detail',
              onPress: () => {},
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

  return (
    <View style={styles.main}>
      <View style={{padding: 10}}>
        <View style={styles.titleContainer}>
          <Title style={styles.titlestyle}>Students</Title>
        </View>

        <Text
          style={[
            styles.cardtext,
            {
              color: '#0087F0',
              marginLeft: 10,
            },
          ]}>
          Select student Id
        </Text>

        <View style={styles.act}>
          <Picker
            itemStyle={styles.press}
            mode="dropdown"
            style={styles.userInput}
            selectedValue={seatNumber}
            onValueChange={(selectedStudent, index) => {
              setSelectedStudentIndex(index);
            }}>
            {studentlist.map((item, index) => (
              <Picker.Item
                color="#0087F0"
                key={index}
                label={item.studentId}
                value={item.studentId}
                index={index}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.ArrangeTripButton}
          onPress={navigation.navigate('admin')}>
          <Text style={styles.ButtonText}>Check student trips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ArrangeTripButton}
          onPress={booking.bind(this)}>
          <Text style={styles.ButtonText}>Delete student account</Text>
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
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#3366FF',
    marginTop: 30,
  },
  ButtonText: {color: '#ffffff'},
  titleContainer: {margin: 30, justifyContent: 'center', alignItems: 'center'},
  titlestyle: {color: '#6495ed'},
  UserTypeSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
});
