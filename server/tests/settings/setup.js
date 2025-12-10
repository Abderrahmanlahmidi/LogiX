import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";

let mongo;

export function setupDB() {
  before(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    await mongoose.connection.close();
    await mongo.stop();
  });
}

export function generateToken(userId = "test-user-id") {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "test-secret");
}
