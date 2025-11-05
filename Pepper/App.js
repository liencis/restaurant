import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Onboarding from './screens/ Onboarding';

     // <StatusBar style="auto" />
export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.containerMain}>
        <Onboarding/>
        <Text style={styles.text}>💩</Text>
        <Text style={styles.text}>Alberts</Text>
      </View>
    </View>
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
