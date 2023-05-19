import Dexie from 'dexie';

// Initialize the database
const db = new Dexie('MyDatabase');

// Define the schema
db.version(1).stores({
  chats: 'id,content,role'
});

export default db;
