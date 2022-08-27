import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './auth.navigator';
import MainNavigator from './main.navigator';


export default function AppNavigator() {
  const [isAuthenticated, setAuthent]= React.useState(true)
  return(
    <NavigationContainer>
      {isAuthenticated ==false ?
      (<AuthNavigator />):
      (<MainNavigator />)
      }
    </NavigationContainer>
  );
}
