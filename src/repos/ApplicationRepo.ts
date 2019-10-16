import { getConnection } from "typeorm";
import * as R from "ramda";
import { asyncTap } from "../utils";
import { Application } from "../entity/Application";

async function save(name) {
  const application = {
    name
  };

  return getConnection()
    .createQueryBuilder()
    .insert()
    .into(Application)
    .values(application)
    .onConflict(`("name") DO NOTHING`)
    .execute()
    .catch(err =>
      console.log(new Date().toLocaleString(), "cant save application", err)
    );
}

async function getOne({ id, name }: { id?: string; name?: string }) {
  return getConnection()
    .getRepository(Application)
    .createQueryBuilder("application")
    .where("application.id = :id", { id })
    .orWhere("application.name = :name", { name })
    .getOne()
    .catch(err =>
      console.log(new Date().toLocaleString(), "cant get application", err)
    );
}

async function getAll() {
  return getConnection()
    .getRepository(Application)
    .find()
    .catch(err =>
      console.log(new Date().toLocaleString(), "cant get applications", err)
    );
}

const saveAndGetOne = R.composeWith(R.then, [
  getOne,
  R.objOf("name"),
  asyncTap(save)
]);

export default {
  save,
  getOne,
  saveAndGetOne,
  getAll
};
