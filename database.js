const { MongoClient } = require('mongodb');
const config = require('./service/dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');

const userCollection = db.collection('users');
const taskCollection = db.collection('tasks');
const settingsCollection = db.collection('settings');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log('Connected to database');
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function getUser(email) {
  return userCollection.findOne({ email });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function getTasks(email) {
  return taskCollection.find({ email }).toArray();
}

async function addTask(task) {
  return taskCollection.insertOne(task);
}

async function updateTask(id, update) {
  return taskCollection.updateOne({ id }, { $set: update });
}

async function deleteTask(id) {
  return taskCollection.deleteOne({ id });
}

module.exports = { getUser, addUser, getTasks, addTask, updateTask, deleteTask };
