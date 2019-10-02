require("dotenv").config();
import "reflect-metadata";
import { createConnection } from "typeorm";
createConnection()
  .then(async connection => {
    await connection.dropDatabase();
    await connection.synchronize();
    console.log("synchronized!");
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.email = "bartekgladys@gmail.com";
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    // console.log("Loading users from the database...");
    // console.log("Loaded users: ", users);
    // console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch(error => console.log(error));
