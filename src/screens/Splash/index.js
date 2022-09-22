import react from "react";
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native'
import {BACKGROUND_COLOR} from '../../../res/drawables'
//import Main from "../Main";


const Splash = (props) => {

    setTimeout(()=> {
        props.navigation.replace('Login')
}, 3000)


return(

    <View style = {styles.container}>
        <Image style={styles.logo}
        source = {require('../../../assets/logo.png')}
        />
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR
        
    },
    logo: {
        height: 150,
        width: 200
    }
})
export default Splash