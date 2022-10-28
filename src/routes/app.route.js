import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import Schedule from '../screens/Schedule';
import CustomDrawer from '../components/CustomDrawer';
import NewProceedings from '../screens/NewProceedings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateProcedings from '../components/UpdateProcedings';



const Drawer = createDrawerNavigator();
const drawerStyle = {
    headerStyle: {
        backgroundColor: '#0C031E',
    }, 
    headerTintColor: '#fff', 

    drawerActiveBackgroundColor: '#A036F3', 
    drawerActiveTintColor: '#fff', 

    drawerInactiveBackgroundColor: '#410C6B', 
    drawerInactiveTintColor: '#615B5B',

    drawerStyle: {
        backgroundColor: '#070113'
    },
    
}

function HomeStack(){
    const Stack = createNativeStackNavigator()

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Editar agendamento' component={UpdateProcedings} />
        </Stack.Navigator>
    )
}

export default function AppRoute() {
    
    return (
        <NavigationContainer>
            <Drawer.Navigator 
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={drawerStyle} 
            >

                <Drawer.Screen name="Atendimentos de hoje" component={HomeStack} />
                <Drawer.Screen name="Agendar cliente" component={Schedule} />
                <Drawer.Screen name="Cadastrar procedimento" component={NewProceedings} />

            </Drawer.Navigator>
        </NavigationContainer>
    );
}

