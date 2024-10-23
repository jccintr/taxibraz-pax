import React from 'react'
import { StyleSheet,View,Text } from 'react-native';
import { cores } from '../cores';
import { FontAwesome } from '@expo/vector-icons';

const Stars = ({stars,showNumber}) => {
    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(stars);
    let left = stars - floor;

    for(var i=0;i<floor;i++) {
        s[i] = 2;
    }
    if(left > 0) {
        s[i] = 1;
    }

  return (
    <View style={styles.starArea}>
        {stars==0&&<View style={styles.novo}>
            <Text style={styles.novoText}>Novo</Text>
        </View>}
        {stars>0&&s.map((i, k)=>(
            <View key={k}>
                {i === 0 && <FontAwesome name="star-o" size={16} color={cores.stars} />}
                {i === 1 && <FontAwesome name="star-half-o" size={16} color={cores.stars} />}
                {i === 2 && <FontAwesome name="star" size={16} color={cores.stars} />}
            </View>
        ))}
        {showNumber&&<Text style={styles.starText}>{stars.toString().length === 1 ? stars+'.0':stars}</Text>}
        
   </View>
  )
}

export default Stars


const styles = StyleSheet.create({
    
    
    starArea:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    starText:{
        marginLeft: 5,
        fontSize: 14,
        marginRight: 5,
    },
    novo:{
        borderWidth:1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        borderColor: cores.stars,
    },
    novoText:{
        color: cores.stars,
        paddingHorizontal: 5,
        fontSize: 12,
    }

   
   
    
  });