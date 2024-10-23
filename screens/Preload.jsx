import { StyleSheet,StatusBar,SafeAreaView,ActivityIndicator,Alert } from 'react-native';
import React,{useContext,useState,useEffect} from 'react'
import logo from '../assets/logo-brazdriver-480x230.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { RideContext } from '../context/RideContext';
import api from '../api/api';
import { cores } from '../cores';
import AssetImage from '../components/reusable/AssetImage';
import HeightSpacer from '../components/reusable/HeightSpacer';


const Preload = ({navigation}) => {
  const {setLoggedUser,setApiToken} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(false);
  const {setActiveRide} = useContext(RideContext)

  useEffect(()=>{
    const checkToken = async () => {
        setIsLoading(true);
        
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          navigation.reset({routes:[{name:'login'}]});
          return;
        }
        
        try {

          let response = await api.validateToken(token);
          if(response.status !== 200){
            navigation.reset({routes:[{name:'login'}]});
            return;
          }
  
          setApiToken(token);
          let jsonUser = await response.json(); 
          setLoggedUser(jsonUser);

           //verifica se tem corrida ativa
          const activeRideId = await AsyncStorage.getItem('activeRideId');
          //console.log('activeRideId =>',activeRideId);

          if(activeRideId){
            const response2 = await api.restoreRide(token,activeRideId);
            //console.log('response2 status =>',response2.status);
            if (response2.ok){
               const jsonRide = await response2.json();
               //console.log('activeRide =>',jsonRide);
               setActiveRide(jsonRide);
               navigation.reset({routes:[{name:'homeDrawer'}]});
               return;
            } else {
               setActiveRide(null);
               await AsyncStorage.removeItem('activeRideId');
            }
          }

         
          if(!jsonUser.emailVerifiedAt){
            navigation.reset({routes:[{name:'verifyEmail'}]});
            return;
          }
          
          navigation.reset({routes:[{name:'homeDrawer'}]});
          
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          Alert.alert('Erro','Falha ao acessar base de dados. Por favor, tente novamente mais tarde.');
        }
       
        
    }
    checkToken();
}, []);




  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
        <AssetImage radius={0} height={100} width={209} source={logo} mode={'contain'}/>
        <HeightSpacer h={20} />
        {isLoading&&<ActivityIndicator size="large" color={cores.primary}/>}
    </SafeAreaView>
  )
}

export default Preload

const styles = StyleSheet.create({
  
  container:{
    flex:1,
    paddingHorizontal: 20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#fff'
  },

  
})