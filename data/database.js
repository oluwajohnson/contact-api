const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

const initDb = async () => {
  if (db) {
    console.log("Database already initialized");
    return;
  }

  try {
    await client.connect();
    db = client.db();
    console.log("Database connected");
  } catch (err) {
    console.error(err);
  }
};

const getDb = () => {
  return db;
};

module.exports = { initDb, getDb };