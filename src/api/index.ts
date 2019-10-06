import { Response, ActivitiesRequest, RateRequest } from "../utils/interceptor";
import ActivityService from "../services/ActivityService";
import RatingService from "../services/RatingService";

export default (app, connection) => {
  app.post("/activities", async (req: ActivitiesRequest, resp: Response) => {
    const response = await Promise.all(ActivityService.addActivites(req));
    resp.json(response);
  });

  app.post("/rate", async (req: RateRequest, resp: Response) => {
    const response = await RatingService.addRating(req);
    resp.json(response);
  });
};
