import { getConnection } from "typeorm";
import { User } from "../entity/User";
import * as R from "ramda";
import { asyncTap } from "../utils";

async function save(email) {
  const user = {
    email,
    created: new Date()
  };
  return getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(user)
    .onConflict(`("email") DO NOTHING`)
    .execute()
    .catch(err => console.log("cant save user", err));
}

async function getOne({ id, email }: { id?: string; email?: string }) {
  return getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id })
    .orWhere("user.email = :email", { email })
    .getOne();
}

const saveAndGetOne = R.composeWith(R.then, [
  getOne,
  R.objOf("email"),
  asyncTap(save)
]);

export default {
  save,
  getOne,
  saveAndGetOne
};
