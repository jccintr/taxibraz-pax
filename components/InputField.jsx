import React from 'react'
import { StyleSheet, View,TextInput,Text} from 'react-native';
import { cores } from '../cores';





const InputField = ( {label,placeholder, value, onChangeText, password,keyboard} ) => {

  return (
    <View>
        <Text style={styles.label}>{label}</Text>
         <View style={styles.inputArea}>
              <TextInput style={styles.input}
                  placeholder={placeholder}
                  value={value}
                  onChangeText={onChangeText}
                  secureTextEntry={password}
                  keyboardType={keyboard}
                  placeholderTextColor={'#a1a1a1'}
              />
         </View>
    </View>
  )
}

export default InputField


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
   
  });