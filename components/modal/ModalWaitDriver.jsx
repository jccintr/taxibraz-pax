import { StyleSheet, Text,Modal,View,ActivityIndicator} from 'react-native';
import React from 'react'
import { cores } from '../../cores';
import Botao from '../reusable/Botao';
import HeightSpacer from '../reusable/HeightSpacer';


const ModalWaitDriver = ({visible,setVisible}) => {
  return (
    <Modal visible={visible} animationType="none" statusBarTranslucent={true} transparent={true} onRequestClose={()=>setVisible(false)}>
    <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <Text style={styles.title}>Aguardando Motorista</Text>
            <HeightSpacer h={30}/>
            <ActivityIndicator size={'large'} color={cores.purple}/>
            <HeightSpacer h={30}/>
            <Botao backgroundColor={cores.purple} text={'CANCELAR'} borderRadius={10} width={'100%'} textColor={'#fff'} onPress={()=>setVisible(false)}/>
        </View>
    </View>
 </Modal>
  )
}

export default ModalWaitDriver

const styles = StyleSheet.create({
    modalBackground:{
       flex:1,
       backgroundColor: 'rgba(0,0,0,0.1)',
       justifyContent: 'center',
       alignItems:'center',
    },
    modalContainer:{
        width: '90%',
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:15,
        elevation:20,
    },
    title:{
       fontSize: 18,
       color: cores.purple,
       fontWeight:'bold',
       width: '100%',
       textAlign: 'center',
    },
    mensagem:{
        width: '100%',
        textAlign: 'center',
        fontSize:14,
        
    }
})