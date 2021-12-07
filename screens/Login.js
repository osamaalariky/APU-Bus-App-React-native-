import React,{ useContext, useState } from 'react';
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
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../studentAuth/AuthProvider';
const Login = ({navigation}) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [values, seValues] = React.useState({
        Email: '',
        passcode: '',
        check_inpute: false,
        secureTextEntry: true
    });

    const textChange = (dat) => {
        if(dat.length != 0) {
            seValues({
                ...values,
                Email: dat,
                check_inpute: true
            });
        } else {
            seValues({
                ...values,
                Email: dat,
                check_inpute: false
            });
        }
    }
    const passChange = (dat) => {
        seValues({
            ...values,
            passcode: dat,

        });
    } 

    const editpasscode = () => {
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
       <Button
        title="log in page"
        
        
      />
           <Text style ={styles.messageOnBottom}>
              Sigin to your account:
           </Text>
           <View style = {styles.act}>
                <Icon
                name="md-person-outline"
                size={30}
                color = "#fafad2"
                />
                <TextInput
                style={styles.userInput}
                placeholder="Enter Your Email"
                value={email}
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
                placeholder="Enter Your Password"
                value={password}
                onChangeText={userPassword => setPassword(userPassword)}
                secureTextEntry={values.secureTextEntry ? true : false}
                //onChangeText = {(dat) => passChange(dat)}
                /> 
                <TouchableOpacity onPress={editpasscode}>
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
           <TouchableOpacity  onPress={() =>  login(email, password)}  style={styles.press}>
              <Text style={styles.presstext}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('Register')} style={styles.pressre}>
              <Text style={styles.presstextre}>Register</Text>
          </TouchableOpacity>
          

       </View>
      </View>
    );
  };
  export default Login;

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
          marginTop:49,
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
      }
  });