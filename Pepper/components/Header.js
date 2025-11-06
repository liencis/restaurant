import { 
  StyleSheet, 
  Image,
} from 'react-native';

export default function Header() {
    return (
        <Image
            style={styles.logo}
            source={require('../assets/Logo.png')}
        />
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 185,
        height: 40,
    },
});
