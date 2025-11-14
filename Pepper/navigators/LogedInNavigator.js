import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import WelcomeScreen from "../screens/WelcomeScreen";
import UserIcon from "../components/UserIcon";
import Onboarding from "../screens/Onboarding";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function LogedInNavigator ({ navigation }) {
  const [clientImg, setClientImg] = useState("");

  useEffect(() => {
    (async () => {
        try {
            const customers = await AsyncStorage.getItem('client');
            if (customers !== null) {
              const client = JSON.parse(customers);
              setClientImg(client.uriImage)
            }
          } catch (e) {}
    })();
  }, []);

  return (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={ (props) => ({
            headerTitle: (props) => <Header {...props} />,
            headerRight: () => <UserIcon imageUri={clientImg} navigation={props.navigation}/>,
          })}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTitle: (props) => <Header {...props} />,}}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerTitle: (props) => <Header {...props} />,}}/>
        <Stack.Screen name="Onboard" component={Onboarding} options={{headerTitle: (props) => <Header {...props} />,}}/>
    </Stack.Navigator>
  );
};
