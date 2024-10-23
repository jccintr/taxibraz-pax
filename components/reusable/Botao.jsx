import { StyleSheet,TouchableOpacity, Text,ActivityIndicator } from 'react-native';
import React from 'react';


const Botao = ({onPress,text,textSize,textColor,width,backgroundColor,borderWidth,borderColor,borderRadius,isLoading}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button(width,backgroundColor,borderWidth,borderColor,borderRadius)}>
        {!isLoading?<Text style={styles.text(textColor,textSize)}>{text}</Text>:<ActivityIndicator  size="large" color={textColor}/>}
    </TouchableOpacity>
      
  )
}

export default Botao

const styles = StyleSheet.create({
    text: (textColor,textSize) => ({
      //  fontFamily: 'medium',
        fontSize: textSize,
        color: textColor,
        fontWeight:'bold',
    }),
    button: (width,backgroundColor,borderWidth,borderColor,borderRadius)=>({
        width: width,
        backgroundColor: backgroundColor,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    })
})