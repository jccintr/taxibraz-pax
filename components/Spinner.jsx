import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'
import { cores } from '../cores'

const Spinner = ({message}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator  size="large" color={cores.primary}/>
      <Text style={{color:cores.primary,fontWeight:'bold'}}>{message}</Text>
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:'50%',
        borderRadius:15,
        borderWidth:1,
        borderColor:cores.primary,
        padding:20,
    }
})