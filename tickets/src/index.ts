import "express-async-errors";
import mongoose from "mongoose";
import app from "./app";
import { natsWrapper } from "./nats-wrapper";

const startDb = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  
  if (!process.env.NATS_URL) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb");
    
  } catch (err) {
    console.error(err);
  }
}

const port = 3000;

app.listen(port, () => {
  console.log(`Service listening on port ${port}!`);
});

startDb();
