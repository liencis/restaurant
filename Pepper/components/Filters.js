import { 
    View, 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    ScrollView
} from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
    >
      {sections.map((section, index) => (
        <TouchableOpacity
            key={index}
            onPress={() => {
                onChange(index);
            }}
            style={{
                width: 95,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: selections[index] ? '#495E57' : '#EDEFEE',
                borderRadius: 15,
                margin: 8,
            }}>
            <View>
                <Text style={{ 
                    color: selections[index] ? '#EDEFEE' : '#495E57',
                    fontWeight: "bold",
                    }
                }>
                {section}
                </Text>
            </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: '#ffffffff',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    paddingTop: 5,
  },
});

export default Filters;
