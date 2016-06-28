import { MongoClient, Collection} from 'mongodb';

let url = 'mongodb://localhost:27017/pushup-app';
const dbPromise = MongoClient.connect(url);
const collection = (collectionName) => {
  return dbPromise.then(db => db.collection(collectionName));
}

export default collection;
