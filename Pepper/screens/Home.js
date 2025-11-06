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

export default function HomeScreen() {
    return (
        <View style={styles.container} keyboardDismissMode='on-drag'>

            <Text style={styles.text}>Home Page</Text>
            
            <ScrollView keyboardDismissMode="on-drag">

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
