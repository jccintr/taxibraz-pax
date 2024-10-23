import { StyleSheet, Text, StatusBar,View,Alert,TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import Botao from '../components/reusable/Botao';
import InputField from '../components/InputField';
import HeightSpacer from '../components/reusable/HeightSpacer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { cores } from '../cores';
import api from '../api/api';


const RecoveryPassword = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const onRecoveryPassword = async () => {

    if(email.trim().length === 0 ){
        Alert.alert('Erro',"Informe o seu e-mail por favor.");
        return;
    }
      setIsLoading(true);
      let response = await api.requestPasswordEmail(email);
      setIsLoading(false);
      navigation.navigate('resetPassword');
     
    
     
 }
 

  return (
    <View style={styles.container}>
       <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
       <MaterialIcons name="lock-outline" size={60} color={cores.primary} />
       <Text style={styles.title}>Recuperação de Senha</Text>
       <HeightSpacer h={40}/>
       <Text style={styles.text}>Para recuperar a sua senha, informe o e-mail que está associado a sua conta.</Text>
       <HeightSpacer h={40}/>
       <InputField
                label={'E-mail:'} 
                placeholder={'Informe o seu e-mail'} 
                valule={email} 
                onChangeText={t=>setEmail(t)} 
                password={false} 
                keyboard={'email-address'}
            />
         <Botao 
              onPress={onRecoveryPassword} 
              text={'RECUPERAR SENHA'} 
              textSize={16} 
              textColor={cores.white} 
              width={'100%'} 
              backgroundColor={cores.primary} 
              borderWidth={0} 
              borderRadius={10} 
              isLoading={isLoading}
          />
           <HeightSpacer h={10}/>
           <TouchableOpacity onPress={()=>navigation.navigate('login')} >
              <Text>Já tem uma conta ? <Text style={{color:cores.primary,fontWeight:'bold'}}>Entre !</Text></Text>
           </TouchableOpacity>
           <HeightSpacer h={10}/>
            <TouchableOpacity onPress={()=>navigation.navigate('cadastro')} >
                  <Text>Não tem uma conta ? <Text style={{color:cores.primary,fontWeight:'bold'}}>Cadastre-se !</Text></Text>
            </TouchableOpacity>
      
    </View>
  )
}

export default RecoveryPassword

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal: 20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#fff'
    },
    title:{
      fontSize:20,
      fontWeight: 'bold',
      color: cores.primary
    },
    text:{
      color:cores.primary,
      width:'100%',
      textAlign:'center'
    }
})