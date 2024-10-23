import React, { useState, useEffect,useRef,useContext,useCallback } from 'react';
import { StyleSheet, Text, View,Image,StatusBar,ToastAndroid } from 'react-native';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { AuthContext } from '../context/AuthContext';
import { LocationContext } from '../context/LocationContext';
import { RideContext } from '../context/RideContext';
import { GOOGLE_MAPS_API_KEY } from '../constants';
import { FontAwesome } from '@expo/vector-icons';
import carroTop from '../assets/carro-top-100x100.png';
import { DriverLocationContext } from '../context/DriverLocationContext';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { cores } from '../cores';
import api from '../api/api';
import util from '../util';
import RideBottomSheet from '../components/RideBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mapSilver } from '../mapStyles';
//import FinishMarker from '../components/markers/FinishMarker';
//import StartMarker from '../components/markers/StartMarker';



const Ride = ({navigation}) => {
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingCancel,setIsLoadingCancel] = useState(false);
  const {apiToken} = useContext(AuthContext);
  const {activeRide,setActiveRide} =useContext(RideContext);
  const {location} = useContext(LocationContext);
  const {drivers,setDrivers} = useContext(DriverLocationContext);
  const mapRef = useRef();
  const rideBottomSheetRef = useRef();

  useEffect(()=>{
    if(drivers.length==0){
    const interval = setInterval(()=>{
      getDrivers();
    },10000);
    return ()=>clearInterval(interval);
    }
  });

  const getDrivers = async () => {

    const response = await api.getDrivers();
    if (response.status===200){
      const jsonDrivers = await response.json();
      setDrivers(jsonDrivers);
    }
}
 
 
  const cancelRide = async () => {
   setIsLoading(true);
    const response = await api.cancelRide(apiToken,activeRide._id);
  
    if(response.ok){
    
         await AsyncStorage.removeItem('activeRideId');
      
         navigation.reset({routes:[{name:'rideCancelledByPassenger'}]});
         
    } else {
      ToastAndroid.show('Não foi possível cancelar esta corrida.', ToastAndroid.LONG);
    }
     setIsLoading(false);
  }
  

  useEffect(() => {
    initiateSocketConnection()
  }, []);

  

  useEffect(() => {
    
    if(activeRide.status === 4){ // corrida iniciada
    
    }
    if(activeRide.status === 5){ // 5-corrina finalizada
     
      const ride = activeRide;
     
      navigation.reset({routes:[{name:'rideFinished',params:{ride}}]});
    }
    
    if(activeRide.status === -2){ // -2-corrida cancelada pelo motorista
     
      navigation.reset({routes:[{name:'rideCancelled'}]});
     
    }
  }, [activeRide]);

  const initiateSocketConnection = () => {
    
   const ws = new WebSocket(`wss://taxibraz.onrender.com/${apiToken}`)
    //const ws = new WebSocket(`ws://192.168.0.105:3000/${apiToken}`)

    
    ws.onmessage = (e) => {
     
      const message = JSON.parse(e.data)
      setActiveRide(message);
      if(message.status>0 && message.status<4){
      //  rideBottomSheetRef.current.snapToIndex(2);
      }
       if(message.status>3){
      //  rideBottomSheetRef.current.snapToIndex(0);
      }
     if(message.status==-2){
     //   navigation.reset({routes:[{name:'rideCancelled'}]});
     }
      
    }
  }




  return (
    <GestureHandlerRootView style={{flex:1}}>
        <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
          {activeRide&&<View style={styles.painelInfo}>
              <View style={{flexDirection:'row',gap:5}}>
                <MaterialCommunityIcons name="map-marker-distance" size={14} color="white" />
                <Text style={styles.infoText}>{util.distancia(activeRide?.distancia)}</Text>
              </View>
              <View style={{flexDirection:'row',gap:5}}>
                <Ionicons name="timer-outline" size={14} color="white" />
                <Text style={styles.infoText}>{util.duracao(activeRide?.duracao)}</Text>
              </View>
               <Text style={styles.infoText}>R$ {activeRide?.valor.toFixed(2)}</Text>
               <Text style={styles.infoText}>{activeRide?.pagamento.nome}</Text>
          </View>}
       
          {location&&<MapView 
              // customMapStyle={mapSilver}
              ref={mapRef}
              style={StyleSheet.absoluteFill}
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

         <Marker title='De:' description={activeRide?.origem.address} coordinate={{latitude:activeRide?.origem.latitude,longitude:activeRide?.origem.longitude}} >
             <MaterialCommunityIcons name="map-marker-radius" size={30} color={cores.startMarker} />
         </Marker>

         <Marker title='Para:' description={activeRide?.origem.address} coordinate={{latitude:activeRide?.destino.latitude,longitude:activeRide?.destino.longitude}}>
             <MaterialCommunityIcons name="map-marker-radius" size={30} color={cores.finishMarker} />
         </Marker>

          {drivers.filter(driver=>driver._id===activeRide.driver?._id).map((driver)=><Marker key={driver._id} coordinate={{latitude:driver.position.latitude,longitude:driver.position.longitude}}>
                 <Image  source={carroTop} style={{width:40,height:40}}/>
          </Marker>
             
          )}

          <MapViewDirections
            origin={{latitude:activeRide?.origem.latitude,longitude:activeRide?.origem.longitude}}
            destination={{latitude:activeRide?.destino.latitude,longitude:activeRide?.destino.longitude}}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="black"
            optimizeWaypoints={true}
            onReady={result => {
                        
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
          />

          </MapView>}
          
          <RideBottomSheet ref={rideBottomSheetRef} isLoading={isLoading} cancel={cancelRide}/>
    </GestureHandlerRootView>
  )
}

export default Ride

const styles = StyleSheet.create({

  painelInfo:{
    position:'absolute',
    top: 10,
    left: 10,
    backgroundColor: cores.primary,
    zIndex:1,
    flexDirection:'row',
    gap:10,
    padding:5,
    borderRadius:5
  },
  infoText:{
    color:'white',
    fontSize: 10,
  },
  container:{
    paddingHorizontal:10,
    backgroundColor: cores.whiteSmoke,
  }

})