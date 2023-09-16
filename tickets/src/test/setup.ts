import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signup: () => string[];
}

jest.mock("../nats-wrapper");

let mongo: MongoMemoryServer;

beforeAll(async () => {
  // Setup test environmrnt variables
  process.env.JWT_KEY = "hijack";

  // Setup test in memory database engine
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signup = () => {
  // Cookie Exmaple:
 

  // 1. Build JWT payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com"
  }

  // 2. create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // 3. Build session Object. {jwt: MY_JWT}
  const session = { jwt: token };

  // 4. Turn that session into json
  const sessionJSON = JSON.stringify(session);

  // 5. Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // 6. Return a string that the cookie with encoded data
  return [`session=${base64}`];

   // Would be something like this: session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkxTURGaVpqZzNOR1UxWkdSa09HVXdPRFZtTXpoa05DSXNJbVZ0WVdsc0lqb2laVzFoWkVCbmJXRnBiQzVqYjIwaUxDSnBZWFFpT2pFMk9UUTJNVFUyT1RaOS5tclNjWU94VHpxaXFXaTRpUU9zN0wyZjBoNjlUT2RRdzRNako0ZHZGNUtNIn0=
}