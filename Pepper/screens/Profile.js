import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useEffect, useState} from 'react';
import { validateEmail } from '../helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [client, setClient] = useState({name: "", email: "", phone: "", lastName: ""});
    const isEmailValid = validateEmail(email);

    useEffect(() => {
        (async () => {
            try {
                const customers = await AsyncStorage.getItem('client');
                if (customers !== null) {
                    const client = JSON.parse(customers);
                    setClient({
                        ...client,
                        name: client.name,
                        email: client.email,
                    })
                }
            } catch (e) {}
        })();
    }, []);

    return (
        <View style={styles.container} keyboardDismissMode='on-drag'>

            <Text style={styles.text}>Personal information</Text>
            
            <ScrollView keyboardDismissMode="on-drag">
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>First name</Text>
                    <TextInput
                        placeholder='My name'
                        value={undefined}
                        onChangeText={(data) => setName(data)}
                        defaultValue={client.name}
                        style={styles.input}
                        maxLength={300}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Last name</Text>
                    <TextInput
                        placeholder='Last name'
                        value={name}
                        onChangeText={(data) => setClient({...client, lastName: data})}
                        style={styles.input}
                        maxLength={300}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        placeholder='Email'
                        value={undefined}
                        // TODO: need to add email validation
                        onChangeText={(data) => setClient({...client, email: data})}
                        style={styles.input}
                        keyboardType={'email-address'}
                        maxLength={300}
                        defaultValue={client.email}
                        textContentType="emailAddress"
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Phone number</Text>
                    <TextInput
                        placeholder='Phone number'
                        value={email}
                        // TODO: need to add phone validation
                        onChangeText={(data) => setClient({...client, phone: data})}
                        style={styles.input}
                        keyboardType={"numeric"}
                        maxLength={300}
                        textContentType="telephoneNumber"
                    />
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
        fontSize: 24,
        textAlign: "left",
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
