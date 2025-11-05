import { 
  StyleSheet, 
  Text, 
  View,
  Image,
} from 'react-native';
import React, { useEffect, useState} from 'react';

export default function Header() {

  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../assets/Logo.png')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.1,
        alignItems: 'center',
        backgroundColor: '#ffffffff',
        position: "relative",
        width: "100%",
    },
    logo: {
        width: 185,
        height: 40,
        margin: 20,
    },
});
