import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, CheckBox, Icon, Input, Layout, Spinner, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

export const ForgotPassword = ({ navigation }) => {
  const [usename,setUsername] = React.useState();
  const [email,setEmail] = React.useState();


  const LoadingIndicator = (props) => {
    if(props.isLoading)
    return (
      <View style={[props.style, styles.indicator]}>
      <Spinner size='small' status='basic'/>
      </View>);
      return <></>;
  };
  
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  
  

  return ( 
    <Layout style={{flex:1}}>
      <TopNavigation
        accessoryLeft={BackAction}
        title='Đăng nhập'
      />
      <Layout style={styles.container}>
        <View style={styles.inputView}>
          <Input
            size='large'
            selectionColor="#3C4ED5"
            placeholder='Nhập tên đăng nhập'
            value={usename}
            onChangeText={nextValue => setUsername(nextValue)}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            size='large'
            selectionColor="#3C4ED5"
            placeholder='Nhập email'
            value={email}
            onChangeText={nextValue => setEmail(nextValue)}
          />
        </View>
        
        <View style={{...styles.inputView,marginBottom:10}}>
          <Button size='large' status='primary' accessoryLeft={()=><LoadingIndicator isLoading/>}>
            GỬI LẠI MẬT KHẨU
          </Button>
          
        </View>
      </Layout>
    </Layout>
      
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',

  },
  inputView:{
    marginBottom:30,
    width: "85%",
  },
  indicator:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  
})