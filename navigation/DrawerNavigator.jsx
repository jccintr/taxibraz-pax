import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Historico from '../screens/Historico';
import SendMessage from '../screens/SendMessage';
import CustomDrawer from './CustomDrawer';




const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={ props => <CustomDrawer {...props}/> }>
       
       <Drawer.Screen name='home' component={Home} options={{headerShown:false}}/>
       <Drawer.Screen name="profile" component={Profile} options={{headerTitle:'Meu Perfil'}} />
       <Drawer.Screen name="sendMessage" component={SendMessage} options={{headerTitle:'Fale Conosco'}} />
       <Drawer.Screen name="historico" component={Historico} options={{headerTitle:'Histórico de Corridas'}}/>
      
  </Drawer.Navigator>
  )
}

export default DrawerNavigator
