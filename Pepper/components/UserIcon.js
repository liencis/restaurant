import { 
  StyleSheet, 
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function UserIcon({ imageUri, navigation, name }) {
    const img = imageUri ? (imageUri) : ('https://i.imgur.com/P0GMuKS.jpeg[/img]');
    return (
        <Pressable 
            onPress={() => navigation.navigate("Profile")}
            style={({ pressed }) => { return {opacity: pressed ? 0 : 1}}} // This sets light trasperency on button presed
        >
            { imageUri ? (
                <Image
                    style={styles.logo}
                    source={{uri: img}}
                />
            ) : (
                <View style={styles.avatarBox}>
                    <Text style={styles.avatarText}>{name[0]}</Text>
                </View>
            )}

        </Pressable>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    avatarBox: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        backgroundColor: '#495E57',
        borderRadius: 50,
    },
    avatarText: {
        fontSize: 18,
        textAlign: "center",
        color:'#EDEFEE',
    },
});
