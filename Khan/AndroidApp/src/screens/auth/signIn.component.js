import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Icon, Input, Layout, Spinner, Text } from '@ui-kitten/components';

const LoadingIndicator = (props) => {
  if(props.isLoading)
  return (
    <View style={[props.style, styles.indicator]}>
    <Spinner size='small' status='basic'/>
    </View>);
    return <></>;
};



export const SignIn = ({ navigation }) => {
  const [usename,setUsername] = React.useState();
  const [password,setPassword] = React.useState();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );


  return (
      <Layout style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/images/logo.png') }/>
        <Text style={styles.text} category='h2'>
         QUẢN LÝ NHIỆT ĐỘ KHO LẠNH
        </Text>
        <View style={styles.inputView}>
          <Input
            size='large'
            selectionColor="#3C4ED5"
            placeholder='Nhập tên đăng nhập'
            value={usename}
            onChangeText={nextValue => setUsername(nextValue)}
          />
        </View>
        <View style={{...styles.inputView,marginBottom:10}}>
        <Input
          size='large'
          selectionColor="#3C4ED5"
          value={password}
          placeholder='Nhập mật khẩu'
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setPassword(nextValue)}
        />
        </View>
        <Button appearance='ghost' style={styles.forgot} status='basic' onPress={()=>{navigation.navigate('ForgotPassword');}}>
          Quên mật khẩu ?
        </Button>
        <View style={styles.inputView}>
          <Button size='large' status='primary' accessoryLeft={()=><LoadingIndicator isLoading/>}>
            ĐĂNG NHẬP
          </Button>
          
        </View>
        <View style={styles.inputView}>
          <Button size='large' appearance='outline' status='basic' onPress={()=>{navigation.navigate('SignUp');}}>
            ĐĂNG KÍ
          </Button>
          
        </View>
      </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',

  },
  logo:{
    marginTop:40,
    height:90,
    resizeMode: "contain",
    marginBottom:40
  },
  inputView:{
    marginBottom:25,
    width: "85%",
  },
  indicator:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    marginBottom:40,
    textAlign:"center",
    width: "85%",
  },
  forgot:{
    marginBottom:25
  }
})