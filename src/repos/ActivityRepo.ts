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
    .catch(err =>
      console.log(new Date().toLocaleString(), "cant save activity", err)
    );
}

async function getLast({ userId }: { userId?: number }): Promise<Activity> {
  return getConnection()
    .getRepository(Activity)
    .createQueryBuilder("activity")
    .where("activity.userId = :userId", { userId })
    .orderBy("activity.to", "DESC")
    .getOne();
}

export default {
  getLast,
  save
};
