import "express-async-errors";
import mongoose from "mongoose";
import app from "./app";

const startDb = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  
  try {
    await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`);
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
