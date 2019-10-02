import ApplicationRepo from "../repos/ApplicationRepo";
import ActivityRepo from "../repos/ActivityRepo";
import * as R from "ramda";

const hourInMs = 1000 * 60 * 60;

const rejectWrongActivites = R.reject(
  R.compose(
    R.lt(hourInMs),
    Math.abs,
    R.apply(R.subtract),
    R.props(["to", "from"])
  )
);

const joinUser = req => R.mergeRight({ user: req.user.id });

const addActivity = async ({ from, to, packageName, user }) => {
  const { id: application } = await ApplicationRepo.saveAndGetOne(packageName);
  return ActivityRepo.save({ from, to, application, user });
};

const addActivites = req =>
  R.compose(
    R.map(addActivity),
    R.map(joinUser(req)),
    rejectWrongActivites
  )(req.body);

export default {
  addActivites
};
