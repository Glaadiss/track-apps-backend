import { Response, ActivitiesRequest, RateRequest } from "../utils/interceptor";
import ActivityService from "../services/ActivityService";
import RatingService from "../services/RatingService";

export default (app, connection) => {
  app.post("/activities", async (req: ActivitiesRequest, resp: Response) => {
    console.log(
      new Date().toLocaleString(),
      "/activites called by",
      req.user.email
    );
    const response = await Promise.all(ActivityService.addActivites(req));
    resp.json(response);
  });

  app.post("/rate", async (req: RateRequest, resp: Response) => {
    console.log(new Date().toLocaleString(), "/rate called by", req.user.email);
    const response = await RatingService.addRating(req);
    resp.json(response);
  });
};
