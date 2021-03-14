
const { MongoClient } = require("mongodb");

const url = `mongodb+srv://Anton:3485@cluster0.3sxmf.mongodb.net/?retryWrites=true&w=majority`;

const dbName = "travel";
const collectionName = "places";

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url);

  return await client.db(dbName);
};

const getCollection = async () => {
  const db = await getMongoInstance();

  return await db.collection(collectionName);
};

const listAll = async () => {
  const collection = await getCollection();
  return collection.find({}).toArray();
};

const getById = async (idPlaces) => {
  const collection = await getCollection();
  return collection.find({ idPlaces }).toArray();
};
const getByPlace = async (idPlaces, idPlace) => {
  const collection = await getCollection();
  return collection.find({ idPlaces }).places.find(({ id: idPlace }))
}
const create = async (item) => {
  const collection = await getCollection();
  const response = await collection.insertOne(item);
  return response.ops[0];
};

const update = async (item) => {
  const collection = await getCollection();

  const response = await collection.find({ idPlaces }).places.replaceOne({ id }, item);
  return response.ops[0];
};

const remove = async (id) => {
  const collection = await getCollection();
  return collection.deleteOne({ id });
};

module.exports = { listAll, getById, create, update, remove };
