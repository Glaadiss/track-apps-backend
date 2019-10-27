import ApplicationRepo from "../repos/ApplicationRepo";
import ActivityRepo from "../repos/ActivityRepo";
import * as R from "ramda";
import { ActivitiesRequest } from "../utils/interceptor";
import { Activity } from "../entity/Activity";

const dayInMs = 24 * 1000 * 60 * 60;

const isWrongActivity = ({ from, to }) => Math.abs(to - from) > dayInMs;

const activitiesExist = async (req: ActivitiesRequest) => {
  const first = req.body[0];
  if (!first) return false;

  const last: Activity = await ActivityRepo.getLast({ userId: req.user.id });
  return last ? Number(last.to) >= first.to : false;
};

const joinUser = req => R.mergeRight({ user: req.user.id });

const addActivity = async ({ from, to, packageName, user }) => {
  const { id: application } = await ApplicationRepo.saveAndGetOne(packageName);
  return ActivityRepo.save({ from, to, application, user });
};

const addActivites = req =>
  R.compose(
    R.map(addActivity),
    R.map(joinUser(req)),
    R.reject(isWrongActivity)
  )(req.body);

export default {
  activitiesExist,
  addActivites
};
