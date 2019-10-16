require("dotenv").config();
import "reflect-metadata";
import { createConnection } from "typeorm";
createConnection()
  .then(async connection => {
    await connection.dropDatabase();
    await connection.synchronize();
    console.log(new Date().toLocaleString(), "synchronized!");
  })
  .catch(error => console.log(new Date().toLocaleString(), error));
