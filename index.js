import express from "express";
import { initializeDB } from "./data/database.js";
import novenyRoutes from "./routes/novenyek.js";
import cors from "cors";

let app = express();

app.use(express.json());
app.use(cors());
app.use("/plants", novenyRoutes);

const startServer = async () => {
  await initializeDB();
  app.listen(3000, () => {
    console.log("Server listening on: localhost/3000");
  });
};

startServer();
