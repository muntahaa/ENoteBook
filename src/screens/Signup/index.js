import React, { useState, useEffect } from "react";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, TextInput,TouchableOpacity, Button,Image, Text, Pressable} from 'react-native'
import {signup_button} from '../../../res/drawables'
import { BACKGROUND_COLOR, COLOR_BLACK, COLOR_WHITE } from "../../../res/drawables";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import  firebaseapp  from '../../Api/Firebase';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import  app  from '../../Api/Firebase';
//import SignupButton from "../../components/signupButton";


const Signup = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const db = getFirestore(app);
    
    useEffect(() => {
           }, )
    
    const onAlreadyAccountPressed=() =>{
        props.navigation.goBack()
        
    }

    const onSignupPressed= async () => {
        const auth = getAuth();
        if(email.includes('@') && password) {
            try {
                await addDoc(collection(db,email),{

                })
                let res= await createUserWithEmailAndPassword(auth, email, password)
                alert('User created Successfully')
                props.navigation.goBack()
            }
            catch(e) {
            alert(e.message)
            }
        }
        else  {
            alert('Kindly enter valid email and password')
        }
         
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

           { /*<SignupButton style={{alignSelf: 'center'}}
                source= {signup_button}
                //onPress={() => Alert.alert('Simple Button pressed')}
                onPress={() =>onSignupPressed()}
                />*/}
    
            <TouchableOpacity onPress={() => 
                onSignupPressed()
                }>
                <Image style={styles.sign_Btn} source={signup_button}/>

            </TouchableOpacity>
            
            <Text></Text>

                      
            
            
           {/* <Button
                title={'SignUp'}
                onPress={() => onSignupPressed()}
            />*/}

            <Text></Text>
            
            <Pressable style={styles.button} 
            onPress={ () => onAlreadyAccountPressed()}>
            <Text style={styles.text}>{'Already Have an account'}</Text>
            </Pressable>
            {/*<Button
                title={'Already Have an account'}
                onPress={() => onAlreadyAccountPressed()}
            />*/}
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
    sign_Btn: {
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
export default Signup;
