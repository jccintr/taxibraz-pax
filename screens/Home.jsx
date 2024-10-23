import React, {useEffect,useRef,useContext } from 'react';
import { StyleSheet, Text, View,SafeAreaView,Image,StatusBar,Pressable,TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { OriginContext } from '../context/OriginContext';
import { DestinationContext } from '../context/DestinationContext';
import { LocationContext } from '../context/LocationContext';
import { RideContext } from '../context/RideContext';
import { FontAwesome } from '@expo/vector-icons';
import { DriverLocationContext } from '../context/DriverLocationContext';
import api from '../api/api';
import carroTop from '../assets/carro-top-100x100.png';
import Entypo from '@expo/vector-icons/Entypo';
import { mapSilver } from '../mapStyles';



const Home = ({navigation}) => {
  
  const mapRef = useRef();
  const {setOrigin,setOriginText} = useContext(OriginContext);
  const {setDestination,setDestinationText} = useContext(DestinationContext);
  const {location,setLocation} = useContext(LocationContext);
  const {drivers,setDrivers} = useContext(DriverLocationContext);
  const {activeRide} = useContext(RideContext);

  
  useEffect(() => {

    if(activeRide){

      navigation.reset({routes:[{name:'ride'}]});
   
    }
 }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização foi negada.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
     })();
  }, []);


  useEffect(()=>{

    const interval = setInterval(()=>{
      getDrivers();
    },10000);
    return ()=>clearInterval(interval);

  });

  const getDrivers = async () => {

      const response = await api.getDrivers();
      if (response.status===200){
        const jsonDrivers = await response.json();
        setDrivers(jsonDrivers);
      }
  }

  const onDetalhesPress = () => {

    setOrigin(null);
    setDestination(null);
    setOriginText('');
    setDestinationText('');
    navigation.navigate('destination')

  }

  

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
       <Pressable style={styles.btDrawer} onPress={()=>navigation.toggleDrawer()}>
          <Entypo name="menu" size={24} color="black" />
       </Pressable> 
       
        <Pressable onPress={()=>onDetalhesPress()} style={styles.locationArea}>
           <FontAwesome name="map-marker" size={30} color="black" />
           <Text style={{fontSize:16,fontWeight:'bold',width:'90%'}}>Para onde vamos ?</Text>
        </Pressable>

       <View style={{flex:1}}>
       {location&&<MapView 
                //customMapStyle={mapSilver}
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                showsUserLocation={true}
                showsMyLocationButton={true}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
                }}
            >

           

            {drivers.map((driver)=><Marker key={driver._id} coordinate={{latitude:driver.position.latitude,longitude:driver.position.longitude}}>
               <Image  source={carroTop} style={{width:40,height:40}}/>
            </Marker>
               
            )}

         </MapView>}   
       </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    btDrawer:{
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
   
  locationArea:{
    flexDirection: 'row',
    alignItems:'center',
    paddingLeft: 10,
    width: '90%',
    minHeight: 50,
    paddingVertical:5,
    backgroundColor: '#fafafa',
    position: 'absolute',
    bottom: 40,
    left: '5%',
    gap:10,
    zIndex:1,
    borderRadius: 15,
    opacity: .8,
    borderWidth:1,
  },
 
    
  });