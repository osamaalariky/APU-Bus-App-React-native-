import { firebase } from "@react-native-firebase/firestore";

export function addseat(value, addBooked){

    firebase.firestore().collection('students').add({ 
        from: value,
        createdTime: firebase.firestore.FieldValue.serverTimestamp()
    }).then((snapshot) => snapshot.get())
    .then((data)=> addBooked(data.data()))
    .catch((error) =>console.log(error));
}


export async function getseats(locRetrev){
    var locations = [];
    var snapshot = await firebase.firestore().collection('Students').orderBy('createdTime').get()
    snapshot.forEach((doc)=> {
        locations.push(doc.data())
    });
    locRetrev(locations);
}