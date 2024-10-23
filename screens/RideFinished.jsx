import { StyleSheet,SafeAreaView,StatusBar,Text,View,TouchableOpacity,ToastAndroid } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import img from '../assets/finished-300x150.png'
import AssetImage from '../components/reusable/AssetImage';
import HeightSpacer from '../components/reusable/HeightSpacer';
import Botao from '../components/reusable/Botao';
import { cores } from '../cores';
import { RatingInput } from 'react-native-stock-star-rating';
import { RideContext } from '../context/RideContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Clipboard from 'expo-clipboard';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RideFinished = ({navigation,route}) => {
  const {apiToken} = useContext(AuthContext);
  const {setActiveRide} =useContext(RideContext);
  const [isLoading,setIsLoading] = useState(false);
  const [rating,setRating] = useState(0);
  const {ride} = route.params;

  useEffect(()=>{
    removeRide();
    setActiveRide(null);
},[]);

const removeRide = async () =>{
  await AsyncStorage.removeItem('activeRideId');
}

const copyPix = async () => {
  await Clipboard.setStringAsync(ride.driver.pix.chave);
  //ToastAndroid.show('Chave Pix copiada para a área de transferencia.', ToastAndroid.LONG);
}

const finish = async () => {

  if (rating>0){
      setIsLoading(true);
      const response = await api.rateDriver(apiToken,ride._id,rating);
      setIsLoading(false);
  }
  //navigation.navigate('homeDrawer');
  navigation.reset({routes:[{name:'homeDrawer'}]})
}

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
        <AssetImage radius={0} height={125} width={250} source={img} mode={'contain'}/>
    <HeightSpacer h={10}/>
    <Text style={{fontSize:20,fontWeight:'bold',color:cores.primary}}>CORRIDA FINALIZADA!</Text>
    <HeightSpacer h={30}/>
    <Text style={{fontSize:16,color:cores.primary}}>Você chegou ao seu destino</Text>
    <HeightSpacer h={20}/>
    <Text style={{fontSize:16,color:cores.primary}}>Valor a pagar para o motorista</Text>
    <HeightSpacer h={10}/>
    <View style={{backgroundColor:'#e1e1e1',borderRadius:5,padding:10,paddingHorizontal:15}}>
        <Text style={{fontSize:24,fontWeight:'bold',color:cores.primary}}>R$ {ride.valor.toFixed(2)}</Text>
    </View>
    <HeightSpacer h={20}/>
    <Text style={{fontSize:16,color:cores.primary}}>Chave Pix do motorista</Text>
    <HeightSpacer h={10}/>
    <View style={{backgroundColor:'#e1e1e1',borderRadius:5,padding:10,paddingHorizontal:15,flexDirection:'row',alignItems:'center',gap:10}}>
        <View>
           <Text style={{fontSize:14,fontWeight:'bold',color:cores.primary}}>{ride.driver.pix.chave}</Text>
           <Text style={{fontSize:14,fontWeight:'bold',color:cores.primary}}>Favorecido: {ride.driver.pix.favorecido}</Text>
        </View>
        <TouchableOpacity onPress={()=>copyPix()}>
            <FontAwesome6 name="copy" size={24} color={cores.primary} />
        </TouchableOpacity>
    </View>
    <HeightSpacer h={20}/>
    <Text style={{fontSize:16,color:cores.primary}}>Por favor, avalie esta corrida</Text>
    
    <RatingInput 
        rating={rating} 
        setRating={setRating} 
        size={50}  
        maxStars={5} 
        bordered={false}  
    />
   
    <View style={{position:'absolute',bottom:10,width:'100%'}}>
          <Botao 
              onPress={()=>finish()} 
              text={'RETORNAR A TELA PRINCIPAL'} 
              textSize={16} 
              textColor={cores.white} 
              width={'100%'} 
              backgroundColor={cores.primary} 
              borderWidth={0} 
              borderRadius={10} 
              isLoading={isLoading}
          />
    </View>
    </SafeAreaView>
  )
}

export default RideFinished

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff'
  },
})