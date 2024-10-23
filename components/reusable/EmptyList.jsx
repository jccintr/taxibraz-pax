import { Text } from 'react-native';
import { cores } from '../../cores';

const EmptyList = ({mensagem}) => {
    return <Text style={{color: cores.primary, fontWeight:'600'}}>{mensagem}</Text>
}

export default EmptyList
