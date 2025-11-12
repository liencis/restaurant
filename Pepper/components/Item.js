import { 
  StyleSheet, 
  Text, 
  View,
  Image,
} from 'react-native';

export default function Item ({ title, description, price, image }) {
  const imgLink = image; //'https://i.imgur.com/P0GMuKS.jpeg[/img]';
  return (
    <View style={styles.item}>
      <View style={styles.bannerTextArea}>
        <Text style={styles.itemHeader}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.itemPrice}>${price}</Text>
      </View>
      <View style={styles.bannerImageArea}>
        <Image
          source={{uri: imgLink}}
          style={styles.itemImage}
          resizeMode="cover"
        />
      </View>
    </View>
)};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EDEFEE",
    },
    bannerTextArea: {
        flex: 0.7,
        marginRight: 5,
    },
    bannerImageArea: {
        flex: 0.3,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    itemHeader: {
        fontSize: 20,
        color: '#333333',
        fontWeight: "bold",
        paddingBottom: 5,
    },
    description: {
        color: '#495E57',
        fontSize: 16,
        paddingBottom: 10,
    },
    itemPrice: {
        color: '#495E57',
        fontSize: 18,
        fontWeight: "bold",
    },
});