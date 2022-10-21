import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';



const Drawer = createDrawerNavigator();


export default function AppRoute() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Atendimentos de hoje" component={Home} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}