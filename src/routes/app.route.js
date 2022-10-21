import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';



const Drawer = createDrawerNavigator();
const drawerStyle = {
    headerStyle: {backgroundColor: '#0C031E'}, 
    headerTintColor: '#fff', 
    drawerActiveBackgroundColor: '#A036F3', 
    drawerActiveTintColor: '#fff', 
    drawerContentStyle: {backgroundColor: '#070113'}
}

export default function AppRoute() {
    
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={drawerStyle}>
                <Drawer.Screen name="Atendimentos de hoje" component={Home} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

