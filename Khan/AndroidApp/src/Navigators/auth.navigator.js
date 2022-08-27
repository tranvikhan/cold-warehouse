import React from 'react';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import SignIn from '../screens/auth/signIn.component';
import SignUp from '../screens/auth/signUp.component';
import {ForgotPassword} from '../screens/auth/forgotPassword.component';

const { Navigator, Screen } = createStackNavigator();
export default function AuthNavigator(){
  
  return(
    <Navigator headerMode='none' initialRouteName="SignIn">
      <Screen name='SignIn' component={SignIn}/>
      <Screen name='SignUp' component={SignUp}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS  ,
      }}/>
      <Screen name='ForgotPassword' component={ForgotPassword}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS  ,
      }}/>
    </Navigator>
  );

}
