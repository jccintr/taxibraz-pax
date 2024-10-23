import { StyleSheet, Text, View,StatusBar,TouchableOpacity,ToastAndroid,Alert} from 'react-native'
import React,{useState,useContext} from 'react';
import { cores } from '../cores';
import api from '../api/api';
import Botao from '../components/reusable/Botao';
import HeightSpacer from '../components/reusable/HeightSpacer';
import InputField from '../components/InputField';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const VerifyEmail =  ({navigation}) => {
    const {apiToken,setLoggedUser,setApiToken} = useContext(AuthContext);
    const [isLoading,setIsLoading] = useState(false);
    const [code,setCode] = useState('');


    const onRequestVerificationEmail = async () => {
       const response = await api.requestVerificationEmail(apiToken);
       if(response.ok){
        ToastAndroid.show('Código de verificação enviado com sucesso.', ToastAndroid.LONG);
       }
    }

    const logout = async  () => {
      await AsyncStorage.removeItem('token');
      setApiToken(null);
      setLoggedUser(null);
      navigation.reset({routes:[{name:'login'}]})
  }


    const onVerifyEmail = async () => {

      if(code.trim().length === 0 ){
        Alert.alert('Erro',"Informe o código de verificação por favor.");
        return;
      }
      setIsLoading(true );
      const response = await api.verifyEmail(apiToken,code);
     
      if(!response.ok){
        Alert.alert('Erro','Código de verificação inválido.');
        setIsLoading(false);
        return;
      }

      const jsonUser = await response.json();
      setLoggedUser(jsonUser)
      ToastAndroid.show('E-mail verificado com sucesso.', ToastAndroid.LONG);
      setIsLoading(false);
      navigation.reset({routes:[{name:'homeDrawer'}]}); 

    }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
      <MaterialCommunityIcons name="email-check-outline" size={60} color={cores.primary} />
      <Text style={styles.title}>Verifique o seu e-mail</Text>
      <HeightSpacer h={40}/>
      <Text style={styles.text}>Para utilizar este aplicativo você precisa antes confirmar o seu e-mail.</Text>
      <HeightSpacer h={10}/>
      <Text style={styles.text}>Insira o código que foi enviado para o seu e-mail no campo abaixo.</Text>
      <HeightSpacer h={40}/>
      <InputField
                label={'Código de Verificação:'} 
                placeholder={'Informe o código de verificação'} 
                valule={code} 
                onChangeText={t=>setCode(t)} 
                password={false} 
                keyboard={'numeric'}
            />
     
      <Botao 
              onPress={onVerifyEmail} 
              text={'VERIFICAR EMAIL'} 
              textSize={16} 
              textColor={cores.white} 
              width={'100%'} 
              backgroundColor={cores.primary} 
              borderWidth={0} 
              borderRadius={10} 
              isLoading={isLoading}
          />
           <HeightSpacer h={20}/>
        <TouchableOpacity onPress={onRequestVerificationEmail}>
                  <Text style={{color:cores.primary,fontWeight:'bold'}}>Solicitar outro código de verificação</Text>
        </TouchableOpacity>
        <HeightSpacer h={20}/>
        <TouchableOpacity onPress={logout}>
                  <Text style={{color:cores.primary,fontWeight:'bold'}}>Utilizar outra conta</Text>
        </TouchableOpacity>
    </View>
  )
}

export default VerifyEmail

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