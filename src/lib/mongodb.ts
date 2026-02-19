import { MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB ?? "vipsportclub";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClientPromise() {
  if (global._mongoClientPromise) {
    return global._mongoClientPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI in environment variables.");
  }

  const clientPromise = new MongoClient(uri).connect();
  global._mongoClientPromise = clientPromise;
  return clientPromise;
}

export async function getDb() {
  const client = await getMongoClientPromise();
  return client.db(dbName);
}
