import { StyleSheet, Text,FlatList,TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
//import Payments from '../data/Payments';
import { cores } from '../cores';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const PaymentList = ({pagamentos,setPagamentoId}) => {
    const [selected,setSelected] = useState('');


    const onSelect = (payment) => {
      setSelected(payment._id);
      setPagamentoId(payment._id);
    }

    const Payment = ({payment,selected}) => {
 
        function getIcon(nome) {
            
          if(nome=='Pix'){
              return 'pix';
            }
          if(nome=='Dinheiro'){
             return 'money-bill-1-wave';
          }
          if(nome=='Débito'){
              return 'credit-card';
          }
        }


        return (
             <TouchableOpacity onPress={()=>onSelect(payment)} style={[styles.container,payment._id===selected?{borderColor:cores.primary,borderWidth:2}:'']}>
                <FontAwesome6 name={getIcon(payment.nome)} size={14} color={payment._id===selected?cores.primary:'black'} />
                <Text style={payment._id===selected?{color:cores.primary,fontWeight:'bold'}:''}>{payment.nome}</Text>
             </TouchableOpacity>
        )
    }



  return (
    <FlatList
     data={pagamentos}
     showsHorizontalScrollIndicator={false}
     horizontal
     contentContainerStyle={{gap:10}}
     keyExtractor={(item)=>item._id}
     renderItem={({item})=><Payment payment={item} selected={selected}/>}
    />
  )
}

export default PaymentList

const styles = StyleSheet.create({
    container:{
         
         borderWidth:1,
         borderColor: '#c1c1c1',
         borderRadius: 10,
         padding: 10,
         flexDirection: 'row',
         gap:5,
         alignItems:'center'
    }
})