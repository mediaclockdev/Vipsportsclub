import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment variables.");
}

const dbName = process.env.MONGODB_DB ?? "vipsportclub";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const mongoClientPromise =
  global._mongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  global._mongoClientPromise = mongoClientPromise;
}

export async function getDb() {
  const client = await mongoClientPromise;
  return client.db(dbName);
}
