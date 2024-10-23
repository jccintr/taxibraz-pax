import { StyleSheet, Text, View,ActivityIndicator,FlatList,TouchableOpacity } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import {GOOGLE_MAPS_API_KEY} from '../constants';
import AddressCard from './AddressCard'
import AddressInput from './AddressInput'
import { OriginContext } from '../context/OriginContext'
import { DestinationContext } from '../context/DestinationContext'
import { LocationContext } from '../context/LocationContext';
import { cores } from '../cores';
import { useNavigation } from '@react-navigation/native';

const AddressPicker = () => {
    const navigation = useNavigation();
   
    const [addressList,setAddressList]=useState([]);
    const [fieldSource,setFieldSource] = useState(null)
    const [isLoading,setIsLoading] = useState(false);
    const { origin,setOrigin,originText,setOriginText } = useContext(OriginContext);
    const { destination,setDestination,destinationText,setDestinationText} = useContext(DestinationContext);
    const {location} = useContext(LocationContext);
   

    useEffect(()=>{
        const delayFunction =  setTimeout(()=>{
            getAddressList()
        },2000)
        return () => clearTimeout(delayFunction)   
    },[originText,destinationText]);


    useEffect(()=>{
        const getAddressFromLocation = async () => {
            setIsLoading(true);
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+location.coords.latitude+','+ location?.coords.longitude + '&key=' + GOOGLE_MAPS_API_KEY;
        
            const res = await fetch(url,{
                headers:{
                    "Content-Type": "application/json",  
            }
            });
           const ret = await res.json();
           setOriginText(ret.results[0].address_components[1].short_name + ',' + ret.results[0].address_components[0].short_name +' - ' + ret.results[0].address_components[2].short_name)
           setOrigin({latitude:ret.results[0].geometry.location.lat,longitude:ret.results[0].geometry.location.lng})
           setIsLoading(false);
          
        }
        getAddressFromLocation();
    },[]);


    const getAddressList = async () => {
        setAddressList([]);
        setIsLoading(true);
        const query=fieldSource===1?originText:destinationText;
        const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + query + '&key=' + GOOGLE_MAPS_API_KEY
        
        const res = await fetch(url,{
            headers:{
                "Content-Type": "application/json",  
        }
        });
       const ret = await res.json();
       setIsLoading(false);
        setAddressList(ret.results)
        
    }

   const onAddressPress = (address) => {
        
        if(fieldSource===1) {  // pesquisou no campo origem
            setOriginText(address.name)
           
            setOrigin({latitude:address.geometry.location.lat,longitude:address.geometry.location.lng})
        } else { // pesquisou no campo destino
            setDestinationText(address.name)
            setDestination({latitude:address.geometry.location.lat,longitude:address.geometry.location.lng})
        }
        setFieldSource(null);
        setAddressList([]);
       
   }

   const onChangeOrigin = (t) => {
        setFieldSource(1);
        setOriginText(t);
   }

   const onChangeDestination = (t) => {
       setFieldSource(2);
       setDestinationText(t);
   }

   const onClearOrigin = () => {
         setOrigin(null);
         setOriginText('');
   }

   const onClearDestination = () => {
      setDestination(null);
      setDestinationText('');
   }

const getAddressFromLocation = async () => {
    setIsLoading(true);
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+location.coords.latitude+','+ location?.coords.longitude + '&key=' + GOOGLE_MAPS_API_KEY;

    const res = await fetch(url,{
        headers:{
            "Content-Type": "application/json",  
    }
    });
   const ret = await res.json();
   setOriginText(ret.results[0].address_components[1].short_name + ' ' + ret.results[0].address_components[0].short_name)
   setOrigin({latitude:ret.results[0].geometry.location.lat,longitude:ret.results[0].geometry.location.lng})
   setIsLoading(false);
   console.log(ret.results[0].address_components[1].short_name + ' ' + ret.results[0].address_components[0].short_name);
}


  return (
    <View style={styles.container}>

        <AddressInput 
          
           label={'De:'} 
           placeholder={'Escolha o ponto de embarque'} 
           value={originText} 
           setValue={setOriginText} 
           onChange={onChangeOrigin} 
           onClearPress={onClearOrigin}
           iconColor={cores.startMarker}
           showLocationIcon={true}
           onLocationPress={getAddressFromLocation}
           />
           
     
        <AddressInput 
           
           label={'Para:'} 
           placeholder={'Escolha o seu destino'} 
           value={destinationText} 
           setValue={setDestinationText} 
           onChange={onChangeDestination} 
           onClearPress={onClearDestination}
           iconColor={cores.finishMarker}
           showLocationIcon={false}
           onLocationPress={()=>{}}
           />

       {destination&&origin&&<TouchableOpacity style={styles.botao} onPress={()=>navigation.navigate('ride')}><Text style={styles.botaoText}>PROSEGUIR</Text></TouchableOpacity>}
       {isLoading&&<ActivityIndicator style={styles.loading} size="large" color={'#000'}/>}
       {!isLoading&&addressList.length>0&&<FlatList
            ListHeaderComponent={<Text style={{fontWeight:'bold'}}>Locais encontrados</Text>}
            data={addressList}
            showsVerticalScrollIndicator={false}
            style={{marginTop:5}}
            keyExtractor={(item)=>item.place_id}
            renderItem={({item})=><AddressCard address={item} onPress={onAddressPress}/>}
           
         />}
    </View>
  )
}

export default AddressPicker

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        alignItems:'center',
        flex:1,
        
        
    },
    loading:{
        position:'absolute',
        top:'50%'
    },
    botao: {
        backgroundColor: 'purple',
        borderRadius: 10,
        borderWidth: 0,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        marginTop: 16,
        width: '100%'
    },
    botaoText:{
        color: 'white',
        fontWeight:'bold'
    }
   
})