import { StyleSheet, Text, View,Linking } from 'react-native'
import React,{useContext} from 'react'
import { DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkImage from '../components/reusable/NetworkImage';

const CustomDrawer = ({ navigation }) => {
    const {loggedUser,setLoggedUser,setApiToken} = useContext(AuthContext);
    const version = '1.0.1';


const logout = async  () => {
    await AsyncStorage.removeItem('token');
    setApiToken(null);
    setLoggedUser(null);
    navigation.reset({routes:[{name:'login'}]})
}

const talk = () => {
  const mensagem = `Olá, sou o ${loggedUser.name}, passageiro do Taxi Braz.`;
  const telefone = '35999122008';
  Linking.openURL(`whatsapp://send?phone=55${telefone}&text=${mensagem}`);
}



  return (
    <View style={{flex:1,paddingTop:20}}>
    <DrawerContentScrollView>
          <View style={styles.header}>
            {loggedUser?.avatar==null?<FontAwesome name="user-circle" size={60} color="gray" />:<NetworkImage source={loggedUser?.avatar} width={80} height={80} radius={40}/>}
            <Text style={{fontWeight:'bold'}}>{loggedUser?.name}</Text>
            <Text>{loggedUser?.email}</Text>
          </View>
          
          <DrawerItem
            icon={()=><FontAwesome name="home" size={24} color="black" />}
            label="Tela Principal"
            onPress={() => navigation.navigate('homeDrawer', { screen: 'home' })}
         />
          <DrawerItem
            icon={()=><MaterialCommunityIcons name="map-marker-distance" size={24} color="black" />}
            label="Histórico de Corridas"
            onPress={() => navigation.navigate('historico')}
         />
          <DrawerItem
            icon={()=><FontAwesome name="user-circle" size={24} color="black" />}
            label="Meu Perfil"
            onPress={() => navigation.navigate('profile')}
         />
          <DrawerItem
            icon={()=><FontAwesome6 name="whatsapp" size={24} color="black" />}
            label="Fale conosco"
            onPress={() => talk()}
         />
        
        <DrawerItem
            icon={()=><MaterialIcons name="logout" size={24} color="black" />}
            label="Sair"
            onPress={() => logout()}
         />
              
    </DrawerContentScrollView>
    <Text style={styles.versionText}>Versão: {version}</Text>
 </View>
  )
}

export default CustomDrawer



const styles = StyleSheet.create({
    container:{
     flex:1,
    },
    header:{
        padding: 10,
        flexDirection:'column',
        alignItems: 'center',
    },
    versionText:{
      marginBottom:10,
      textAlign:'center'
    }
})