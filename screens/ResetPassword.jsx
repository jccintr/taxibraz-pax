import { StyleSheet, Text, StatusBar,View,ToastAndroid,Alert} from 'react-native';
import React, { useState } from 'react';
import Botao from '../components/reusable/Botao';
import InputField from '../components/InputField';
import HeightSpacer from '../components/reusable/HeightSpacer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { cores } from '../cores';
import api from '../api/api';

const ResetPassword = ({navigation}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [code,setCode] = useState('');
  const [password2,setPassword2] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const onResetPassword = async () => {

    if(code.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || password2.trim().length === 0  ){
      Alert.alert('Erro',"Preencha todos os campos por favor.");
      return;
    }
    if(password !== password2){
      Alert.alert('Erro',"As senhas informadas são diferentes.");
      return;
    }
    setIsLoading(true);
    const response = await api.resetPassword(email,code,password);
    setIsLoading(false);
    if(!response.ok){
     
       Alert.alert('Erro','Email e ou código de verificação inválidos.');
       return;
    }
    ToastAndroid.show('Senha alterada com sucesso', ToastAndroid.LONG);
    navigation.reset({routes:[{name:'login'}]}); 

  }

  return (
    <View style={styles.container}>
       <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
       <MaterialIcons name="lock-outline" size={60} color={cores.primary} />
       <Text style={styles.title}>Redefinição de Senha</Text>
       <HeightSpacer h={40}/>
       <Text style={styles.text}>Para redefinir a sua senha, informe o seu e-mail e o código de verificação que lhe foi enviado.</Text>
       <HeightSpacer h={10}/>
       <InputField
                label={'E-mail:'} 
                placeholder={'Informe o seu e-mail'} 
                valule={email} 
                onChangeText={t=>setEmail(t)} 
                password={false} 
                keyboard={'email-address'}
            />
       <InputField
                label={'Código de Verificação:'} 
                placeholder={'Informe o código de verificação'} 
                valule={code} 
                onChangeText={t=>setCode(t)} 
                password={false} 
                keyboard={'numeric'}
        />
        <InputField 
            label={'Nova Senha:'} 
            placeholder={'Informe a nova senha'} 
            value={password} 
            onChangeText={t=>setPassword(t)} 
            password={true} 
            keyboard={'default'}
         />
         <InputField 
            label={'Confirme a Nova Senha:'} 
            placeholder={'Confirme a nova senha'} 
            value={password2} 
            onChangeText={t=>setPassword2(t)} 
            password={true} 
            keyboard={'default'}
         />
         <Botao 
              onPress={onResetPassword} 
              text={'REDEFINIR SENHA'} 
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

export default ResetPassword

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