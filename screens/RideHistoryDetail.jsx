import { StyleSheet, Text, View,ActivityIndicator,ScrollView, SafeAreaView,TouchableOpacity } from 'react-native';
import React, {useState,useEffect,useContext} from 'react';
import api from '../api/api';
import { cores } from '../cores';
import { AuthContext } from '../context/AuthContext';
import util from '../util';
import HeightSpacer from '../components/reusable/HeightSpacer';
//import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NetworkImage from '../components/reusable/NetworkImage';
import Stars from '../components/Stars';

const RideHistoryDetail = ({navigation,route}) => {
    const {apiToken} = useContext(AuthContext);
    const {rideId} = route.params; 
    const [ride,setRide] = useState(null); 

    useEffect(()=>{
     
        const getRideDetail = async () => {
        
          let response = await api.rideDetails(apiToken,rideId);
          if(response.ok){
            let jsonRide = await response.json();
            setRide(jsonRide)
          }
              
      }
      getRideDetail();
      },[])


  return (
    <SafeAreaView style={{flex:1}}>
    {!ride&&<View style={styles.loading}><ActivityIndicator size="large" color={cores.primary}/></View>}
    {ride&&<ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{padding:10}}>
     
     {ride&&<View>
      <View style={styles.itemContainer}>
           <Text style={styles.itemTitle}>Data</Text>
           <HeightSpacer h={10} />
           <Text style={styles.itemText}>{util.formataData(ride?.data)}</Text>
      </View>
      {ride.status!==-1&&<View style={styles.itemContainer}>
           <Text style={styles.itemTitle}>Motorista</Text>
           <HeightSpacer h={10} />
           <View style={{flexDirection:'row',gap:5,alignItems:'center'}}>
              {ride?.driver.avatar==null?'':<NetworkImage source={ride?.driver.avatar} width={50} height={50} radius={40}/>}
              <View style={{gap:5}}>
                      <Text style={{fontWeight:'bold'}}>{ride?.driver.name}</Text>
                      <Stars stars={ride?.driver.rating} showNumber={true}/>
              </View>
            </View>
      </View>}
      {ride.status!==-1&&<View style={styles.itemContainer}>
           <Text style={styles.itemTitle}>Veículo</Text>
           <HeightSpacer h={10} />
           <Text style={styles.itemText}>{ride?.veiculo.modelo} - {ride?.veiculo.cor} - {ride?.veiculo.placa}</Text>
      </View>}
      <View style={styles.itemContainer}>
           <Text style={styles.itemTitle}>Origem</Text>
           <HeightSpacer h={10} />
           <View style={{flexDirection:'row',gap:5}}>
              <MaterialCommunityIcons name="map-marker-radius" size={18} color={cores.startMarker} />
              <Text style={styles.itemText}>{ride?.origem.address}</Text>
           </View>
           <HeightSpacer h={10} />
           <Text style={styles.itemTitle}>Destino</Text>
           <HeightSpacer h={10} />
           <View style={{flexDirection:'row',gap:5}}>
              <MaterialCommunityIcons name="map-marker-radius" size={18} color={cores.finishMarker} />
              <Text style={styles.itemText}>{ride?.destino.address}</Text>
           </View>
           <HeightSpacer h={20} />
           <TouchableOpacity onPress={()=>navigation.navigate('rideHistoryMap',{origem:ride?.origem,destino:ride?.destino})} style={styles.mapButton}>
              <Text>Ver Mapa</Text>
           </TouchableOpacity>
      </View>
      <View style={[styles.itemContainer,{flexDirection:'row',justifyContent:'space-between'}]}>
           <View>
                <Text style={styles.itemTitle}>Distância</Text>
                <HeightSpacer h={10} />
                <Text style={styles.itemText}>{util.distancia(ride?.distancia)}</Text>
           </View>
           <View>
                <Text style={styles.itemTitle}>Duração</Text>
                <HeightSpacer h={10} />
                <Text style={styles.itemText}>{util.duracao(ride?.duracao)}</Text>
           </View>
           <View>
                <Text style={styles.itemTitle}>Pagamento</Text>
                <HeightSpacer h={10} />
                <Text style={styles.itemText}>{ride.pagamento.nome}</Text>
           </View>
           <View>
                <Text style={styles.itemTitle}>Valor</Text>
                <HeightSpacer h={10} />
                <Text style={styles.itemText}>R$ {ride.valor.toFixed(2)}</Text>
           </View>
      </View>
      {ride.driverRating&&<View style={styles.itemContainer}>
           <Text style={styles.itemTitle}>Sua avaliação desta corrida</Text>
           <HeightSpacer h={10} />
           <Stars stars={ride?.driverRating} showNumber={true}/>
      </View>}
      <View style={styles.itemContainer}>
           <Text style={styles.itemTitle}>Eventos</Text>
           <HeightSpacer h={10} />
           {ride.events.map((item,index)=>(

              <View key={index} style={{flexDirection:'row',gap:5,marginBottom:5}}>
                  <Text style={{fontWeight:'bold'}}>{util.formataHora(item.data)}</Text>
                  <Text >{item.descricao}</Text>
              </View>
              
           ))}
      </View>
      </View>}
    </ScrollView>}
    </SafeAreaView>
  )
}

export default RideHistoryDetail

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
      },
      itemContainer:{
        backgroundColor:"#fff",
        justifyContent: 'space-between',
        alignItems:'flex-start',
        padding:10,
        borderRadius:10,
        marginBottom: 10,
      },
      itemTitle:{
         fontWeight:'bold',
         color:cores.primary
      },
      itemText:{

      },
      mapButton:{
        width:'100%',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:8,
        padding:10,
        alignItems:'center'
      },
      loading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
      }
})