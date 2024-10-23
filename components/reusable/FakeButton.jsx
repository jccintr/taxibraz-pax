import { StyleSheet,Text,ActivityIndicator,View } from 'react-native';
import React from 'react';

const FakeButton = ({text,textSize,textColor,width,backgroundColor,borderWidth,borderColor,borderRadius,isLoading}) => {
  return (
    <View style={styles.button(width,backgroundColor,borderWidth,borderColor,borderRadius)}>
        {isLoading&&<ActivityIndicator  size="large" color={textColor}/>}
        <Text style={styles.text(textColor,textSize)}>{text}</Text>
    </View>
  )
}

export default FakeButton

const styles = StyleSheet.create({
    text: (textColor,textSize) => ({
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
        gap:20,
        justifyContent: 'center',
        height: 50,
        flexDirection:'row'
    })
})