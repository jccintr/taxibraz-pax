import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { cores } from '../../cores';

const FinishMarker = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Até</Text>
        </View>
      )
}

export default FinishMarker

const styles = StyleSheet.create({
    container:{
     
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:2,
      borderColor: cores.finishMarker,
      backgroundColor:'#fff',
      padding:2
     
    },
    text:{
       fontWeight:'bold',
       fontSize:12,
    }
})