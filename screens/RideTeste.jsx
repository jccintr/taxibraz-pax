import React, { useState, useEffect,useRef,useContext,useMemo } from 'react';
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
import { Octicons,MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { cores } from '../cores';
import api from '../api/api';
import util from '../util';
//import RideBottomSheet from '../components/RideBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet  from '@gorhom/bottom-sheet';
import TalkButton from '../components/TalkButton';
import DriverCard from '../components/cards/DriverCard';
import HeightSpacer from '../components/reusable/HeightSpacer';
import Botao from '../components/reusable/Botao';


const Ride = ({navigation}) => {
  const [isLoading,setIsLoading] = useState(false);
  const {apiToken} = useContext(AuthContext);
  const {activeRide,setActiveRide} =useContext(RideContext);
  const {location} = useContext(LocationContext);
  const {drivers} = useContext(DriverLocationContext);
  const mapRef = useRef();
  const rideBottomSheetRef = useRef();

  const snapPoints = useMemo(() => ['20%','25%','30%'], []);
 

  const cancelRide = async () => {
   setIsLoading(true);
    const response = await api.cancelRide(apiToken,activeRide._id);
  
    if(response.status===200){
      ToastAndroid.show('A sua corrida foi cancelada.', ToastAndroid.LONG);
         navigation.reset({routes:[{name:'homeDrawer'}]});
         setActiveRide(null);
    } else {
      ToastAndroid.show('Não foi possível cancelar esta corrida.', ToastAndroid.LONG);
    }
     setIsLoading(false);
  }
  

  useEffect(() => {
    initiateSocketConnection()
  }, []);

  useEffect(() => {
    if(activeRide.status===0){
      rideBottomSheetRef.current.snapToIndex(0);
    }
    if(activeRide.status>0 && activeRide.status<4){
      rideBottomSheetRef.current.snapToIndex(2);
    }
     if(activeRide.status>3){
      rideBottomSheetRef.current.snapToIndex(0);
    }
    if(activeRide.status === 5){
      const ride = activeRide;
     
      navigation.reset({routes:[{name:'rideFinished',params:{ride}}]});
    }
    if(activeRide.status === -2){
     
      navigation.reset({routes:[{name:'rideCancelled'}]});
     
    }
  }, [activeRide]);

  const initiateSocketConnection = () => {
    
   //const ws = new WebSocket(`wss://taxibraz.onrender.com/${apiToken}`)
    const ws = new WebSocket(`ws://192.168.0.103:3000/${apiToken}`)

    
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
          <View style={styles.painelInfo}>
              <View style={{flexDirection:'row',gap:5}}>
                <MaterialCommunityIcons name="map-marker-distance" size={14} color="white" />
                <Text style={styles.infoText}>{util.distancia(activeRide?.distancia)}</Text>
              </View>
              <View style={{flexDirection:'row',gap:5}}>
                <Ionicons name="timer-outline" size={14} color="white" />
                <Text style={styles.infoText}>{util.duracao(activeRide?.duracao)}</Text>
              </View>
               <Text style={styles.infoText}>R$ {activeRide?.valor.toFixed(2)}</Text>
               <Text style={styles.infoText}>{activeRide?.pagamento}</Text>
          </View>
       
        <MapView 
              ref={mapRef}
              style={StyleSheet.absoluteFill}
              showsUserLocation={true}
              showsMyLocationButton={true}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
              latitudeDelta: 0.04,
                longitudeDelta: 0.02,
              }}
          >

         <Marker coordinate={{latitude:activeRide?.origem.latitude,longitude:activeRide?.origem.longitude}} >
              <Octicons name="dot-fill" size={36} color={cores.startMarker} />
         </Marker>

         <Marker coordinate={{latitude:activeRide?.destino.latitude,longitude:activeRide?.destino.longitude}}>
              <FontAwesome name="map-marker" size={36} color="#cc0000" />
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

          </MapView>
          <BottomSheet style={styles.container}  ref={rideBottomSheetRef} index={0} snapPoints={snapPoints} backgroundStyle={{opacity:.9}} handleIndicatorStyle={{backgroundColor: 'gray'}}>    
              <Text style={{fontSize:18, color: '#000',width:'100%',textAlign:'center'}}>{activeRide.events[activeRide.events.length-1].descricao}</Text>
              <HeightSpacer h={20}/>
              {activeRide.status===0&&<Botao 
                onPress={cancelRide} 
                text={'CANCELAR SOLICITAÇÃO'} 
                textSize={16} 
                textColor={cores.white} 
                width={'100%'} 
                backgroundColor={cores.vermelho} 
                borderWidth={0} 
                borderRadius={10} 
                isLoading={isLoading}
              />}
              {activeRide.driver&&<DriverCard driver={activeRide.driver} veiculo={activeRide.veiculo} />}
              {activeRide.driver&&activeRide.status>0&&activeRide.status<4&&<View>
                 <HeightSpacer h={20}/>
                 <TalkButton telefone={activeRide.driver.telefone} />
              </View>}
             
          </BottomSheet>
    </GestureHandlerRootView>
  )
}

export default Ride

const styles = StyleSheet.create({

  painelInfo:{
    position:'absolute',
    top: 10,
    left: 10,
    backgroundColor: cores.purple,
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