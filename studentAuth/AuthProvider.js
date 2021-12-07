import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestoe from '@react-native-firebase/firestore';
import {Alert} from 'react-native'

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
          
            console.log(e);
            alert(e)
           
          }
        },
        register: async (email, password, userType) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(user => {
                if (user.additionalUserInfo.isNewUser) {
                  let userdata = {
                    name: user.user.displayName,
                    DisplayPhoto: user.user.photoURL,
                    email: user.user.email,
                    userType,
                    uid: user.user.uid,
                  };
                  firestoe()
                    .collection('Users')
                    .doc(user.user.uid)
                    .set(userdata)
                    .then(response => {
                      Alert.alert('Create user', 'you have registerd successfully', [
                        
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ]);
                    })
                    .catch((error)=> {
                      Alert.alert('Error', 'Error Message' + e, [
                        {
                          text: 'Try again',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ]);
                    });
                }
              });
          } catch (e) {
            console.log(e);
            alert(e, 'or make sure of your password')
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
            alert('You have signed out, See you soon')
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
