import { Avatar,  Icon, Layout, ListItem, Text ,Toggle,useTheme} from '@ui-kitten/components';
import {StyleSheet,ScrollView,Alert} from 'react-native';
import React from 'react';


export default function User() {
    const theme = useTheme();
    const [checkNotification, setCheckNotification] = React.useState(true);
    const [checkDarkMode, setCheckDarkMode] = React.useState(true);




    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        listItem:{
            margin:5,
            borderRadius:10,
            minHeight:55
        },
        category:{
            marginTop:10,
            marginLeft:8
        },
        userAvatar:{
            margin:15
        },
        onPress:{
            backgroundColor:'red'
        }
    })


    return (
        <Layout style={styles.container} level='2'>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <ListItem
                    disabled
                    style={styles.listItem}
                    title='Trần Vi Khan'
                    description='tranvikhan@gmail.com'
                    accessoryLeft={(props)=>(
                        <Avatar size='giant' source={require('../../assets/images/logo.png')} style={styles.userAvatar}></Avatar>
                    )}
                />
                <Text style={styles.category}category='p2' appearance='hint'>Tài khoản</Text>
                <ListItem
                    onPress={()=>{Alert.alert('hello')}}
                    style={styles.listItem}
                    title='Thông tin'
                    accessoryLeft={(props)=>(
                        <Icon name='info-outline'{...props} />
                    )}
                />
                <ListItem
                    style={styles.listItem}
                    title='Đổi mật khẩu'
                    accessoryLeft={(props)=>(
                        <Icon name='unlock-outline'{...props} />
                    )}
                />
                <ListItem
                    style={styles.listItem}
                    title='Đăng xuất'
                    accessoryLeft={(props)=>(
                        <Icon name='log-out-outline'{...props} />
                    )}
                />
                <Text style={styles.category}category='p2' appearance='hint'>Giao diện</Text>
                <ListItem
                    style={styles.listItem}
                    title='Chế độ tối'
                    accessoryLeft={(props)=>(
                        <Icon name='moon-outline'{...props} />
                    )}
                    accessoryRight={(props)=>(
                        <Toggle checked={checkNotification} onChange={()=>{setCheckNotification(!checkNotification)}}></Toggle>
                    )}
                />
                <Text style={styles.category}category='p2' appearance='hint'>Thông báo</Text>
                <ListItem
                    style={styles.listItem}
                    title='Thông báo'
                    accessoryLeft={(props)=>(
                        <Icon name='globe-outline' {...props} />
                    )}
                    accessoryRight={(props)=>(
                        <Toggle checked={checkDarkMode} onChange={()=>{setCheckDarkMode(!checkDarkMode)}}></Toggle>
                    )}
                />
        
                
            </ScrollView>
        </Layout>
    )

}
