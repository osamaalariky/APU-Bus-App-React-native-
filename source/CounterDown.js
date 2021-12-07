import React from 'react';
import { StyleSheet, Text, View, ImageBackground,TouchableOpacity } from 'react-native';
import moment from "moment"
import firestore, {firebase} from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import { Value } from 'react-native-reanimated';

export default class CounterDownTimer extends React.Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    
    console.log()
    this.state={
      eventDate:moment.duration().add({days:0,hours:0,minutes:0,seconds:0}), // add 9 full days
      days:0,
      hours:0,
      mins:0,
      secs:0,
      timeArray:[],
      TripTime:""
    }
    
  }

   getTripTime=()=>{
    var TripTimefirestore;
     firestore()
    .collection('Users')
    .doc(Auth().currentUser.uid)
    .collection("TripData")
    .doc('bookedData').get().then((data)=>{
      if(data.exists)
  {
    TripTimefirestore=data.data().startingTime;
    let arr=this.formatAMPM(TripTimefirestore)
    console.log(arr)
    this.setState({eventDate:moment.duration().add({days:arr[0],hours:arr[1],minutes:arr[2],seconds:0}),})
    this.updateTimer()
    return TripTimefirestore;
  }})
  
  }
   dhm=(t)=>{
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? 0 + n : n; };
        // console.log(d)  
  if( m >= 60 ){
    h++;
    m = 0;
  }
  if( h >= 24 ){
    d++;
    h = 0;
  }
  return [d, pad(h), pad(m)];
}

ReturnTimeFormat=(value)=>{
let a=value.split(" ")

if(a[1].toLowerCase()=="AM".toLowerCase())
{
  return a[0]
}
else {
  console.log(a[0]+"ok")
  var abc=a[0].split(":")
  var hours=parseInt(abc[0])+12
  return hours+":"+"00"
}
}

formatAMPM=(timeRef)=> {

  var TimeTrip = this.ReturnTimeFormat(timeRef)

  
  var myDate2 = new Date();
  var year=myDate2.getFullYear();
  var month=myDate2.getMonth()+1
  var date=myDate2.getDate();
  var hour=myDate2.getHours()
  var minute=myDate2.getMinutes()
  console.log(this.state.TripTime)
  let timeString=""+year+"-"+(month<10?"0"+month:month)+"-"+(date<10?"0"+date:date)+"T"+TimeTrip+":00"
  let CureentTimeString=""+year+"-"+(month<10?"0"+month:month)+"-"+(date<10?"0"+date:date)+"T"+(hour<10?"0"+hour:hour)+":"+(minute<10?"0"+minute:minute)+":"+"00"+"";

  var CurrentTime = new Date(CureentTimeString);
  var myDate = new Date(timeString);
  

  var TripstartTime = myDate.getTime()
  var currentTimeInMiliSeconde = CurrentTime.getTime()
  console.log(myDate,CurrentTime,myDate2,Date())
    var countdowndate=this.dhm(TripstartTime-currentTimeInMiliSeconde)
    return countdowndate
 }

  deleteTrip=async()=>{
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
    this.props.navigation.replace("subscriptionScreen")
  })
  
}

  componentDidMount(){
   
   
    if(this.state.timeArray.length<=0)
    {
      this.getTripTime() 
    }
    else {
      this.updateTimer()   
    }
  }
  updateTimer=()=>{
    
    const x = setInterval(()=>{
      let { eventDate} = this.state

      if(eventDate <=0){
        clearInterval(x)
      }else {
        eventDate = eventDate.subtract(1,"s")
        const days = eventDate.days()
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()
        
        this.setState({
          days,
          hours,
          mins,
          secs,
          eventDate
        })
      }
    },1000)

  }

  componentWillUnmount() {
    this._isMounted = false;
  
  } 
  render(){
    const { days, hours, mins, secs } = this.state
    return (
      <View  style={styles.countdownStyle}>
        <Text style={{fontWeight:"bold",fontSize:20,color:"#ffffff",textAlign:'center'}}>TRIP START SOON</Text>
        <Text style={{fontWeight:"bold",fontSize:50,marginBottom:50,color:'#ffffff',textAlign:'center'}}>{`${days} : ${hours} : ${mins} : ${secs}`}</Text>
        

    <TouchableOpacity
      
      style={styles.ArrangeTripButton}
      onPress={() =>this.props.navigation.navigate('history')}>
      <Text style={styles.ButtonText}>History</Text>
    </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  
  countdownStyle:{
    flex:1,
    justifyContent:'center',
    backgroundColor: '#25282c',
    borderTopColor: '#B0B0B000',
    borderBottomColor: '#B0B0B000',
  },
  ButtonText: {color: '#ffffff'},
  titleContainer: {margin: 30, justifyContent: 'center', alignItems: 'center'},
  ArrangeTripButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#3366FF',
    marginTop: 20,
  },
});