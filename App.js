import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation';
//import 'react-native-gesture-handler';
//import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

export default function App() {
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    fontWeight: 'bold',
    fontSize: '18'

  },
  textinpt:{
    borderWidth: 1,
    width: '90%',
    height: '40'

  }
});
