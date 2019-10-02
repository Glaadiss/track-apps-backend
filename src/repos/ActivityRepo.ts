import { getConnection } from "typeorm";
import { Activity } from "../entity/Activity";

async function save({ from, to, application, user }) {
  return getConnection()
    .createQueryBuilder()
    .insert()
    .into(Activity)
    .values({
      from: new Date(from),
      to: new Date(to),
      application,
      user
    })
    .execute()
    .catch(err => console.log("cant save activity", err));
}

export default {
  save
};
