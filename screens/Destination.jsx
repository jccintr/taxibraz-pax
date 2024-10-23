import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react'
import AddressPicker2 from '../components/AddressPicker2';



const Destination = () => {
    
  return (
    <View style={styles.container}>
            <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
            <AddressPicker2/>
        </View>
  )
  
}

export default Destination

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#fff"
       
    },
   
    
})