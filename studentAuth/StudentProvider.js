import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

 
export const StudentCont = createContext();

export const StudentProvider = (props) => {
    const [values, seValues] = useState(null);
    return(
<StudentCont.Provider 
value={{
    values,
    seValues,
    login: async (Email, passcode) => {
        try {
           await auth().signInWithEmailAndPassword(Email, passcode)
        }catch(p){
            console.log(p);
        }
    }, SignUp: async (Email, passcode) => {
        try {
           await auth().createUserWithEmailAndPassword(Email, passcode)
        }catch(p){
            console.log(p);
        }
    }, signout: async () => {
        try {
           await auth().signOut()
        }catch(p){
            console.log(p);
        }
    },
}}>
    {props}
</StudentCont.Provider>
    );
}