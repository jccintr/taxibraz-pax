import { StyleSheet, Text, View,Pressable,Alert} from 'react-native';
import React, {useState,useContext} from 'react';
import api from '../api/api';
import {AuthContext} from '../context/AuthContext';
import { cores } from '../cores';
import Botao from '../components/reusable/Botao';
import HeightSpacer from '../components/reusable/HeightSpacer';
import InputArea from '../components/InputArea';


const SendMessage = () => {
   const [isLoading,setIsLoading] = useState(false);
   const {apiToken} = useContext(AuthContext);
   const [message,setMessage] = useState('');
   const types = [{id:0,description:'Dúvida'},{id:1,description:'Reclamação'},{id:2,description:'Sugestão'}];
   const [idTypeSelected,setIdTypeSelected] = useState(0);
  

  const onEnviar = async () => {
         
          if(message.trim().length===0){
            Alert.alert('Atenção','Escreva a sua mensagem por favor.');
            return;
          }
          setIsLoading(true);
          const response = await api.sendMessage(apiToken,types[idTypeSelected].description,message);
          if(!response.ok){
             Alert.alert('Erro', 'Falha ao enviar mensagem. Tente novamente por favor.');
             setIsLoading(false);
             return;
          }
          setMessage('');
          setIsLoading(false);
          Alert.alert('Aviso', 'A sua mensagem foi enviada com sucesso, em breve entraremos em contato.');
  }

  return (
    <View style={styles.container}>
     
     
      <View style={styles.selectArea}>
          {types.map((type)=><Pressable key={type.id} onPress={()=>setIdTypeSelected(type.id)} style={[styles.textContainer,idTypeSelected===type.id?{borderBottomColor:cores.primary}:'']}>
              <Text style={[styles.typeText,idTypeSelected===type.id?{color:cores.primary}:'']}>{type.description}</Text>
          </Pressable>)}
      </View>

      <HeightSpacer h={40}/>

      <InputArea placeholder={'Escreva aqui a sua mensagem'} value={message} onChangeText={setMessage}  label={'Mensagem:'}/>

      <Botao 
                onPress={()=>onEnviar()} 
                text={'ENVIAR'} 
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

export default SendMessage

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal: 20,
        alignItems:'center',
        justifyContent:'flex-start',
       backgroundColor: '#fff',
       paddingTop:30
      },
      selectArea:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around'
      },
      textContainer:{
        borderBottomWidth:2,
        borderBottomColor: '#a1a1a1',
        padding: 10,
        flexDirection: 'row',
        alignItems:'center'
      },
      typeText:{
        fontWeight:'bold',
        color:'#a2a2a2',
        fontSize:16,
      }
})