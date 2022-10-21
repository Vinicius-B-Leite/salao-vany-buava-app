import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import LogoSvg from '../../assets/logo.svg'

const { height } = Dimensions.get('screen')

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{marginTop: '10%', marginBottom: '10%'}}>
                <LogoSvg width='100%' height={height / 5} />
                <Text style={{color: '#fff', textAlign: 'center', fontSize: 15}}>Seja bem-vinda!</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}