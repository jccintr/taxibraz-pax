import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'

import { cores } from '../cores';
import PaymentList from './PaymentList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Botao from './reusable/Botao';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const RideDetaisPanel = ({originText,destinationText,value,distancia,time,callDriverFunction,pagamentos,setPagamentoId,isLoading}) => {


  return (
    <View style={styles.container}>
    
      <View style={{flexDirection:'row',gap:5, alignItems:'center'}}>
        
         
         <Text>{originText}</Text>
      </View>
      
      <View style={{width:'100%',alignItems:'center'}}>
        <FontAwesome6 name="arrow-down" size={18} color={cores.primary} />
      </View>
     
      <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
          
          <Text>{destinationText}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#e1e1e1',borderRadius:5,padding:5,paddingHorizontal:10}}>
           <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
             <MaterialCommunityIcons name="map-marker-distance" size={18} color={cores.primary} />
             <Text style={{color:cores.primary,fontWeight:'bold',fontSize:16}}>{distancia}</Text>
           </View>
           <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
             <Ionicons name="timer-outline" size={18} color={cores.primary} />
             <Text style={{color:cores.primary,fontWeight:'bold',fontSize:16}}>{time}</Text>
           </View>
           <Text style={{color:cores.primary,fontWeight:'bold',fontSize:16}}>R$ {value}</Text>
      </View>
      <Text style={{fontWeight:'bold'}}>Forma de Pagamento</Text>
      <PaymentList pagamentos={pagamentos} setPagamentoId={setPagamentoId}/>
      <Botao 
                onPress={()=>callDriverFunction()} 
                text={'SOLICITAR MOTORISTA'} 
                textSize={16} 
                textColor={cores.white} 
                width={'100%'} 
                backgroundColor={cores.primary} 
                borderWidth={0} 
                borderRadius={10} 
                isLoading={isLoading}
            />
     
    </View>
  )
}

export default RideDetaisPanel

const styles = StyleSheet.create({
    container:{
        width: '100%',
        minHeight: 50,
        padding:10,
        backgroundColor: '#fafafa',
       position: 'absolute',
        bottom: 0,
        gap:10,
        zIndex:1,
        opacity: .8,
        borderTopWidth:1,
    
    },
   
})