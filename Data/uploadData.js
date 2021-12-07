import React from 'react';
import firestore from "@react-native-firebase/firestore";

function uploadData({uid, fromLocation, toLocation, time, seatID}) {
    firestore().collection('students').add({
        userID: uid,
        from: fromLocation,
        to: toLocation,
        timing: time,
        seats: seatID 
    }).then(() => {
        console.log('student added')
    })
    return (
        <div>
            
        </div>
    );
}

export default uploadData;