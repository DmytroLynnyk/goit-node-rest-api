import { connect } from "mongoose";

const { DB_HOST } = process.env;

export const connectDB = async () => {
  try {
    await connect(DB_HOST);
    console.log("Database connection successful");
  } catch (err) {
    console.log(err);
  }
};
