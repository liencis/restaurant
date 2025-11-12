import { 
  StyleSheet, 
  Image,
  Pressable,
} from 'react-native';

export default function UserIcon({ imageUri, navigation }) {
    const img = imageUri ? (imageUri) : ('https://i.imgur.com/P0GMuKS.jpeg[/img]');
    return (
        <Pressable 
            onPress={() => navigation.navigate("Profile")}
            style={({ pressed }) => { return {opacity: pressed ? 0 : 1}}} // This sets light trasperency on button presed
        >
            <Image
                style={styles.logo}
                source={{uri: img}}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
});
