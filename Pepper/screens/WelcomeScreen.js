import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome!
      </Text>
      <Image 
        source={require('../assets/lemon-logo.png')}
        style={{height: 300, width: 300, margin: 40}}
        resizeMode='contain'
      />
        <Pressable             
            style={styles.button}
            onPress={() => navigation.navigate('Onboard')}
        >
        <Text style={styles.buttonText}>Let's get started!</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center"
    },
    text: {
        fontSize: 40, 
        color: '#495E57', 
        fontWeight: "bold",
    },
    buttonText: {
      textAlign: 'center',
      color: '#ffffffff',
    },
    button: {
        justifyContent: "center",
      fontSize: 22,
      padding: 10,
      marginVertical: 8,
      margin: 20,
      height: 70,
      width: 200,
      backgroundColor: '#495E57',
      borderRadius: 12,
    },
});