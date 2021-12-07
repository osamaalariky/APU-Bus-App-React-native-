import React, { useContext, useState } from 'react';
import {
    Button,
    Platform,
    SafeAreaView,
    ScrollView,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    TextInput,
    View,
    Image
  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../studentAuth/AuthProvider';
import { RadioButton } from 'react-native-paper';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
    const [values, seValues] = React.useState({
        email: '',
        password: '',
        passwordtwo: '',
        check_inpute: false,
        secureTextEntry: true,
        secureTextEntrytwo: true
    });
const [userType,setUserType] = useState('Student');

    const textChange = (dat) => {
        if(dat.length != 0) {
            seValues({
                ...values,
                email: dat,
                check_inpute: true
            });
        } else {
            seValues({
                ...values,
                email: dat,
                check_inpute: false
            });
        }
    }
    const passChange = (dat) => {
        seValues({
            ...values,
            password: dat,

        });
    } 
    const passtwoChange = (dat) => {
      seValues({
          ...values,
          passwordtwo: dat,

      });
  } 
    const editpasswordtwo = () => {
        seValues({
            ...values,
            secureTextEntrytwo: !values.secureTextEntrytwo
        });
    }
    const editpassword = () => {
      seValues({
          ...values,
          secureTextEntry: !values.secureTextEntry
      });
  }
    return(
      <View style={styles.main}>
       <View style = {styles.top}>
           <Image style={styles.Imagestyle} source = {require('../assets/apu.png')}/>
           <Text style={styles.messeageOnTop}>
              APU Shuttle Bus
           </Text>
       </View>
       
       <View style= {styles.bottom}>
           <Text style ={styles.messageOnBottom}>
              Create your account:
           </Text>
           <View style = {styles.act}>
                <Icon
                name="md-person-outline"
                size={30}
                color = "#fafad2"
                />
                <TextInput
                style={styles.userInput}
                value={email}
                placeholder="Enter Your email"
                onChangeText={userEmail => setEmail(userEmail)}
                //onChangeText = {(dat) => textChange(dat)}
                />
                {values.check_inpute ? 
                <Icon
                name="ios-radio-button-on"
                color= "green"
                size = {30}
                />
                : null}
           </View>

           <View style = {styles.act}>
                <Icon
                name="ios-lock-closed-outline"
                size={30}
                color = "#fafad2"
                />
                <TextInput
                style={styles.userInput}
                value={password}
                placeholder="Enter Your Password"
                secureTextEntry={values.secureTextEntry ? true : false}
                onChangeText={userPassword => setPassword(userPassword)}
                //onChangeText = {(dat) => passChange(dat)}
                /> 
                <TouchableOpacity onPress={editpassword}>
                {values.secureTextEntry ?
                <Icon
                name="ios-eye-off-outline"
                color= "black"
                size = {30}
                />
                :
                <Icon
                name="ios-eye-outline"
                color= "black"
                size = {30}
                />
                }
                </TouchableOpacity>

           </View>

           
           <View style = {styles.act}>
                <Icon
                name="ios-lock-closed-outline"
                size={30}
                color = "#fafad2"
                />
                <TextInput
                style={styles.userInput}
                placeholder="Confirm Your Password"
                secureTextEntry={values.secureTextEntrytwo ? true : false}
                onChangeText = {(dat) => passtwoChange(dat)}
                /> 
                <TouchableOpacity onPress={editpasswordtwo}>
                {values.secureTextEntry ?
                <Icon
                name="ios-eye-off-outline"
                color= "black"
                size = {30}
                />
                :
                <Icon
                name="ios-eye-outline"
                color= "black"
                size = {30}
                />
                }
                </TouchableOpacity>
           </View>

           
           <View style={styles.UserTypeSection}>
                <RadioButton
                  value="Student"
                  status={ userType === 'Student' ? 'checked' : 'unchecked' }
                  onPress={() => setUserType('Student')}
                  color="#FFF"
                  uncheckedColor="#000"
                />
                <Text>Student</Text>
                <RadioButton
                  value="Driver"
                  status={ userType === 'Driver' ? 'checked' : 'unchecked' }
                  onPress={() => setUserType('Driver')}
                  color="#FFF"
                  uncheckedColor="#000"
                />
                <Text>Driver</Text>
                <RadioButton
                  value="Admin"
                  status={ userType === 'Admin' ? 'checked' : 'unchecked' }
                  onPress={() => setUserType('Admin')}
                  color="#FFF"
                  uncheckedColor="#000"
                />
                <Text>Admin</Text>

                </View>
           <TouchableOpacity  onPress={() => register(email , password,userType)} style={styles.press}>
              <Text style={styles.presstext}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('Login')} style={styles.pressre}>
              <Text style={styles.presstextre}>Log in</Text>
          </TouchableOpacity>
          

       </View>
      </View>
    );
  };
  export default Register;

  const styles = StyleSheet.create({
      main: {
          flex: 2,
          backgroundColor: '#b0c4de'
      },
      top: {
            flex: 1,
            paddingBottom: 49,
            justifyContent: 'center',
            paddingHorizontal: 19,
            alignItems: 'center'
      },
      bottom: {
        backgroundColor:'#4682b4',  
        flex: 2,
        paddingVertical: 29,
        borderTopLeftRadius:29,
        paddingHorizontal:19,
        borderTopRightRadius:29

      },
      messeageOnTop:{
        fontSize: 29,
        color: "black",
        fontStyle: 'normal',
        fontWeight: 'bold'
      },
      messageOnBottom:{
        fontSize: 20,
        color: '#fafad2',
        fontWeight: 'bold'
      },
      act: {
          flexDirection : 'row', 
          paddingBottom : 1,
          marginTop: 9,
          borderBottomColor: '#808080',
          borderBottomWidth: 2
      },
      userInput: {
        color: '#053b5a',
        flex: 1,
        marginTop: Platform.OS === 'android' ? 0 : -11,
        paddingLeft: 9
      },
      press: {
          marginTop:20,
          alignItems: 'center',
          justifyContent:'center',
          elevation: 8,
          backgroundColor: "#778899",
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 30,
          width: '100%',
          height: 49,
      },
      presstext:{
        fontSize: 18,
        color: "#fafad2",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      pressre: {
        marginTop:49,
        alignItems: 'center',
        justifyContent:'center',
        elevation: 8,
        backgroundColor: "#b0c4de",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 30,
        width: '100%',
        height: 49,
        borderWidth: 1,
        marginTop: 14,
        borderColor: '#778899'
    },
    presstextre:{
      fontSize: 18,
      color: "#778899",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
      login:{
          borderRadius: 9,
          width: '100%',
          height: 49,
          alignItems: 'center',
          justifyContent:'center'
      },
      messagelog: {
          fontSize: 18,
          fontWeight: 'bold'
      },
      Imagestyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        resizeMode: "stretch"
      },
      UserTypeSection:
      {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:10
      }
  });