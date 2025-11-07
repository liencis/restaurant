import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  Image,
  Switch,
} from 'react-native';
import { useEffect, useState} from 'react';
import { validateEmail, validatePhoneNumber } from '../helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {
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
    const defaultClientPref = {
        orderStatus: true,
        passwordChange: false,
        specialOffers: false,
        newsletter: false,
    }
    const [clientPref, setClientPref] = useState(defaultClientPref);
    const isEmailValid = validateEmail(email);
    const [infoIsChanged, setInfoIsChanged] = useState(false);

    const [image, setImage] = useState("");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // can add 'videos'
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setClient((prevClientState) => ({
                ...prevClientState, 
                uriImage: result.assets[0].uri
            }));
        }
    };

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
                };
                const prefInfo = await AsyncStorage.getItem('clientPref');
                if (prefInfo !== null) {
                    const preferences = JSON.parse(prefInfo);
                    setClientPref({
                        ...preferences,
                    })
                };
            } catch (e) {}
        })();
    }, []);

    useEffect(() => {

    }, [clientPref, client]);

    const saveChages = () => {
        (async () => {
            try {
                await AsyncStorage.setItem('clientPref', JSON.stringify(clientPref));
                await AsyncStorage.setItem('client', JSON.stringify(client));
                setInfoIsChanged(false);
                console.log(clientPref, client);
            } catch (e) {
                Alert.alert(`Error to save chages in Async storage: ${e}`);
            }
        })();
    };

    const discardChanges = () => {
        setClient({...client, lastName: "", phone: ""});
        setClientPref(defaultClientPref);
    };

    const updatePreferences = (key) => () => {
        setClientPref((prevState) => (
        {
            ...prevState,
            [key]: !prevState[key]
        }
        ));
        setInfoIsChanged(true);
    };

    // Not realy loging out more like clearing async storage
    const logOut = () => {
        (async () => {
            try {
                await AsyncStorage.clear()
            } catch (e) {};
        })();
    };

    return (
        <View style={styles.container} keyboardDismissMode='on-drag'>

            <Text style={styles.text}>Personal information</Text>
            
            <ScrollView keyboardDismissMode="on-drag">
                <Text style={styles.inputText}>Avatat</Text>
                <View style={styles.avatarView}>
                    { client.uriImage ? (
                        <Image
                            source={{ uri: client.uriImage }}
                            resizeMode='contain'
                            style={styles.image}
                        />
                    ) : (
                        <View style={styles.avatarBox}>
                            <Text style={styles.avatarText}>{client.name ? (client.name[0].toUpperCase()) : ("?")}</Text>
                        </View>
                    )
                    }
                    <Pressable style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Change</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={(_) => setImage(null)}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </Pressable>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.inputText}>First name</Text>
                    <TextInput
                        placeholder='My name'
                        value={undefined}
                        onChangeText={(data) => {
                            setClient({...client, name: data});
                            setInfoIsChanged(true);
                        }}
                        defaultValue={client.name}
                        style={styles.input}
                        maxLength={300}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Last name</Text>
                    <TextInput
                        placeholder='Last name'
                        value={client.lastName}
                        onChangeText={(data) => {
                            setClient({...client, lastName: data});
                            setInfoIsChanged(true);
                        }}
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
                        onChangeText={(data) => {
                            if(isEmailValid){
                                setClient({...client, email: data});
                                setInfoIsChanged(true);
                            }
                        }}
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
                        value={client.phone}
                        // TODO: need to add phone validation
                        onChangeText={(data) => {
                            setClient({...client, phone: data});
                            setInfoIsChanged(true);
                        }}
                        style={styles.input}
                        keyboardType={"numeric"}
                        maxLength={300}
                        textContentType="telephoneNumber"
                    />
                </View>
                
                <Text style={styles.text}>Email notifications</Text>
                <View style={styles.switchView}>
                    <Switch
                        trackColor={{false: '#c7c7c7ff', true: '#495E57'}}
                        thumbColor={'#f4f3f4'}
                        onValueChange={updatePreferences('orderStatus')}
                        value={clientPref.orderStatus}
                    />
                    <Text style={styles.switchText}>Order statuses</Text>
                </View>
                <View style={styles.switchView}>
                    <Switch
                        trackColor={{false: '#c7c7c7ff', true: '#495E57'}}
                        thumbColor={'#f4f3f4'}
                        onValueChange={updatePreferences('passwordChange')}
                        value={clientPref.passwordChange}
                    />
                    <Text style={styles.switchText}>Password change</Text>
                </View>
                <View style={styles.switchView}>
                    <Switch
                        trackColor={{false: '#c7c7c7ff', true: '#495E57'}}
                        thumbColor={'#f4f3f4'}
                        onValueChange={updatePreferences('specialOffers')}
                        value={clientPref.specialOffers}
                    />
                    <Text style={styles.switchText}>Special offers</Text>
                </View>
                <View style={styles.switchView}>
                    <Switch
                        trackColor={{false: '#c7c7c7ff', true: '#495E57'}}
                        thumbColor={'#f4f3f4'}
                        onValueChange={updatePreferences('newsletter')}
                        value={clientPref.newsletter}
                    />
                    <Text style={styles.switchText}>Newsletter</Text>
                </View>

                <View style={styles.rowButtonView}>
                    <Pressable style={styles.twoButton} onPress={discardChanges}>
                        <Text style={styles.buttonText}>Discard changes</Text>
                    </Pressable>
                    <Pressable 
                        disabled={!infoIsChanged}
                        style={infoIsChanged ? styles.twoButton : styles.twoButtonDisabeled} 
                        onPress={saveChages}
                    >
                        <Text style={styles.buttonText}>Save changes</Text>
                    </Pressable>
                </View>
                
                <View style={styles.inputView}>
                    <Pressable style={styles.button} 
                        onPress={() => {
                            logOut;
                            navigation.navigate("Welcome")
                        }}
                    >
                        <Text style={styles.buttonText}>Log out</Text>
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
    avatarView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 20,
    },
    avatarBox: {
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        width: 80,
        backgroundColor: '#495E57',
        borderRadius: 50,
    },
    avatarText: {
        fontSize: 36,
        textAlign: "center",
        color:'#EDEFEE',
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
        borderWidth: 1,
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
      backgroundColor: '#495E57',
      borderRadius: 12,
    },
    twoButton: {
      fontSize: 22,
      padding: 10,
      marginVertical: 8,
      margin: 20,
      height: 40,
      width: 150,
      backgroundColor: '#495E57',
      borderRadius: 12,
    },
    twoButtonDisabeled: {
      fontSize: 22,
      padding: 10,
      marginVertical: 8,
      margin: 20,
      height: 40,
      width: 150,
      backgroundColor: '#EDEFEE',
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
    image: {
        height: 80,
        width: 80,
        borderRadius: 50,
    },
    switchView: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#EDEFEE",
        paddingBottom: 15,
    },
    switchText: {
        fontSize: 18,
        color: "#333333",
        marginLeft: 30,
    },
    rowButtonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
