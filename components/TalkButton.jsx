import { StyleSheet, Text, View,Linking,TouchableOpacity } from 'react-native'
import React from 'react'
import { cores } from '../cores'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TalkButton = ({telefone}) => {
  const mensagem = 'Olá, solicitei uma corrida no Taxi Braz';


  const onButtonPress = () => {
    Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
  }


  return (
    <TouchableOpacity style={styles.container} onPress={onButtonPress}>
      <FontAwesome name="whatsapp" size={24} color="white" />
      <Text style={styles.text}>CONVERSE COM O MOTORISTA</Text>
    </TouchableOpacity>
  )
}

export default TalkButton

const styles = StyleSheet.create({
    container:{
      backgroundColor: cores.whats,
      marginHorizontal: 'auto',
     // padding: 10,
      flexDirection: 'row',
      gap:20,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
      width:'100%',
      height:50,
    },
    text:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    }
})