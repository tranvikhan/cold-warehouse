import React from 'react';
import { Divider, Icon, Layout, List, ListItem,useTheme, MenuItem, OverflowMenu,   TopNavigationAction, TopNavigation, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const data = new Array(13).fill({
  title: 'Cảnh báo nhiệt độ',
  description: 'kho lạnh số 1/ khu vực',
});



export default function Notification({ navigation, state }) {
    const theme = useTheme();
    const renderMoreAction =(props) =>(
        <MoreAction {...props}/>
    )
    const renderItemIcon = (props) => (
        <Icon {...props} name='alert-triangle' fill={theme['color-danger-default']}/>
    );
    
    const renderCheckIcon = (props) => (
      <Icon {...props} name='checkmark-outline' fill={theme['color-primary-default']}/>
    );

    const renderTopBar = () => (
      <TopNavigationAction  icon={renderCheckIcon}/>
    );

  const renderItem = ({ item, index }) => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={renderMoreAction}
            />
  );

  return (
    <Layout style={{flex: 1}} level='2'>
    <TopNavigation
              alignment='center'
              title='Thông báo'
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


const MenuIcon = (props) => (
  <Icon {...props} name='more-horizontal-outline'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const TrashIcon = (props) => (
  <Icon {...props} name='trash'/>
);

const MoreAction = (props) => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  return (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}>
      <MenuItem accessoryLeft={InfoIcon} title='Xem'/>
      <MenuItem accessoryLeft={TrashIcon} title='Xóa'/>
    </OverflowMenu>
  );
};

