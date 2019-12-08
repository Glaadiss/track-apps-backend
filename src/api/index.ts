import {
  Response,
  ActivitiesRequest,
  RateRequest,
  Request
} from "../utils/interceptor";
import ActivityService from "../services/ActivityService";
import RatingService from "../services/RatingService";
import UserService from "../services/UserService";

export default (app, connection) => {
  app.post("/activities", async (req: ActivitiesRequest, resp: Response) => {
    console.log(
      new Date().toLocaleString(),
      "/activites called by",
      req.user.email
    );

    if (await ActivityService.activitiesExist(req)) {
      resp.json({ message: "activies exist" });
      return;
    }

    const response = await Promise.all(ActivityService.addActivites(req));
    resp.json(response);
  });

  app.post("/rate", async (req: RateRequest, resp: Response) => {
    console.log(new Date().toLocaleString(), "/rate called by", req.user.email);
    const response = await RatingService.addRating(req);
    resp.json(response);
  });

  app.get("/report", async (req: Request, resp: Response) => {
    const response = await UserService.getReport(String(req.user.id));
    resp.json(response);
  });

  app.post("/report", async (req: Request, resp: Response) => {
    const response = await UserService.createReport(String(req.user.id));
    resp.json(response);
  });
};
