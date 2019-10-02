export { Response } from "express";
import { Request as BaseRequest } from "express";

interface AuthUser {
  id: number;
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
}

interface Rate {
  rate: number;
}

interface Activity {
  from: number;
  packageName: string;
  to: number;
}

export interface Request extends BaseRequest {
  user: AuthUser;
}

export interface ActivitiesRequest extends Request {
  body: Activity[];
}

export interface RateRequest extends Request {
  body: Rate;
}
