import UserRepo from "../repos/UserRepo";
import { Request } from "../utils/interceptor";
import axios from "axios";

const getReport = async (id: string) => {
  const user = await UserRepo.getOne({ id });
  return user.report;
};

const createReport = async (id: string) => {
  try {
    const { data: report } = await axios.get(
      `http://127.0.0.1:5000/report?id=${id}`
    );
    const result = await UserRepo.addReport({ id, report });
    return report;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getReport,
  createReport
};
