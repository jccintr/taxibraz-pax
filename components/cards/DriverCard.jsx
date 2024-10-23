import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NetworkImage from '../reusable/NetworkImage'
import Stars from '../Stars'
import { cores } from '../../cores'
import { FontAwesome5 } from '@expo/vector-icons';

const DriverCard = ({driver,veiculo}) => {
  return (
    <View style={styles.container}>

        <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
              {driver.avatar==null?'':<NetworkImage source={driver.avatar} width={50} height={50} radius={40}/>}
              <View style={{gap:5}}>
                  <Text style={{fontWeight:'bold'}}>{driver.name}</Text>
                  <Stars stars={driver.rating} showNumber={true}/>
              </View>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
           <FontAwesome5 name="car-side" size={26} color={cores.primary} />
           <Text>{veiculo.modelo + ' ' + veiculo.cor + ' ' + veiculo.placa}</Text>
        </View>
    
    </View>
  )
}

export default DriverCard

const styles = StyleSheet.create({
    container:{
       flexDirection:'row',
       justifyContent: 'space-between',
       alignItems:'center'
    }
})