import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'users.db', location: 'default' },
  () => console.log('Database opened'),
  error => console.log(error)
);

// Create Users Table (If not exists)
export const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE);',
      [],
      () => console.log('Users table created'),
      error => console.log(error)
    );
  });
};

// Create Expenses Table (If not exists)
export const createExpensesTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          username TEXT, 
          title TEXT, 
          category TEXT, 
          amount REAL, 
          billImage TEXT,
          date TEXT NOT NULL, -- Added date column
          FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
        );`,
        [],
        () => console.log('Expenses table created'),
        error => console.log(error)
      );
    });
  };
  

// Insert Expense into Database
export const insertExpense = (username, title, category, amount, billImage, date, onSuccess, onError) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO expenses (username, title, category, amount, billImage, date) VALUES (?, ?, ?, ?, ?, ?);`,
        [username, title, category, amount, billImage, date],
        (_, result) => onSuccess(result),
        (_, error) => onError(error)
      );
    });
  };
  

// Retrieve Expenses for a Specific User
export const getExpenses = (username, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM expenses WHERE username = ?;',
      [username],
      (_, results) => {
        let expenses = [];
        for (let i = 0; i < results.rows.length; i++) {
          expenses.push(results.rows.item(i));
        }
        callback(expenses);
      },
      error => console.log(error)
    );
  });
};

// Delete Expense by ID
export const deleteExpense = (id, successCallback, errorCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM expenses WHERE id = ?;',
      [id],
      (_, results) => successCallback(results),
      error => errorCallback(error)
    );
  });
};


//fetch Expense
export const fetchExpenses = (username, successCallback, errorCallback) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses WHERE username = ? ORDER BY date DESC;`,
        [username],
        (_, { rows }) => successCallback(rows.length ? rows._array : []),
        (_, error) => errorCallback(error)
      );
    });
  };
  
  
// Initialize Tables
export const initializeDatabase = () => {
  createUserTable();
  createExpensesTable();
};
