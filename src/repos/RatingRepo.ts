import { getConnection } from "typeorm";
import { Rating } from "../entity/Rating";

async function save({ rating, user }) {
  return getConnection()
    .createQueryBuilder()
    .insert()
    .into(Rating)
    .values({
      rating,
      user,
      date: new Date()
    })
    .execute()
    .catch(err => console.log("cant save Rating", err));
}

export default {
  save
};
