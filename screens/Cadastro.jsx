import { StyleSheet, Text, View,SafeAreaView,StatusBar, TouchableOpacity,ToastAndroid,ScrollView,Alert } from 'react-native';
import React, {useState} from 'react';
import InputField from '../components/InputField';
import Botao from '../components/reusable/Botao';
import { cores } from '../cores';
import HeightSpacer from '../components/reusable/HeightSpacer';
import api from '../api/api';


const Cadastro = ({navigation}) => {
  //const screenWidth = Dimensions.get('window').width;
  const [formData, setFormData] = useState({name:'',email:'',password:'',password2:'',telefone:'',doc:''});
  const [isLoading,setIsLoading] = useState(false);
  
  const validaCPF = (cpf) => {

    var soma = 0;
    var resto;
    var strCPF = String(cpf).replace(/[^\d]/g, '');
    
    if (strCPF.length !== 11)
       return false;
    
    if (['00000000000','11111111111','22222222222','33333333333','44444444444','55555555555','66666666666','77777777777','88888888888','99999999999',].indexOf(strCPF) !== -1)
      return false;
  
    for (i=1; i<=9; i++)
        soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  
    resto = (soma * 10) % 11;
  
    if ((resto == 10) || (resto == 11)) 
        resto = 0;
  
    if (resto != parseInt(strCPF.substring(9, 10)) )
      return false;
  
    soma = 0;
  
    for (i = 1; i <= 10; i++)
        soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  
    resto = (soma * 10) % 11;
  
    if ((resto == 10) || (resto == 11)) 
        resto = 0;
  
    if (resto != parseInt(strCPF.substring(10, 11) ) )
      return false;
  
    return true;
  }

  const cadastrar = async () => {
      
   
    if(formData.name.trim().length === 0 || formData.telefone.trim().length === 0 || formData.email.trim().length === 0 || formData.password.trim().length === 0 || formData.password2.trim().length === 0 || formData.doc.trim().length === 0){
      Alert.alert('Atenção','Preencha todos os campos por favor.');
      return;
    }

    if(formData.password!==formData.password2) {
      Alert.alert('Atenção','As senhas informadas são diferentes.');
      return;
    }

    if(!validaCPF(formData.doc)){
      Alert.alert('Atenção','O CPF informado é inválido.');
      return;
    }
    setIsLoading(true);
    const response = await api.cadastro(formData);

    if(response.status!==201){
       const json = await response.json();
       setIsLoading(false);
       return;
    }
    setIsLoading(false);
    ToastAndroid.show('Conta criada com sucesso !', ToastAndroid.LONG);
    navigation.reset({routes:[{name:'login'}]});
    return;
  }


  return (
    <SafeAreaView style={styles.container}>
       <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}} contentContainerStyle={{alignItems:'center'}}>
       <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
       <InputField 
            label={'Nome:'} 
            placeholder={'Informe o seu nome'} 
            value={formData.name} 
            onChangeText={t=>setFormData({ ...formData, name: t })} 
            password={false} 
            keyboard={'default'}
         />
       <InputField 
            label={'Email:'} 
            placeholder={'Informe o seu email'} 
            value={formData.email} 
            onChangeText={t=>setFormData({ ...formData, email: t })} 
            password={false} 
            keyboard={'email-address'}
         />
          <InputField 
            label={'Telefone:'} 
            placeholder={'Informe o seu telefone'} 
            value={formData.telefone} 
            onChangeText={t=>setFormData({ ...formData, telefone: t })} 
            password={false} 
            keyboard={'numeric'}
         />
         <InputField 
            label={'Senha:'} 
            placeholder={'Informe a sua senha'} 
            value={formData.password} 
            onChangeText={t=>setFormData({ ...formData, password: t })} 
            password={true} 
            keyboard={'default'}
         />
         <InputField 
            label={'Confirme a Senha:'} 
            placeholder={'Confirme a sua senha'} 
            value={formData.password2} 
            onChangeText={t=>setFormData({ ...formData, password2: t })} 
            password={true} 
            keyboard={'default'}
         />
          <InputField 
            label={'CPF:'} 
            placeholder={'Informe o número do seu cpf'} 
            value={formData.doc} 
            onChangeText={t=>setFormData({ ...formData, doc: t })} 
            password={false} 
            keyboard={'numeric'}
         />
         <Botao 
            onPress={cadastrar} 
            text={'CADASTRAR'} 
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
         </ScrollView>
    </SafeAreaView>
  )
}

export default Cadastro

const styles = StyleSheet.create({

  container:{
    flex:1,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor: '#fff'
  },


})