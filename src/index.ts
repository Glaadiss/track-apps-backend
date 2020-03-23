require("dotenv").config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import api from "./api";
import test from "./test";
import { OAuth2Client } from "google-auth-library";
import { Request } from "./utils/interceptor";
import UserRepo from "./repos/UserRepo";
import * as path from "path";
import ApplicationRepo from "./repos/ApplicationRepo";

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const app = express();

app.use(express.json());
test(app);
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
  // const ticket = await client.verifyIdToken({
  //   idToken,
  //   audience: [
  //     CLIENT_ID,
  //     "607978466940-b45aqagc08brdm3rl2lnhegrut6sglpn.apps.googleusercontent.com"
  //   ]
  // });
  // return ticket.getPayload();
  return parseJwt(idToken);
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    new Buffer(base64, "base64")
      .toString("binary")
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
