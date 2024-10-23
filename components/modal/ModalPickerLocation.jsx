import { StyleSheet, Text, View,Modal,Pressable,TouchableOpacity,ActivityIndicator } from 'react-native'
import React,{useContext,useState} from 'react'
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { LocationContext } from '../../context/LocationContext';
import { cores } from '../../cores';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import mapApi from '../../api/mapApi';
import { GOOGLE_MAPS_API_KEY } from '../../constants';
import { OriginContext } from '../../context/OriginContext';
import { DestinationContext } from '../../context/DestinationContext';
import { mapSilver } from '../../mapStyles';


const ModalPickerLocation = ({modalVisible,setModalVisible,fieldSource,addressModal,setAddressModal,addressModalCoords,setAddressModalCoords}) => {
  const {location,setLocation} = useContext(LocationContext);
  const [isLoading,setIsLoading] = useState(false);
  const { setOrigin,setOriginText } = useContext(OriginContext);
  const { setDestination,setDestinationText} = useContext(DestinationContext);


  const onSelectAddress = () => {

    if(fieldSource===1){
      setOriginText(addressModal)
      setOrigin(addressModalCoords);
    } else {
      setDestinationText(addressModal)
      setDestination(addressModalCoords);
    }
    setModalVisible(false);

  }

  return (
    <Modal  visible={modalVisible} animationType="slide" transparent={false} onRequestClose={()=>setModalVisible(false)}>
      {isLoading&&<ActivityIndicator size='large' color={cores.primary} style={styles.loading}/>}
      <View style={styles.container}>
      <TouchableOpacity style={styles.btFechar} onPress={()=>setModalVisible(false)}>
         <Ionicons name="close" size={22} color="black" />
      </TouchableOpacity>  
     
      <Pressable onPress={()=>{}} style={styles.locationArea}>
           <FontAwesome name="map-marker" size={30} color="black" />
           <Text style={{fontSize:14,fontWeight:'bold',width:'90%'}}>{addressModal?addressModal:'Segure e arraste o marcador vermelho até o local desejado.'}</Text>
        </Pressable>
      {addressModal&&<TouchableOpacity style={styles.botao} onPress={()=>onSelectAddress()}><Text style={styles.botaoText}>SELECIONAR ESTE ENDEREÇO</Text></TouchableOpacity>} 
      <MapView 
                //ref={mapRef}
                //customMapStyle={mapSilver}
                style={StyleSheet.absoluteFill}
                showsUserLocation={false}
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
                }}
            >

               <Marker draggable
                pinColor={'#f00'}
                coordinate={{latitude:location.coords.latitude,longitude:location.coords.longitude}}
                onDragEnd={async (e) => {
                  setIsLoading(true);
                  const lat = e.nativeEvent.coordinate.latitude;
                  const lng = e.nativeEvent.coordinate.longitude;
                 
                  const res = await mapApi.getAddressFromCoords(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude,GOOGLE_MAPS_API_KEY);
                  const ret = await res.json();
                  setAddressModal(ret.results[0].address_components[1].short_name + ', ' + ret.results[0].address_components[0].short_name +' - ' + ret.results[0].address_components[2].short_name)
                  console.log(ret.results[0].address_components[1].short_name + ', ' + ret.results[0].address_components[0].short_name +' - ' + ret.results[0].address_components[2].short_name)
                  setAddressModalCoords({latitude:lat,longitude:lng});
                  
                  setIsLoading(false);
                }}
              />

            </MapView>

      </View>

    </Modal>
     )
}

export default ModalPickerLocation

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent:'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 20,
    
},
btFechar:{
    position:'absolute',
    top:10,
    right:10,
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
  bottom: 80,
  left: '5%',
  gap:10,
  zIndex:1,
  borderRadius: 15,
  opacity: .8,
  borderWidth:1,
},
loading:{
   position:'absolute',
    top:10,
    left:10,
    zIndex:1
},
botao: {
  backgroundColor: cores.primary,
  borderRadius: 10,
  borderWidth: 0,
  alignItems: 'center',
  height: 50,
  justifyContent: 'center',
  marginTop: 16,
  width: '90%',
  zIndex:1,
  position:'absolute',
  bottom: 20,
  left:'5%',
 
},
botaoText:{
  color: 'white',
  fontWeight:'bold'
}
})