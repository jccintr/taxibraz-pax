import { StyleSheet,View,SafeAreaView,StatusBar,Image } from 'react-native';
import React, { useRef } from 'react';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '../constants';
import startMarker from '../assets/start-marker-250x300.png';
import finishMarker from '../assets/finish-marker-250x300.png';
import { mapSilver } from '../mapStyles';

const RideHistoryMap = ({route}) => {
    const mapRef = useRef();
    const {origem,destino} = route.params; 
   
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor={'#fff'} barStyle="dark-content"/>
        <View style={{flex:1}}>
        <MapView 
                customMapStyle={mapSilver}
                ref={mapRef}
                style={StyleSheet.absoluteFill}
                showsUserLocation={false}
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                latitude: origem?.latitude,
                longitude: origem?.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.02,
                }}
            >

                {origem!==null&&<Marker title='De:' description={origem.address} coordinate={origem} >
                    <Image  source={startMarker} style={{width:33,height:40}}/>
                </Marker>}

                {destino!==null&&<Marker title='Para:' description={destino.address} coordinate={destino}>
                   <Image  source={finishMarker} style={{width:33,height:40}}/>
                </Marker>}

                {origem!==null&&destino!==null&&<MapViewDirections
                        origin={origem}
                        destination={destino}
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
          />}

            </MapView>

        </View>
    </SafeAreaView>
  )
}

export default RideHistoryMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})