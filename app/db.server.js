import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbconnection = () => {
  try {
    const dbURI = "mongodb://localhost:27017/profile-editor-app";
    mongoose.connect(dbURI);
    console.log("connection success");
  } catch (error) {
    console.log("connection error", error);
  }
};
