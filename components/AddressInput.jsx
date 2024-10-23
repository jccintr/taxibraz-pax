import { StyleSheet, Text, View,TextInput, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const AddressInput = ({label,placeholder,value,setValue,onChange,onClearPress,iconColor,showLocationIcon,onLocationPress}) => {
  return (
    <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
        <FontAwesome name="map-marker" size={24} color={iconColor} />
        <TextInput style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={(t)=>onChange(t)}
          placeholderTextColor="#a1a1a1" 
          
        />
        <View style={{flexDirection:  'row',rowGap:5}}>
          {showLocationIcon&&<Pressable onPress={()=>onLocationPress()}><MaterialIcons name="my-location" size={22} color="black" /></Pressable>}
          {value.length>0&&<Pressable onPress={()=>onClearPress()}>
             <Ionicons name="close" size={22} color="black" />
           </Pressable>}
        </View>
        
    </View>
    </View>
  )
}

export default AddressInput

const styles = StyleSheet.create({
    inputContainer:{
         width:'100%',
         flexDirection: 'row',
         alignItems:'center',
         justifyContent:'space-between',
         borderBottomColor: '#000',
        borderBottomWidth:1,
        marginBottom:20,
        
    },
    label:{
        fontSize: 16,
        fontWeight:'bold'
    },
    input:{
        flex:1,
        marginLeft: 5,
        fontSize: 14,
        height: 40,
        
    }
})