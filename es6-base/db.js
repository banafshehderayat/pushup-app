import { MongoClient, Collection, ObjectID } from 'mongodb';

let url = 'mongodb://localhost:27017/pushup-app';
const dbPromise = MongoClient.connect(url);


const collection = (collectionName) => {
  console.log('im here');
  return dbPromise.then(db => db.collection(collectionName));
}

export default collection;
