import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
// import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

// dotenv.config();
// const { DB_HOST, PORT = 3000 } = process.env;

// mongoose.set("strictQuery", true);
// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running. Use our API on port: ${PORT}`);
//     });
//     console.log("Database connection successful");
//   })
//   .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
//   });

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
