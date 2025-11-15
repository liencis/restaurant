import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useEffect, useState, useContext} from 'react';
import { validateEmail } from '../helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../authContext';

export default function Onboarding({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [client, setClient] = useState(
        {
            name: "", 
            email: "", 
            phone: "", 
            lastName: "",
            uriImage: "",
        }
    );
    const { signUp } = useContext(AuthContext);
    const isEmailValid = validateEmail(email);

    useEffect(() => {
        (async () => {
            try {
                await AsyncStorage.setItem('client', JSON.stringify(client));
            } catch (e) {}
        })();
    }, [client]);

    return (
        <View style={styles.container} keyboardDismissMode='on-drag'>

            <Text style={styles.text}>Let us get to know you</Text>
            
            <ScrollView keyboardDismissMode="on-drag">
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>First name</Text>
                    <TextInput
                        placeholder='My name'
                        value={name}
                        onChangeText={(data) => setName(data)}
                        style={styles.input}
                        maxLength={300}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={(data) => setEmail(data)}
                        style={styles.input}
                        keyboardType={'email-address'}
                        maxLength={300}
                    />
                </View>
                
                <View style={styles.buttonView}>
                    <Pressable             
                        disabled={!(isEmailValid && name)}
                        style={(isEmailValid && name) ? styles.button : styles.buttonDisabeled}
                        onPress={() => {
                            setClient((prevState) => ({...prevState, name: name, email: email}));
                            signUp({ name, email });
                            //navigation.navigate('Home')
                        }}
                    >
                    <Text style={styles.buttonText}>Next</Text>
                    </Pressable>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        textAlign: "center",
        backgroundColor: '#ffffffff',
        position: "relative",
        width: "100%",
    },
    text: {
        fontSize: 36,
        textAlign: "center",
        color: '#495E57',
        fontWeight: "bold",
        padding: 20,
    },
    inputView: {
        alignItems: "stretch",
        marginBottom: 10,
    },
    inputText: {
        paddingLeft: 15,
        color: '#495E57',
    },
    input: {
        height: 43,
        margin: 10,
        borderWidth: 2,
        padding: 10,
        fontSize: 16,
        borderColor: '#495E57',
        backgroundColor: '#ffffffff',
        borderRadius: 10,
    },
    buttonView: {
        alignItems: "flex-end",
    },
    buttonText: {
      textAlign: 'center',
      color: '#ffffffff',
    },
    button: {
      fontSize: 22,
      padding: 10,
      marginVertical: 8,
      margin: 20,
      height: 40,
      width: 160,
      backgroundColor: '#495E57',
      borderRadius: 12,
    },
    buttonDisabeled: {
        fontSize: 22,
        padding: 10,
        marginVertical: 8,
        margin: 20,
        height: 40,
        width: 160,
        backgroundColor: '#d7d7d7ff',
        borderRadius: 10,
    },
});
