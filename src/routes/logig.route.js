import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';


const Stack = createNativeStackNavigator()
export default function LoginRoute() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}