import React, { useEffect } from 'react'
import {Pressable, StyleSheet, View,Alert} from 'react-native'
import {Icon, Text, useTheme} from '@ui-kitten/components'

export default function AreaRoom(props) {
    const theme = useTheme();
    const styles = StyleSheet.create({
        areaRoomView:{
            flex:1,
            backgroundColor: theme['background-basic-color-4'],
            paddingHorizontal:20,
            paddingVertical:20,
            borderRadius:15,
            marginHorizontal:5,
            alignItems: 'center',
            minWidth:150
        },
        areaRoomFocus:{
            backgroundColor:theme['color-primary-active']
        },
        title:{
            
        },
        icon:{
             width: 40, 
             height: 40,
        },
        horizontalContent:{
          flexDirection: 'row',
          marginTop:15
        },
        temperature:{
        }
    })
    const getTheme = (props.focus==true)?[styles.areaRoomView,styles.areaRoomFocus] :styles.areaRoomView 
    const onPressView = () =>{
        props.onPressView(props.data.id);
    }

    return (
        <Pressable onPress={onPressView}>
            <View 
            style={getTheme}>
            <Text style={styles.title} category='s1'>{props.data.title}</Text>
            <View style={styles.horizontalContent}>
                <MyIcon type={props.data.status} />
                <Text style={styles.temperature} category='h6'>{props.data.temperature +'°C'}</Text>
            </View>
            
        </View>
        </Pressable>
        
    )
}

const MyIcon = (props) =>{
    const theme = useTheme();
    const styles = StyleSheet.create({
        icon:{
             width: 25, 
             height: 25,
        }
    })
    const [name,setName] = React.useState('thermometer-outline');
    const [color,setColor] = React.useState(theme['text-success-color']);
    React.useEffect(() => {
        if(props.type =='increase'){
            setName('thermometer-plus-outline');
            setColor(theme['text-danger-color']);
        }
        if(props.type == 'decrease'){
            setName('thermometer-minus-outline');
            setColor(theme['text-warning-color']);
        }
        if(props.type == 'stability'){
            setName('thermometer-outline');
            setColor(theme['text-success-color']);
        }
    },[props.type]) 

    return(
        <Icon  name={name} style={styles.icon} fill={color}/>
    );
}