import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV, PORT } from "./env.js";
import app from '../index.js'

function connectToDB() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to database....");
      app.listen(PORT, () => {
        console.log(
          `App is running in ${NODE_ENV} mode at http://localhost:${PORT}`
        );
      });
    })
    .catch(() => {
      console.log("Failed to connect to database...");
    });
}
export default connectToDB;
