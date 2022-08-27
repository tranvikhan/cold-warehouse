import React from 'react';
import { Divider, Icon, Layout, List, ListItem,useTheme,  TopNavigationAction, TopNavigation, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const data = new Array(13).fill({
  title: 'Cảm biến',
  description: 'SENSOR0000',
  value: -Math.random()*100

});



export default function Sensor({ navigation, state }) {
    const theme = useTheme();

    const TemperatureValue =(props) =>{
        return(<Text category='s1' style={styles.temperature}>{Math.round(props.value*100)/100}°C</Text>);
        
    }
    const renderItemIcon = (props) => (
        <Icon {...props} name='info' fill={theme['color-primary-default']}/>
    );
    
    const renderCheckIcon = (props) => (
      <Icon {...props} name='funnel-outline' fill={theme['color-primary-default']}/>
    );

    const renderTopBar = () => (
      <TopNavigationAction  icon={renderCheckIcon}/>
    );
    const styles = StyleSheet.create({
        temperature:{
            marginRight:10
        }
    })

  const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={()=>(
                <TemperatureValue value={item.value} />
            )}
        />
         
    
  );

  return (
    <Layout style={{flex: 1}} level='2'>
    <TopNavigation
              alignment='center'
              title='Danh sách cảm biến'
              accessoryRight={renderTopBar}
          />
    <Divider />
    <List
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
    />
    </Layout>
  );
};

