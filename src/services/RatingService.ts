import RatingRepo from "../repos/RatingRepo";

const addRating = async req => {
  const {
    body: { rating },
    user
  } = req;
  return RatingRepo.save({ rating, user });
};

export default {
  addRating
};
