import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Preload from '../screens/Preload';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
//import Home from '../screens/Home';
import Destination from '../screens/Destination';
import RideDetail from '../screens/RideDetail';
import DrawerNavigator from './DrawerNavigator';
import Ride from '../screens/Ride';
import RideFinished from '../screens/RideFinished';
import RideCancelled from '../screens/RideCancelled';
import RideCancelled2 from '../screens/RideCancelled2';
import RideHistoryDetail from '../screens/RideHistoryDetail';
import RideHistoryMap from '../screens/RideHistoryMap';
import VerifyEmail from '../screens/VerifyEmail';
import ResetPassword from '../screens/ResetPassword';
import RecoveryPassword from '../screens/RecoveryPassword';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='preload'>
    <Stack.Screen name='preload' component={Preload} options={{headerShown:false}}/>
    <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
    <Stack.Screen name='cadastro' component={Cadastro} options={{headerTitle:'Cadastro'}}/>
    <Stack.Screen name='verifyEmail' component={VerifyEmail} options={{headerShown:false}}/>
    <Stack.Screen name='recoveryPassword' component={RecoveryPassword} options={{headerShown:false}}/>
    <Stack.Screen name='resetPassword' component={ResetPassword} options={{headerShown:false}}/>
  
    <Stack.Screen name='destination' component={Destination} options={{headerTitle:'Destino da Corrida'}}/>
    <Stack.Screen name='rideDetail' component={RideDetail} options={{headerShown:false}}/>
    <Stack.Screen name='ride' component={Ride} options={{headerShown:false}}/>
    <Stack.Screen name='rideFinished' component={RideFinished} options={{headerShown:false}}/>
    <Stack.Screen name='rideCancelled' component={RideCancelled} options={{headerShown:false}}/>
    <Stack.Screen name='rideCancelledByPassenger' component={RideCancelled2} options={{headerShown:false}}/>
    <Stack.Screen name='rideHistoryDetail' component={RideHistoryDetail} options={{headerTitle:'Detalhes da Corrida'}}/>
    <Stack.Screen name='rideHistoryMap' component={RideHistoryMap} options={{headerTitle:'Mapa da Corrida'}}/>
    <Stack.Screen  name="homeDrawer" component={DrawerNavigator} options={{headerShown:false}}/>

</Stack.Navigator>
  )
}

export default StackNavigator