require("dotenv").config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import api from "./api";
import { OAuth2Client } from "google-auth-library";
import { Request } from "./utils/interceptor";
import UserRepo from "./repos/UserRepo";
import * as path from "path";
import ApplicationRepo from "./repos/ApplicationRepo";

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const app = express();

app.use(express.json());
app.use(authentication);

createConnection()
  .then(async connection => {
    await connection.synchronize();
    app.listen(3000);
    api(app, connection);
    console.log(new Date().toLocaleString(), "Api is running!");
  })
  .catch(error => console.log(new Date().toLocaleString(), error));

function authentication(
  req: Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.url.includes("/test")) {
    ApplicationRepo.getAll()
      .then(result => res.json(result))
      .catch(err => res.json(err));
    return;
  }
  verify(req.headers.authorization)
    .then(assignUser(req))
    .then(tryToSaveUser)
    .then(next)
    .catch(err => {
      console.log(new Date().toLocaleString(), "not authenticated", err);
      res.json({
        message: "not authenticated with header" + req.headers.authorization
      });
    });
}

function assignUser(req: Request) {
  return payload => {
    req.user = payload;
    return req;
  };
}

async function tryToSaveUser(req: Request) {
  const { email } = req.user;
  const { id } = await UserRepo.saveAndGetOne(email);
  req.user.id = id;
  return;
}

async function verify(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID
  });
  return ticket.getPayload();
}
