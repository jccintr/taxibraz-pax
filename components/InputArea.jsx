import React from 'react'
import { StyleSheet, KeyboardAvoidingView,TextInput,Text,View} from 'react-native';
import { cores } from '../cores';


const InputArea = ({placeholder,value,onChangeText,label}) => {
 
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
    <KeyboardAvoidingView style={styles.inputArea} behavior='height'>
            <TextInput style={styles.input}
                multiline
                numberOfLines={6}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={'#a1a1a1'}
            />
    </KeyboardAvoidingView>
    </View>
  )
}

export default InputArea

const styles = StyleSheet.create({
    inputArea: {
        backgroundColor: '#f1f4f9',
        width: '100%',
        height: 220,
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
      color: cores.azulEscuro,
      height: 200,
      textAlignVertical: 'top',
      justifyContent: 'flex-start',
     
    },
    label:{
        fontWeight:'bold',
        marginLeft:5,
        marginBottom:5,
        color: cores.primary,
       
     },
})