import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, Text  } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Status from '../screens/status/status.component';
import Notification from '../screens/notification/notification.component';
import User from '../screens/user/user.component'
import Sensor from '../screens/sensor/sensor.component';
const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
       const PersonIcon = (props) => (
        <Icon {...props} name='person-outline'/>
      );
      
      const BellIcon = (props) => (
        <Icon {...props} name='bell-outline' />
      );
      
      const CubeIcon = (props) => (
          <Icon {...props} name='monitor-outline'/>
        );
      const GirdIcon = (props) => (
        <Icon {...props} name='grid-outline'/>
      );

    return(
    <BottomNavigation 
        appearance='noIndicator'
        selectedIndex={state.index} 
        onSelect={index => navigation.navigate(state.routeNames[index])}
    >
        <BottomNavigationTab icon={CubeIcon} />
        <BottomNavigationTab icon={GirdIcon}/>
        <BottomNavigationTab icon={BellIcon}/>
        <BottomNavigationTab icon={PersonIcon}/>
        
    </BottomNavigation>
    );
}


export default MainNavigator = () => {
  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name='Status' component={Status} />
      <Screen name='Sensor' component={Sensor}/>
      <Screen name='Notification' component={Notification}/>
      <Screen name='Users' component={User}/>
  </Navigator>
      
  );
};



