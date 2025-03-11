import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'users.db', location: 'default' },
  () => {
    console.log('Database opened');
    enableForeignKeys();  // Ensure foreign keys work
  },
  error => console.log('Database Open Error:', error)
);

// Enable foreign key constraints
const enableForeignKeys = () => {
  db.transaction(tx => {
    tx.executeSql('PRAGMA foreign_keys = ON;', [], () => {
      console.log('Foreign Key Constraints Enabled');
    }, error => console.log('Foreign Key Error:', error));
  });
};

// Create Users Table (If not exists)
export const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE
      );`,
      [],
      () => console.log('Users table created'),
      error => console.log('User Table Creation Error:', error)
    );
  });
};

export const insertUser = (username, onSuccess, onError) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO users (username) VALUES (?);`,
        [username],
        (_, result) => onSuccess(result),
        (_, error) => onError(error)
      );
    });
  };

  export const checkUserExists = (username, callback) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?;',
        [username],
        (_, results) => {
          callback(results.rows.length > 0);
        },
        error => {
          console.log('Check User Exists Error:', error);
          callback(false);
        }
      );
    });
  };
  

// Create Expenses Table (If not exists)
export const createExpensesTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT NOT NULL, 
        title TEXT NOT NULL, 
        category TEXT NOT NULL, 
        amount REAL NOT NULL, 
        billImage TEXT DEFAULT '', 
        date TEXT NOT NULL,
        FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
      );`,
      [],
      () => console.log('Expenses table created'),
      error => console.log('Expenses Table Creation Error:', error)
    );
  });
};

// Insert Expense into Database (FIXED)
export const insertExpense = (username, title, category, amount, billImage, date, onSuccess, onError) => {
  console.log('Inserting Expense:', { username, title, category, amount, billImage, date });

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO expenses (username, title, category, amount, billImage, date) VALUES (?, ?, ?, ?, ?, ?);`,
      [username, title, category, parseFloat(amount), billImage || '', date],
      (_, result) => {
        console.log('Insert Success:', result);
        if (onSuccess) onSuccess(result);
      },
      (_, error) => {
        console.error('Insert Error:', error.message || JSON.stringify(error));
        if (onError) onError(error);
      }
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
      error => console.log('Fetch Error:', error)
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
      (_, error) => errorCallback(error)
    );
  });
};

// Fetch Expenses for a User (with Order)
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

// Log Expenses Data for Debugging
export const logExpenses = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM expenses;', [], (_, results) => {
      console.log('All Expenses:', results.rows._array);
    }, error => console.log('Log Expenses Error:', error));
  });
};
