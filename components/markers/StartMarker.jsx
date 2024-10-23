import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { cores } from '../../cores';

const StartMarker = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>De</Text>
    </View>
  )
}

export default StartMarker

const styles = StyleSheet.create({
    container:{
     
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:2,
      borderColor: cores.startMarker,
      backgroundColor:'#fff',
      padding:2
     
    },
    text:{
       fontWeight:'bold',
       fontSize:12,
    }
})