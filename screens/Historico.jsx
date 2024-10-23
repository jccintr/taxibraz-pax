import { StyleSheet, Text, View,FlatList,ActivityIndicator } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import api from '../api/api';
import {AuthContext} from '../context/AuthContext';
import { cores } from '../cores';
import RideCard from '../components/cards/RideCard';
import EmptyList from '../components/reusable/EmptyList';



const Historico = ({navigation}) => {
  const [isLoading,setIsLoading] = useState(false);
  const {apiToken} = useContext(AuthContext);
  const [rides,setRides] = useState([]);

useEffect(()=>{
  const getRides = async () => {
    setIsLoading(true);            
    let response = await api.getMyRides(apiToken);
    
    if(response.ok){
      let jsonRides = await response.json();
      setRides(jsonRides)
    }
  
    setIsLoading(false);
}
getRides();
},[])

  return (
    <View style={styles.container}>
       {isLoading&&<View style={styles.loading}><ActivityIndicator size="large" color={cores.primary}/></View>}
       {!isLoading&&<FlatList 
          showsVerticalScrollIndicator={false}
          data={rides}
          keyExtractor={(item)=> item._id}
          renderItem={({item})=><RideCard ride={item}/>}
          ListEmptyComponent={<EmptyList mensagem={'Você ainda não realizou corrida alguma.'}/>}
          contentContainerStyle={rides.length===0?{flexGrow:1,alignItems:'center',justifyContent:'center'}:''}
         />}
    </View>
  )
}

export default Historico

const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop:10,
      paddingHorizontal:10,
     
    },
    loading:{
      width:'100%',
      position: 'absolute',
      top: '50%',
    }

})