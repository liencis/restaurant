import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useReducer, useMemo, createContext } from 'react';
import { useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store';
import Header from "./components/Header";
import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserIcon from "./components/UserIcon";
import Onboarding from "./screens/Onboarding";
import { AuthContext } from "./authContext";

     // <StatusBar style="auto" />
const Stack = createNativeStackNavigator();

export default function App() {
  const [client, setClient] = useState(
    {
        name: "?", 
        email: "", 
        phone: "", 
        lastName: "",
        uriImage: "",
    }
  );
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }
      console.log(userToken);
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();

    (async () => {
        try {
            const customers = await AsyncStorage.getItem('client');
            if (customers != null) {
              const client = JSON.parse(customers);
              setClient({...client})
            };
          } catch (e) {}
    })();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        setClient({...client, name: data.name, email: data.email});

        try {
            await AsyncStorage.setItem('client', JSON.stringify(client));
            await SecureStore.setItemAsync('userToken', `${data.email}`);
        } catch (e) {}

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  const [fontsLoaded, fontError] = useFonts({
    "MarkaziText": require("./assets/fonts/MarkaziText-Medium.ttf"),
    "Karla-ExtraBold": require("./assets/fonts/Karla-ExtraBold.ttf"),
    "Karla-Medium": require("./assets/fonts/Karla-Medium.ttf"),
    "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
  });

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      <Stack.Navigator>
        { state.isLoading ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerTitle: (props) => <Header {...props} />,}}/>
        ) : state.userToken == null ? (
          <Stack.Screen name="Onboard" component={Onboarding} options={{headerTitle: (props) => <Header {...props} />,}}/>
        ): (
          <>
          <Stack.Screen name="Home" component={HomeScreen}
            options={(props) => ({
              headerTitle: (props) => <Header {...props} />,
              headerRight: () => <UserIcon
                imageUri={client.uriImage}
                navigation={props.navigation}
                name={client.name}/>,
            })} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: (props) => <Header {...props} />, }} />
          </>
        )}
      </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
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
