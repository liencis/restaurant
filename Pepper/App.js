import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import LogedInNavigator from './navigators/LogedInNavigator';
import NotLogedNavigator from './navigators/NotLogedNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useFonts } from "expo-font";

     // <StatusBar style="auto" />

export default function App() {
  const [state, setState] = useState({isOnboardingCompleted: false});

  useEffect(() => {
    (async () => {
        try {
            const customers = await AsyncStorage.getItem('client');
            setState(customers === null ? {isOnboardingCompleted: false} : {isOnboardingCompleted: true});
          } catch (e) {}
    })();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "MarkaziText": require("./assets/fonts/MarkaziText-Medium.ttf"),
    "Karla-ExtraBold": require("./assets/fonts/Karla-ExtraBold.ttf"),
    "Karla-Medium": require("./assets/fonts/Karla-Medium.ttf"),
    "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
  });

  return (
    <NavigationContainer>
      {state.isOnboardingCompleted ? (
        <LogedInNavigator/>
        ) : (
        <NotLogedNavigator/>
      )}
      
        {/* <View style={styles.container}>
          <Header/>
          <View style={styles.containerMain}>
            <Onboarding/>
            <Text style={styles.text}>💩</Text>
            <Text style={styles.text}>Alberts</Text>
          </View>
        </View> */}

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79d69bff',
    alignItems: 'center',
    paddingTop: 30,
  },
  containerMain: {
    flex: 0.8, // This is for now till we add footer
    margin: 10,
    width: "100%",
  },
  text: {
    color: '#ffffffff',
    fontSize: 50,
  },
});
