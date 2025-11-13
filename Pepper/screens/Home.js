import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  ActivityIndicator,
  FlatList,
  SectionList,
  Image,
} from 'react-native';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../database';
import React, { useEffect, useState} from 'react';
import { getSectionListData, useUpdateEffect } from "../helper";
import Item from '../components/Item';
import Filters from '../components/Filters';

const MENU_API = "https://raw.githubusercontent.com/liencis/files-to-change/refs/heads/main/lemon-menu.js";

const sections = ['Appetizers', 'Salads', 'Beverages', 'Mains', 'Desserts'];

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async() => {

    // Fetch the menu from the MENU_API endpoint. You can visit the MENU_API in your browser to inspect the data returned
    try {
      const response = await fetch(MENU_API);
      const returnList = await response.json();
      return returnList
    } catch (e) {console.error(e)}; 
  }

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();

        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems.length) {
          menuItems = await fetchData();
          menuItems = menuItems.menu;
          saveMenuItems(menuItems);
        }

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  // const lookup = useCallback((q) => {
  //   setQuery(q);
  // }, []);

  // const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  // const handleSearchChange = (text) => {
  //   setSearchBarText(text);
  //   debouncedLookup(text);
  // };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerHeader}>Little Lemon</Text>
        <Text style={styles.bannerSubHeader}>Chicago</Text>
        <View style={styles.bannerView}>
          <Text style={styles.bannerText}>We  are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          <Image
            source={require('../assets/Hero image.png')}
            style={styles.bannerImg}
            resizeMode="cover"
          />
        </View>
      </View>
      {/* <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="white"
        inputStyle={{ color: 'white' }}
        elevation={0}
      /> */}
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item title={item.title} description={item.description} price={item.price} image={item.image}/>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffffffff',
    //paddingTop: 40,
  },
  banner: {
    backgroundColor: '#495E57',
  },
  bannerHeader: {
    color: "#F4CE14",
    fontSize: 56,
    fontFamily: "MarkaziText",
    paddingHorizontal: 8,
  },
  bannerSubHeader: {
    color: "#EDEFEE",
    fontSize: 40,
    fontFamily: "MarkaziText",
    paddingHorizontal: 8,
  },
  bannerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerText: {
    width: 220,
    overflow: "scroll",
    color: "#EDEFEE",
    padding: 8,
    fontSize: 16,
    fontFamily: "Karla-Regular",
  },
  bannerImg: {
    verticalAlign: "middle",
    height: 130, 
    width: 130, 
    margin: 10,
    borderRadius: 12,
  },
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: '#495E57',
    backgroundColor: '#ffffffff',
    borderBottomColor: '#EDEFEE',
    borderBottomWidth: 2,
  },
});
