import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, TextInput,TouchableOpacity, Button,Image, Text, Alert, Pressable} from 'react-native'
import { BACKGROUND_COLOR, COLOR_BLACK, COLOR_WHITE } from "../../../res/drawables";
import {signup_button, login_button} from '../../../res/drawables'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import  {AdMobBanner} from 'expo-ads-admob';
//import LoginButton from "../../components/loginButton";
//import SignupButton from "../../components/signupButton";

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    useEffect(() => {
           }, )
    
    const onLoginPressed= async()=>{
    const auth = getAuth();
    

    if(email.includes('@') && password) {    
        try {
            let userCredential= await signInWithEmailAndPassword(auth, email, password)
            //console.log(userCredential)
            alert('signIn')
            props.navigation.navigate('Main', {email: email})
        }
        catch(e) {
            alert(e.message)

        }
    }
    else {
        alert('Enter valid email and password')
    }
    }
   
    const onforgetPasswordPressed= async() =>{
        const auth=getAuth();
        if(email.includes('@')) {
            try {
            let userCredentials= await sendPasswordResetEmail(auth, email)
            alert('check your email to reset password')
            }
            catch(e) {
            alert(e.message)
            }
        }
        else { 
            alert('Enter valid email')
        }
    }

    const onSignupPressed=()=>{
        props.navigation.navigate('Signup')

    }
   

    return (
        <View style={styles.container}>
           
           <Image style={styles.logo}
             source = {require('../../../assets/logo.png')}
            />
           
            <View style={styles.card}>
                <TextInput

                    style={{ margin: 10 }}
                    placeholder={'Enter Email here'}
                    autoCapitalize = 'none'
                    value={email}
                    
                                       
                    onChangeText={(t) => setEmail(t)}
                />
            </View>

            <View style={styles.card}>
                <TextInput

                    style={{ margin: 10 }}
                    placeholder={'Enter Password here'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(t) => setPassword(t)}
                />
            </View>

                       
           <TouchableOpacity onPress={() => 
                onLoginPressed()
                }>
                <Image style={styles.signin_Btn} source={login_button}/>

            </TouchableOpacity>

            {/*<LoginButton style={{alignSelf: 'ccenter'}}
                source= {login_button}
                //onPress={() => Alert.alert('Simple Button pressed')}
                onPress={() =>onLoginPressed()}
            />*/}
            
            <Text></Text>
           { /*<SignupButton style={{alignSelf: 'center'}}
                source= {signup_button}
                //onPress={() => Alert.alert('Simple Button pressed')}
                onPress={() =>onSignupPressed()}
                />*/}

            <TouchableOpacity onPress={() => 
                onSignupPressed()
                }>
                <Image style={styles.signin_Btn} source={signup_button}/>

            </TouchableOpacity>

           {/* <Button
                title={'Login'}
                onPress={() => onLoginPressed()}
            />

            <Text></Text>

            <Button
                title={'Does not have an account'}
                onPress={() => onSignupPressed()}
            />*/}

            <Text></Text>

            {/*<Button
                title={'Forget Password'}
                onPress={() => onforgetPasswordPressed()}
            />*/}
            <Pressable style={styles.button} 
            onPress={ () => onforgetPasswordPressed()}>
            <Text style={styles.text}>{'Forget Password'}</Text>
            </Pressable>
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-3168736240681165/2669017759" 
                servePersonalizedAds 
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR, 
        justifyContent: 'center'
    },
    card: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 20,
        margin: 10,
        shadowColor: COLOR_BLACK,
        borderWidth: 0.5,
        height: '8%'
    },
    signin_Btn: {
        height: 50,
        width: 150, 
        alignSelf: 'center'

    }, 
    logo: {
        height: 150,
        width: 200,
        alignSelf: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        //borderRadius: 4,
        //elevation: 2,
        backgroundColor: '#d3d3d3',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },



})
export default Login
