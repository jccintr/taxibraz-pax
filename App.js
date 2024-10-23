import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from './context/AuthContext';
import { DestinationContext } from './context/DestinationContext';
import { OriginContext } from './context/OriginContext';
import { LocationContext } from './context/LocationContext';
import {DriverLocationContext} from './context/DriverLocationContext';
import { RideContext } from './context/RideContext';

import StackNavigator from './navigation/StackNavigator';


//const Stack = createNativeStackNavigator();


const App = () => {
  const [loggedUser,setLoggedUser] = useState(null);
  const [apiToken,setApiToken] = useState(null);
  const [location, setLocation] = useState(null);
  const [drivers,setDrivers] = useState([]);
  const [activeRide,setActiveRide] = useState(null);
  const [origin,setOrigin] = useState(null);
  const [destination,setDestination] = useState(null);
  const [destinationText,setDestinationText] = useState('');
  const [originText,setOriginText] = useState('');


  return (
    <AuthContext.Provider value={{loggedUser,setLoggedUser,apiToken,setApiToken}}>
      <DriverLocationContext.Provider value={{drivers,setDrivers}}>
        <LocationContext.Provider value={{location,setLocation}}>
          <OriginContext.Provider value={{origin,setOrigin,originText,setOriginText}}>
            <DestinationContext.Provider value={{destination,setDestination,destinationText,setDestinationText}}>
              <RideContext.Provider value={{activeRide,setActiveRide}}>
                <NavigationContainer>
                    <StackNavigator/>
                </NavigationContainer>
              </RideContext.Provider>
            </DestinationContext.Provider>
          </OriginContext.Provider>
        </LocationContext.Provider>
      </DriverLocationContext.Provider>
    </AuthContext.Provider>
  )
}

export default App