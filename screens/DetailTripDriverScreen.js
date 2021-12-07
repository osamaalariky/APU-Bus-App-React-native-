import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Auth from '@react-native-firebase/auth'
import {Avatar, Switch, Title, TouchableRipple, Caption, Paragraph, Drawer } from 'react-native-paper'
import { AuthContext } from '../studentAuth/AuthProvider';
import Icon from 'react-native-vector-icons/Ionicons'
export default function DetailScreen({ uid, navigation }) {
    const [TripData, setTripData] = React.useState([]);
    const { user, logout } = useContext(AuthContext)



    const addRandomUser = async (UserUId, fromLocation, toLocation, tripStartingTime) => {
        //let locto = this.setState({ selectedcat1: value});
        // const {user} = React.useContext(AuthContext);
        let uid = '';
        let TripTime = '';


        await firestore().collection('Upcoming_Trips').where("uid", '==', UserUId).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                uid = documentSnapshot.get('uid');
                TripTime = documentSnapshot.get('time');

            });
        });



        if (uid == UserUId) {
            // Show alert that trip already aranged go to detail screen to view trip
            Alert.alert('Messgae', 'Trip is already arranged against this driver!', [
                {
                    text: 'Go to Trip Detail',
                    onPress: () => { },
                    style: 'cancel',
                },
                { text: 'ok', onPress: () => { } },
            ]);
        }
        else {
            const result = await firestore()
                .collection('Upcoming_Trips')
                .add({
                    uid: UserUId,
                    //locto: selectedcat1,
                    StartTimetime: firestore.Timestamp.fromDate(new Date()),
                    //mail: user.email,
                    totalseats: 20,
                    fromlocation: fromLocation,
                    tolocation: toLocation,
                    time: tripStartingTime,
                    bookedSeatsNumber: []
                })
                .then(() => {
                    Alert.alert('Messgae', 'successfully updated your data', [

                        { text: 'New Trip', onPress: () => { } },
                        {
                            text: 'Trip detail',
                            onPress: () => { },
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
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                });
        }

    };

    const GetTripData = async () => {



        let array = [];
        let data = await firestore().collection('Upcoming_Trips').where("uid", '==', Auth().currentUser.uid).get().then(querySnapshot => {
            console.log()

            querySnapshot.forEach(documentSnapshot => {
                let Data = {
                    DocId: documentSnapshot.id,
                    fromLocation: documentSnapshot.get('fromlocation'),
                    toLocation: documentSnapshot.get('tolocation'),
                    totalseatsBooked: documentSnapshot.get('bookedSeatsNumber').length,
                    time: documentSnapshot.get('time'),
                }
                console.log(Data)
                
                array.push(Data)
                setTripData(array)
               
            });
        }).catch((e) => {
            console.log(e)
            alert("great, you have just started your trip")
            
        })
    }
    React.useEffect(() => {



        GetTripData()


    }, [])
    // if (TripData.length <= 0) {
    //     return (
    //         <View style={[styles.main, { alignItems: 'center' }]}>
    //             <ActivityIndicator size="small" color="#ffffff" />
    //         </View>
    //     )
    // }
    return (
        <View style={styles.main}>
            <Title style={styles.titlestyle}>Detail of Bus seats and Driver</Title>
            
              <Image style={styles.locat}  source = {require('../assets/icons/driver1.png')}/>

              <View>
                  <Caption style={styles.subtitle}>Joined: {user.metadata.creationTime}</Caption>
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
              </Drawer.Section>
              <Drawer.Section>
            {TripData != "undifined" ? TripData.map((item, index) => (
                <View style={styles.act} key={index + 1}>
                    <Text style={styles.titleScreen}>From Location : {item.fromLocation} </Text>
                    <Text style={styles.titleScreen}>To Location : {item.toLocation} </Text>
                    <Text style={styles.titleScreen}>Bookedseats : {item.totalseatsBooked} </Text>
                    <Text style={styles.titleScreen}>Schedules of Driver : {item.time} </Text>
                </View>

            )) : null}
            </Drawer.Section>
            <View style={{ marginVertical: 20, paddingBottom: 22 }}>
                <Button
                    onPress={() => GetTripData()}
                    title="Refresh"
                />

            <Button
                onPress={() => logout()}
                title="Logout"
            />
            <Button onPress={() => navigation.navigate('mapp')}
                title="start your trip">

            </Button>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 2,
        backgroundColor: 'snow',
        borderTopColor: '#B0B0B000',
        borderBottomColor: '#B0B0B000',

        alignItems: 'center'
    },
    titleScreen: { color: 'black', marginVertical: 10, fontSize: 18, fontStyle: 'italic',

    fontStyle: 'normal',
    fontWeight: 'bold',
flexDirection: 'row', },
titlestyle: {color: 'black', fontStyle:'italic'},
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
    marginTop: 14,
    height: 122,
    width: 122
    
}
})