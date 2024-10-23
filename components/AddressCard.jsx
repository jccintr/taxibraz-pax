import { StyleSheet, Text, TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { cores } from '../cores';

const AddressCard = ({address,onPress}) => {
  return (
    <TouchableOpacity onPress={()=>onPress(address)} style={styles.container}>
      <FontAwesome name="map-marker" size={30} color={cores.primary} />  
      <Text style={{width:'90%'}}>{address.formatted_address}</Text>
    </TouchableOpacity>
  )
}

export default AddressCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap:5,
        marginTop:10,
        backgroundColor: '#fff',
        padding: 10,
     
    }
})