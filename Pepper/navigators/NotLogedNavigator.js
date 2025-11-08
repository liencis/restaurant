import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import WelcomeScreen from "../screens/WelcomeScreen";
import Onboarding from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function NotLogedNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerTitle: (props) => <Header {...props} />,}}/>
        <Stack.Screen name="Onboard" component={Onboarding} options={{headerTitle: (props) => <Header {...props} />,}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerTitle: (props) => <Header {...props} />,}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle: (props) => <Header {...props} />,}}/>
    </Stack.Navigator>
  );
};