import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, TextInput,TouchableOpacity, Button,Image} from 'react-native'
import {delete_button} from '../../../res/drawables'
import { BACKGROUND_COLOR, COLOR_BLACK, COLOR_WHITE } from "../../../res/drawables";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc,deleteDoc } from "firebase/firestore";
import  app  from '../../Api/Firebase';
import  {AdMobBanner} from 'expo-ads-admob';



const CreateNote = (props) => {

   //let { note,} = props.route.params
    const db = getFirestore(app);
    const auth=getAuth()
    const {email, title: noteTitle ,description: noteDescription } = props.route.params
   // console.log(note)


    const [title, setTitle] = useState(noteTitle)
    const [description, setDescription] = useState(noteDescription)
    

    useEffect(() => {
       // loadData()
    }, [])
    //const loadData = async () => {
       // if (noteTitle) {
         //   let description = await AsyncStorage.getItem(noteTitle)
          //  setTitle(noteTitle)
          //  setDescription(description)
       // }
    //}



    const onAddPressed = async () => {
        
            
        if (title != '' && description != '') {

            try {
                      //addDoc creates random doc id
                //const docRef = await addDoc(collection(db, "Notes"), {
                 //   title: title,
                  //  description: description
                //});
               // console.log("Document written with ID: ", docRef.id);
           
                        //setDoc
                await setDoc(doc(db,email,title), {
                    title: title,
                    description: description
                });
                //console.log("Document written with ID: ", doc.id);


                /*let value = await AsyncStorage.getItem(title)
                if (value && !noteTitle) {
                    alert('title already exist')
                }
                else {
                    await AsyncStorage.setItem(title, description)
                    //setTitle('')
                    //setDescription('')
                    alert('note saved')
                    props.navigation.goBack()
                    //goBack()
                }*/
                alert('note saved')
                props.navigation.goBack()
            }



            catch (e) {
                console.log(e)

            }

        }
        else {
            alert('kindly add title and description')
        }

        
    }

    const onDeletePress = async () => { 
        

        try { 
            const value = await deleteDoc(doc(db, email, noteTitle));
           
            setTitle(value) 
            setDescription(value) 
            alert('Deleted') 
            props.navigation.goBack() 
        } 
            catch (e) { 
                console.log(e) 
            } 
    }

    


    return (

        <View style={styles.container}>
            <View style={{ ...styles.card, height: '8%' }}>

                <TextInput

                    style={{ margin: 8 }}
                    placeholder={'enter title here'}
                    value={title}
                    editable={ noteTitle ? false: true}
                    onChangeText={(t) => setTitle(t)}
                />

            </View>
            <View style={{ ...styles.card, height: '70%' }}>
                <TextInput
                    style={{ margin: 10 }}
                    placeholder={'enter description here'}
                    multiline={true}
                    value={description}
                    onChangeText={(t) => setDescription(t)}
                />

            </View>

            <Button
                title={noteTitle ? 'Update Note' : 'Add Note'}
                onPress={() => onAddPressed()}
            />
            
            <TouchableOpacity onPress={() => 
                onDeletePress()
                }>
                <Image style={styles.dltBtn} source={delete_button}/>

            </TouchableOpacity>
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-3168736240681165/4506207016" 
                servePersonalizedAds 
                />



        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
    card: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 20,
        margin: 10,
        shadowColor: COLOR_BLACK,
        borderWidth: 0.5
    },
    dltBtn: {
        height: 50,
        width: 50, 
        alignSelf: 'center'

    }



})
export default CreateNote
