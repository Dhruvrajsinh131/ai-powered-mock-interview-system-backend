import axios, { Axios } from "axios";
import { CustomRequest } from "../types";
import { Response } from "express";
import { fetchAndStoreJobs } from "../services/jobs.service";

export const getJobs = async (req: CustomRequest, res: Response) => {
  await fetchAndStoreJobs();
  res.json({
    success: true,
    message: "Jobs Inserted successfully",
  });

  return;
};
