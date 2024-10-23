import { StyleSheet,SafeAreaView,StatusBar,Text,View,TouchableOpacity,ToastAndroid } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import { cores } from '../cores';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HeightSpacer from '../components/reusable/HeightSpacer';
import Botao from '../components/reusable/Botao';
import { RideContext } from '../context/RideContext';

const RideCancelled2 = ({navigation}) => {
    const {setActiveRide} =useContext(RideContext);

    useEffect(()=>{
        setActiveRide(null);
    },[]);


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
        <MaterialIcons name="cancel" size={100} color={cores.primary} />
        <HeightSpacer h={10}/>
        <Text style={{fontSize:20,fontWeight:'bold',color:cores.primary}}>SOLICITAÇÃO CANCELADA!</Text>
        <HeightSpacer h={20}/>
        <Text style={{fontSize:16,color:cores.primary}}>Você cancelou a solicitação de corrida.</Text>
        <View style={{position:'absolute',bottom:10,width:'100%'}}>
          <Botao 
              onPress={()=>navigation.reset({routes:[{name:'homeDrawer'}]})} 
              text={'RETORNAR A TELA PRINCIPAL'} 
              textSize={16} 
              textColor={cores.white} 
              width={'100%'} 
              backgroundColor={cores.primary} 
              borderWidth={0} 
              borderRadius={10} 
              isLoading={false}
          />
    </View>
    </SafeAreaView>
  )
}

export default RideCancelled2

const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingHorizontal: 20,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#fff'
    },
  })