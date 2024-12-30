import React, { useState, useEffect,useRef,useContext } from 'react';
import { StyleSheet, View,SafeAreaView,Image,StatusBar,Pressable,Alert } from 'react-native';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { AuthContext } from '../context/AuthContext';
import { OriginContext } from '../context/OriginContext';
import { DestinationContext } from '../context/DestinationContext';
import { LocationContext } from '../context/LocationContext';
import { RideContext } from '../context/RideContext';
import { GOOGLE_MAPS_API_KEY } from '../constants';
import RideDetaisPanel from '../components/RideDetaisPanel';
import markerCar from '../assets/marker-car-250x300.png';
import startMarker from '../assets/start-marker-250x300.png';
import finishMarker from '../assets/finish-marker-250x300.png';
import { DriverLocationContext } from '../context/DriverLocationContext';
import api from '../api/api';
import util from '../util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { mapSilver } from '../mapStyles';


const RideDetail = ({navigation}) => {
  
  const [time,setTime] = useState(0);
  const [distance,setDistance] = useState(0);
  const [ridePrice,setRidePrice] = useState(0);
  const mapRef = useRef();
  const {apiToken} = useContext(AuthContext);
  const {origin,originText} = useContext(OriginContext);
  const {destination,destinationText} = useContext(DestinationContext);
  const {location} = useContext(LocationContext);
  const {drivers} = useContext(DriverLocationContext);
  const {setActiveRide} = useContext(RideContext);
  const [pagamentoId,setPagamentoId] = useState(null);
  const [pagamentos,setPagamentos] = useState([]);
  const [isLoading,setIsLoading] = useState(false);


  useEffect(() => {
    const getPagamentos = async () => {
       const response = await api.getPagamentos();
       if (response.ok){
         let json = await response.json();
         setPagamentos(json);
       }
    };
    getPagamentos();
  }, []);

  useEffect(() => {
    getRidePrice();
  }, [distance]);

  const getRidePrice = async () => {

    const response = await api.getRidePrice(apiToken,distance);

    if (response.status===200){
      const json = await response.json();
      setRidePrice(json.valor);
    }

  }


  const callDriver = async () => {
    
    setIsLoading(true);
    if(pagamentoId==null){
      Alert.alert('Atenção','Escolha a forma de pagamento por favor.');
      setIsLoading(false);
      return;
    }
   
    const rideData = {
       origem:{
          latitude: origin.latitude,
          longitude: origin.longitude,
          address: originText
       },
       destino:{
        latitude: destination.latitude,
        longitude: destination.longitude,
        address: destinationText
     },
     distancia: distance,
     duracao: time,
     valor: ridePrice,
     pagamentoId: pagamentoId
    }
    
     const response = await api.addRide(apiToken,rideData);

     if(response.status===201){
         const jsonRide = await response.json();
         setIsLoading(false);
         setActiveRide(jsonRide);
         await AsyncStorage.setItem('activeRideId', jsonRide._id);
         navigation.reset({routes:[{name:'ride'}]});
        
     } else {
      alert('falha ao solicitar motorista, tente novamente.')
      setIsLoading(false);
      return;
     }

    
  
   
 }


  


return (
  <SafeAreaView style={styles.container}>
     <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
     <Pressable style={styles.btBack} onPress={()=>navigation.goBack()}>
         <FontAwesome6 name="arrow-left" size={20} color={'black'} />
      </Pressable> 
     <View style={{flex:1}}>
      
     {location&&<MapView 
              customMapStyle={mapSilver}
              ref={mapRef}
              style={StyleSheet.absoluteFillObject}
              showsUserLocation={true}
              showsMyLocationButton={true}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
               // latitudeDelta: 0.04,
              //  longitudeDelta: 0.02,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
              }}
          >

         {origin!==null&&<Marker title='De:' description={originText} coordinate={origin} >
            <Image  source={startMarker} style={{width:33,height:40}}/>
           
         </Marker>}

          {destination!==null&&<Marker  title='Até:' description={destinationText} coordinate={destination}>
             <Image  source={finishMarker} style={{width:33,height:40}}/>
             
          </Marker>}

          {drivers.map((driver)=><Marker key={driver._id} coordinate={{latitude:driver.position.latitude,longitude:driver.position.longitude}}>
                <Image  source={markerCar} style={{width:33,height:40}}/>
          </Marker>
             
          )}

          {origin!==null&&destination!==null&&<MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="black"
            optimizeWaypoints={true}
            onReady={result => {
             setDistance(result.distance);
             setTime(result.duration); 
             //CalculateRidePrice(result.distance);
            
              mapRef.current.fitToCoordinates(result.coordinates,{
                edgePadding:{
                  right:30,
                  bottom:30,
                  left: 30,
                  top:100
                },
                animated: true
              })
            }}
          />}



       </MapView>}  
       {origin&&destination&&<RideDetaisPanel isLoading={isLoading} distancia={util.distancia(distance)} time={util.duracao(time)} pagamentos={pagamentos} setPagamentoId={setPagamentoId} callDriverFunction={callDriver} value={ridePrice.toFixed(2)} originText={originText} destinationText={destinationText} />} 
     </View>
     
  </SafeAreaView>
)
}

export default RideDetail
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btBack:{
    position:'absolute',
    top:10,
    left:10,
    alignItems:'center',
    justifyContent:'center',
    zIndex:1,
    backgroundColor:'#fff',
    padding:5,
    borderRadius:50
  },
 
  
});