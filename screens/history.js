import React, { Component } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
import firestore, { firebase } from "@react-native-firebase/firestore";
import Auth from "@react-native-firebase/auth";

import Icon from 'react-native-vector-icons/Ionicons'
import { Title } from 'react-native-paper';
import Panel from '../source/Panel';

let DataStructure=[{"documentId": "No Trip", "fromlocation": "No Trip", "seat": "No Trip", "startingTime": "No Trip", "tolocation": "No Trip", "tripStatus": "No Trip"}]
function history ({navigation}) {
  
 const [UpcomingTrips,setUpcomingTrips] = React.useState([])
  const [TripTime,SetTripTime] = React.useState([])
 const [TripHistory,setTripHistory] = React.useState([])
 const [MissedTrip,setMissedTrips] = React.useState([])
 const [TimeDiff,setTimeDiff] = React.useState()
 const [historyData,setHistoryData] = React.useState([])
 const deleteTrip=async()=>{
  let data=await firestore()
  .collection('Users')
  .doc(Auth().currentUser.uid)
  .collection("TripData")
  .doc('bookedData');
  let documentId=(await data.get()).data().documentId;
  data.delete();

  let refRemoveTrip=firestore().collection('Upcoming_Trips').doc(documentId)
  let bookedseats=(await refRemoveTrip.get()).data().bookedSeatsNumber
  refRemoveTrip.update({
    bookedSeatsNumber:bookedseats.filter(x => x.StudentBooked!=Auth().currentUser.uid)
  }).then(()=>{
    console.log("deleted")
    setUpcomingTrips([])
  })
  
}


  const getUpcomingTrips = async () => {
    let TripData= await firestore()
    .collection('Users')
    .doc(Auth().currentUser.uid)
    .collection("TripData")
    .doc('bookedData')
    if((await TripData.get()).exists){
      setUpcomingTrips([(await TripData.get()).data()])
    }
  }
  React.useEffect(()=>{ 
    getUpcomingTrips()
    getTripTime()
    GetHistoryRecord()
    if(TimeDiff<0)
    {
      // console.log("ok")
      REmoveTripToMissed()
    }
    // console.log(TimeDiff)
  },[])
  React.useEffect(()=>{ 
    if(historyData.length>0)
    {setTripHistory(historyData.filter(item=>item.tripStatus=="finished"))
    setMissedTrips(historyData.filter(item=>item.tripStatus=="missed"))
    }
  },[historyData])


  const REmoveTripToMissed=async()=>{

    let MissedTrip
    let TripData= await firestore()
    .collection('Users')
    .doc(Auth().currentUser.uid)
    .collection("TripData")
    .doc('bookedData')
    if((await TripData.get()).exists){
      MissedTrip = (await TripData.get()).data()
    }
  
   let HistorybookedData=await firestore()
   .collection('Users')
   .doc(Auth().currentUser.uid)
   .collection("TripData")
   .doc('HistorybookedData')

   if((typeof(await HistorybookedData.get()).data().TripNumber)=="undefined")
   {
     console.log("ok")
     let Data={
      TripTime:MissedTrip.startingTime,
      fromlocation: MissedTrip.fromlocation,
      tolocation:MissedTrip.tolocation ,
      tripStatus:"missed"
    }
    
    HistorybookedData        
    .add({TripNumber:[Data]})
        .then(function () {
          alert("You have Missed The Trip")
        })
        .catch(function (error) {
    
        });
   }
   else {
    console.log("ok")
    let Data={
     TripTime:MissedTrip.startingTime,
     fromlocation: MissedTrip.fromlocation,
     tolocation:MissedTrip.tolocation ,
     tripStatus:"missed"
   }
  
   HistorybookedData
   .update({
     TripNumber:firebase.firestore.FieldValue.arrayUnion(Data)
   }).
   then(function () {
    alert("You have Missed The Trip")
  })
  .catch(function (error) {

  });


   }
   setUpcomingTrips([])
   setTimeDiff(0)

   TripData.delete();
  
 }
  
  const GetHistoryRecord=()=>{
  
     firestore()
    .collection('Users')
    .doc(Auth().currentUser.uid)
    .collection("TripData")
    .doc('HistorybookedData').get().then((data)=>{
      setHistoryData(data.data().TripNumber)
    })

   
  }


  
  const getTripTime=()=>{
    var TripTimefirestore;
     firestore()
    .collection('Users')
    .doc(Auth().currentUser.uid)
    .collection("TripData")
    .doc('bookedData').get().then((data)=>{
      if(data.exists)
  {
    TripTimefirestore=data.data().startingTime;
    let arr=formatAMPM(TripTimefirestore)
    setTimeDiff(arr)
   
  }})
  
  }


const ReturnTimeFormat=(value)=>{
let a=value.split(" ")

if(a[1].toLowerCase()=="AM".toLowerCase())
{
  return a[0]
}
else {
  
  var abc=a[0].split(":")
  var hours=parseInt(abc[0])+12
  return hours>9?(hours):("0"+hours)+":"+"00"
}
}

const formatAMPM=(timeRef)=> {
  var TimeTrip = parseInt(ReturnTimeFormat(timeRef))
// console.log(TimeTrip)
  
  var myDate2 = new Date();
  var year=myDate2.getFullYear();
  var month=myDate2.getMonth()+1
  var date=myDate2.getDate();
  var hour=myDate2.getHours()
  var minute=myDate2.getMinutes()
  

  var TripStartTime = new Date(year,month,date,TimeTrip,0);
  var CurrnetTime = new Date(year,month,date,hour,minute);
  if (TripStartTime < CurrnetTime) {
    console.log("Remove trip to History")
}

  

  var timeDifference= TripStartTime-CurrnetTime
    return(timeDifference)  
 }


  return(
      <ScrollView style={styles.container}>
       <View >
     <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Title style={{color: '#6495ed'}} >History</Title>
     </View>
     <Panel title="Upcoming Trips">
     {UpcomingTrips.map((item,index)=>(
     <View key={index+10}>
     <View style={styles.TripDetailCard}>
     <Text style={styles.tripdetailtext}>From Location:</Text>
     <Text style={styles.tripdetailtext}>{item.fromlocation}</Text>
     </View>
     <View style={styles.TripDetailCard}>
     <Text style={styles.tripdetailtext}>To Location:</Text>
     <Text style={styles.tripdetailtext}>{item.tolocation}</Text>
     </View>
     <View style={styles.TripDetailCard}>
     <Text style={styles.tripdetailtext}>Seat Number:</Text>
     <Text style={styles.tripdetailtext}>{item.seat}</Text>
     </View>
     <View style={styles.TripDetailCard}>
     <Text style={styles.tripdetailtext}>Starting Time:</Text>
     <Text style={styles.tripdetailtext}>{item.startingTime}</Text>
     </View>
     {TimeDiff<600000 && UpcomingTrips.length>0 ?
        (<View style={styles.TripDetailCard}>
     

     <TouchableOpacity style={styles.ButtonStyle} onPress={()=>{navigation.navigate("TrackBus")}} ><Text style={styles.ButtonText}>Track Bus</Text></TouchableOpacity>
     </View>)
      :null}
     {
       TimeDiff>60000&&UpcomingTrips.length > 0? (<View style={styles.TripDetailCard}>
          <TouchableOpacity style={styles.ButtonStyle} onPress={()=>deleteTrip()} ><Text style={styles.ButtonText}> Delete Trip</Text></TouchableOpacity>

     </View>):null
     }
     </View>
     ))}
     {UpcomingTrips.length<=0 ?
        (<View style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center',}}>No Upcoming Trip Please Book you trip right now</Text>
     <TouchableOpacity style={styles.ButtonStyle} onPress={()=>navigation.navigate("subscription")}><Text style={styles.ButtonText}>Book Trip</Text></TouchableOpacity>
        
      </View>):null
      }
        </Panel>
        <Panel title="Finished Trips">
      {TripHistory.map((item,index)=>(
        <View key={index}>
        <Title style={{textAlign:'center'}}>Trip {index+1}</Title>
     <View style={styles.TripDetailCard}>
     <Text style={styles.tripdetailtext}>From Location:</Text>
     <Text style={styles.tripdetailtext}>{item.fromlocation}</Text>
     </View>
     <View style={styles.TripDetailCard}>
     <Text style={styles.tripdetailtext}>To Location:</Text>
     <Text style={styles.tripdetailtext}>{item.tolocation}</Text>
     </View>
        </View>
      ))}
      {TripHistory.length<=0 ?
        (<View style={{justifyContent:'center'}}>
        <Text style={{textAlign:'center',}}>You have not take any trip</Text>
     <TouchableOpacity style={styles.ButtonStyle} onPress={()=>navigation.navigate("subscription")}><Text style={styles.ButtonText}>Book Trip</Text></TouchableOpacity>
        
      </View>):null
      }
      

      </Panel>

      <Panel title="Missed Trips">
      {MissedTrip.map((item,index)=>(
        <View key={index}>
        <Title style={{textAlign:'center'}}>Trip {index+1} </Title>
     <View style={styles.TripDetailCard}>
     <Text style={styles.tripdetailtext}>From Location:</Text>
     <Text style={styles.tripdetailtext}>{item.fromlocation}</Text>
     </View>
     <View style={styles.TripDetailCard}>
     <Text style={styles.tripdetailtext}>To Location:</Text>
     <Text style={styles.tripdetailtext}>{item.tolocation}</Text>
     </View>
        </View>
      ))}</Panel>
     
       </View>
      </ScrollView>
    );
  
  };
  export default history;

  const styles = StyleSheet.create({
      container: {
         
        
      },
      TripDetailCard:{flexDirection:'row',justifyContent:'space-between',marginHorizontal:5,marginTop:5},
      tripdetailtext:{fontSize:16},
      ButtonStyle:{height:50,backgroundColor:'#3366FF',padding:10,justifyContent:'center',alignItems:'center',borderRadius:10},
      ButtonText:{color:"#FFFFFF"}
  });