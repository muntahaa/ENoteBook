//import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button, FlatList, Image , RefreshControl, ScrollView, ActivityIndicator} from 'react-native'
import {ADD_BUTTON_IMAGE, NOTE_IMAGE} from '../../../res/drawables'
import ImageButton from "../../components/imageButton";
import { collection, getDocs, getFirestore, query, onSnapshot } from "firebase/firestore";

import  {AdMobBanner} from 'expo-ads-admob';
import app from '../../Api/Firebase';
import { keyboardProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
//import { FirebaseApp } from 'firebase/app';



const Main = (props) => {

    

    const [data, setData]=useState([])
    const [selectedNote, setSelectedNote] = useState([])
    const [loading, setLoading]=useState(false)
    const {email} = props.route.params
    const db = getFirestore(app)
    //console.log(email)
    
    const loadData=async()=>{
        
        setLoading(true)
        //const querySnapshot = await getDocs(collection(db, email));
        //querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            //keys.push(doc.data())
         // });
         try{
           
            
         const q = query(collection(db, email))
          onSnapshot(q, (querySnapshot) => {
                let keys=[]
                querySnapshot.forEach((doc) => {
                console.log(doc.data());
                keys.push(doc.data())
                
                })
                setData(keys)
                
         })
         
         }
         catch(e){

         }
         
          
          setLoading(false)

    }
    useEffect(() => {
        loadData()

        //loadAllKeyFromAsyncStorage()
    },[])
    /*const loadAllKeyFromAsyncStorage =async()=>{
        let keys =await AsyncStorage.getAllKeys()
        //if (keys.length!=data.length)
            setData(keys)
        
    }*/


    return (
       
        <View style = { styles.container}>
            { loading ? <ActivityIndicator/> : null}
            <FlatList
                data={data}
                numColumns={4}
                renderItem={({item})=> {
                    return(
                        <TouchableOpacity 
                        onPress={() => {
                            props.navigation.navigate('Create', {title: item.title,description: item.description, email})
                            }
                        }>

                            <View style={{margin: 7}}>
                        
                            <Image
                            style={styles.img}
                            source={NOTE_IMAGE} 
                            />
                            <Text style={styles.text}> {item.title} </Text>
                            </View>
                    
                        </TouchableOpacity>
                    )

                }}
                keyExtractor={(item)=>item}
                />
            
                <ImageButton style={{alignSelf: 'flex-end'}}
                source= {ADD_BUTTON_IMAGE}
                //onPress={() => Alert.alert('Simple Button pressed')}
                onPress={() => props.navigation.navigate ('Create',{title: null,description : null, email})}
                />
                <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-3168736240681165/4506207016" 
                servePersonalizedAds 
                />

                

                   
        </View>
       
    )
}
const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'space-between'
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    text: {
            alignSelf: 'center', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            width: 80
        },
    img: { 
            height: 80, 
            width: 80 
        }
    /*buttonStyle: {
        position: 'absolute',
        right: 15,
        bottom: 20
    }*/
    
})
export default Main