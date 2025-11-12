import * as ExpoSQLite from 'expo-sqlite';
import { createWebSQLWrapper } from 'expo-sqlite-legacy-adapter';

const SQLite = createWebSQLWrapper(ExpoSQLite);
const db = SQLite.openDatabase('lemon');

export async function deleteTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DROP TABLE IF EXISTS menuitems;'
        );
      },
      reject,
      resolve
    );
  });
}

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text, description text, image text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(`insert into menuitems (uuid, title, price, category, description, image) values ${menuItems.map((item) => 
    `('${item.id}', '${item.title}', '${item.price}', '${item.category}', '${item.description}', '${item.image}')`).join(', ')}`);
    console.log("Sucsess ");
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  const categoriesToDisplay = activeCategories.map((cat) => `category = '${cat}'`).join(' OR ');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM menuitems WHERE (${categoriesToDisplay}) AND (title LIKE '%${query}%')`, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}
