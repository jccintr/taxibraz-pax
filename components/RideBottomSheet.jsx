import { StyleSheet, Text, View } from 'react-native'
import React, {useMemo,forwardRef,useContext} from 'react';
import BottomSheet  from '@gorhom/bottom-sheet';
import { cores } from '../cores';
import { RideContext } from '../context/RideContext';
import HeightSpacer from './reusable/HeightSpacer';
import TalkButton from './TalkButton';
import Botao from './reusable/Botao';
import FakeButton from './reusable/FakeButton';
import DriverCard from './cards/DriverCard';



const RideBottomSheet = forwardRef((props,ref) => {
    const {activeRide} = useContext(RideContext);
    const snapPoints = useMemo(() => ['30%'], []);



  return (
    <BottomSheet style={styles.container}  ref={ref} index={0} snapPoints={snapPoints} backgroundStyle={{opacity:.9}} handleIndicatorStyle={{backgroundColor: 'gray'}}>    
        <Text style={{fontSize:18, color: '#000',width:'100%',textAlign:'center'}}>{activeRide.events[activeRide.events.length-1].descricao}</Text>
        <HeightSpacer h={20}/>
        {activeRide.status===0&&<View style={{position:'absolute',bottom:10,width:'100%'}}><Botao 
                onPress={props.cancel} 
                text={'CANCELAR SOLICITAÇÃO'} 
                textSize={16} 
                textColor={cores.white} 
                width={'100%'} 
                backgroundColor={cores.vermelho} 
                borderWidth={0} 
                borderRadius={10} 
                isLoading={props.isLoading}
          /></View>}
        <View style={{position:'absolute',bottom:10,width:'100%'}}>  
        {activeRide.driver&&<DriverCard driver={activeRide.driver} veiculo={activeRide.veiculo} />}
        {activeRide?.driver&&activeRide.status>=1&&activeRide.status<=3&&<View>
                 <HeightSpacer h={20}/>
                 <TalkButton telefone={activeRide?.driver.telefone} />
         </View>}
         {activeRide?.driver&&activeRide.status>=4&&<View>
                 <HeightSpacer h={20}/>
                 <FakeButton 
                    text={'CORRIDA EM ANDAMENTO'} 
                    textSize={16} 
                    textColor={cores.primary} 
                    width={'100%'} 
                    backgroundColor={cores.white} 
                    borderColor={cores.primary}
                    borderWidth={2} 
                    borderRadius={10} 
                    isLoading={true}
                 />
         </View>}
         </View>
    </BottomSheet>
  )
});

export default RideBottomSheet

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        backgroundColor: cores.whiteSmoke,
      }
})