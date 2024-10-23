import React from 'react'
import { StyleSheet, View,TextInput,Text,Pressable} from 'react-native';
import { cores } from '../cores';
import { Ionicons } from '@expo/vector-icons';

const AddressInput2 = ({label,placeholder,value,onChange,focus,onMapPress}) => {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
         <View style={styles.inputArea}>
            <TextInput style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={(t)=>onChange(t)}
                placeholderTextColor="#a1a1a1" 
                onFocus= {() => focus()}
            />
            <Pressable onPress={onMapPress} style={styles.mapaContainer}>
                <Text style={{fontSize: 12}}>Mapa</Text>
            </Pressable>
           
         </View>

    </View>
  )
}

export default AddressInput2



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
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
        paddingRight: 5,
    },
     input: {
      flex: 1,
      fontSize: 14,
      paddingHorizontal: 4,
      color: '#000',
      marginLeft: 10,
     // color: cores.azulEscuro,
      height: 48,
    },
    mapaContainer:{
      borderWidth:1,
      borderStyle:'dashed',
      borderRadius:8,
      paddingHorizontal:10,
      paddingVertical:5,
    }
   
  });