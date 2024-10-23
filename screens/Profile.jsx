import { StyleSheet,ToastAndroid,SafeAreaView,ScrollView,Text,TouchableOpacity,ActivityIndicator,Alert } from 'react-native';
import React, {useState,useContext,useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import InputField from '../components/InputField';
import Botao from '../components/reusable/Botao';
import { cores } from '../cores';
import FakeInputField from '../components/FakeInputField';
import HeightSpacer from '../components/reusable/HeightSpacer';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import * as ImagePicker from 'expo-image-picker';
import app from './../firebase';
import {getDownloadURL, getStorage,uploadBytesResumable,ref} from 'firebase/storage';
import NetworkImage from '../components/reusable/NetworkImage';

const Profile = () => {
  const [avatarUri, setAvatarUri] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [isUploading,setIsUploading] = useState(false);
  const [percUpload,setPercUpload] = useState(0);
  const {apiToken,loggedUser,setLoggedUser} = useContext(AuthContext)
  const [formData, setFormData] = useState({name:loggedUser?.name,telefone:loggedUser?.telefone,avatar:loggedUser?.avatar});

  useEffect(()=>{
     console.log('alterou avatar url');
     updateAvatar();
  },[formData.avatar]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setFormData({ ...formData, avatar: null })
      setAvatarUri(result.assets[0].uri);
      uploadAvatar(result.assets[0].uri);
      
    }
  };

  const uploadAvatar = async (imageUri) => {
  
    const storage = getStorage(app);
    const fileName = 'passengers/' + loggedUser._id + '.jpg'; //new Date().getTime() + '.jpg';
    const storageRef = ref(storage, fileName);
    const metadata = {contentType: 'image/jpeg',};
    const response = await fetch(imageUri);
    const imageBlob = await response.blob();
    
   
   
     const uploadTask = uploadBytesResumable(storageRef,imageBlob,metadata);

    uploadTask.on('state_changed',
      (snapshot)=> {
        setIsUploading(true);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercUpload(progress.toFixed(0));
        console.log('Upload is ' + progress.toFixed(0) + '% done');
      },
      (error)=> { 
        console.log(error.message);
        ToastAndroid.show('Falha ao enviar imagem. Tente novamente mais tarde.', ToastAndroid.LONG);
      },
      ()=>{
        ToastAndroid.show('Imagem enviada com sucesso.', ToastAndroid.LONG);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setFormData({ ...formData, avatar: downloadUrl })
          console.log(downloadUrl);
        });

       
        setIsUploading(false);
        
      }
    );
    
  }

  const updateAvatar = async () => {

    if(formData.name.trim().length > 0 && formData.telefone.trim().length > 0){
       const response = await api.updatePassenger(apiToken,formData);
       if(response.status===200){
         const jsonUser = await response.json();
         setLoggedUser(jsonUser);
       }
   }

  }


const updateProfile = async () => {

  if(formData.name.trim().length === 0 || formData.telefone.trim().length === 0){
      Alert.alert('Erro',"Por favor, informe o nome e o telefone.");
      return;
  }
  setIsLoading(true);
  const response = await api.updatePassenger(apiToken,formData);

  if (response.status !== 200){
    ToastAndroid.show('Falha ao atualizar perfil.', ToastAndroid.LONG);
    setIsLoading(false);
    return;
  }

  const jsonUser = await response.json();
  setLoggedUser(jsonUser);
  setIsLoading(false);
  ToastAndroid.show('Perfil atualizado com sucesso !', ToastAndroid.LONG);


}


  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}} contentContainerStyle={{alignItems:'center'}}>
          {formData.avatar!==null?<NetworkImage source={formData.avatar} width={100} height={100} radius={50}/>:avatarUri!==null?<NetworkImage source={avatarUri} width={100} height={100} radius={50}/>:<FontAwesome name="user-circle" size={80} color={cores.primary} />}
          
          <HeightSpacer h={10}/>
          <TouchableOpacity onPress={pickImage} style={{borderWidth:1,borderColor:cores.primary,borderRadius:15,padding:5,paddingHorizontal:10,flexDirection:'row',gap:5,alignItems:'center'}}>
              {isUploading?<ActivityIndicator size="small" color={cores.primary}/>:<FontAwesome name="camera" size={16} color={cores.primary} />}
              <Text style={{color:cores.primary}}>{isUploading?'Enviando Avatar '+ percUpload +'%':'Alterar Avatar'}</Text>
          </TouchableOpacity>
          <InputField 
            label={'Nome:'} 
            placeholder={'Informe o seu nome'} 
            value={formData.name} 
            onChangeText={t=>setFormData({ ...formData, name: t })} 
            password={false} 
            keyboard={'default'}
         />
          <InputField 
            label={'Telefone:'} 
            placeholder={'Informe o seu telefone'} 
            value={formData.telefone} 
            onChangeText={t=>setFormData({ ...formData, telefone: t })} 
            password={false} 
            keyboard={'numeric'}
         />
         <FakeInputField value={loggedUser?.email} label={'Email:'}/>
         <FakeInputField value={loggedUser?.doc} label={'CPF:'}/>
         <Botao 
            onPress={()=>updateProfile()} 
            text={'SALVAR ALTERAÇÕES'} 
            textSize={16} 
            textColor={cores.white} 
            width={'100%'} 
            backgroundColor={cores.primary} 
            borderWidth={0} 
            borderRadius={10} 
            isLoading={isLoading}
         />
        </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop: 20,
      paddingHorizontal: 20,
      alignItems:'center',
      justifyContent:'flex-start',
      backgroundColor: '#fff'
    },
    avatar:{
      height:80,
      width:80,
      borderRadius:40,

    }

})