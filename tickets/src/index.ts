import "express-async-errors";
import mongoose from "mongoose";
import app from "./app";

const startDb = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  
  try {
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
