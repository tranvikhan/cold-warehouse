import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import Apps from './Apps.js';
export default function ThreeChart() {
    return (
        <Layout style={{flex:1,alignItems: 'center',justifyContent: 'center'}}>
            <Apps />
            <Text>3D Reander</Text>
        </Layout>
    )
}