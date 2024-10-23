import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';
import { cores } from '../cores';


const FakeInputField = ({label,value}) => {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputArea}>
            <Text style={styles.text}>{value}</Text>              
        </View>
   </View>
  )
}

export default FakeInputField

const styles = StyleSheet.create({
  
    label:{
       fontWeight:'bold',
       marginLeft:5,
       marginBottom:5,
       color: cores.primary,
    },
    inputArea: {
        backgroundColor: '#f1f4f9',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 8,
        marginBottom: 15,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center',
    },
     text: {
      width: '100%',
      fontSize: 14,
      paddingHorizontal: 4,
      color: 'gray',
    
     
    },
   
  });