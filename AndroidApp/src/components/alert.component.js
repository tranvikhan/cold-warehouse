import { Card, Icon, Modal, Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet, View } from 'react-native'




export default function MyAlert(props) {
  const Header = (prop) => (
    <View {...prop} >
      <Text category='h6' status={props.status}>{props.title}</Text>
    </View>
  );
    return (
        <Modal
          visible={props.visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => props.setVisible(false)}
         >
            <Card 
                  status={props.status}
                  header={Header}>
              <Text>{props.text}</Text>
            </Card>
        </Modal>
    )
}


const styles = StyleSheet.create({
  backdrop:{
    backgroundColor:'rgba(0, 0, 0, 0.8)',
  },
})