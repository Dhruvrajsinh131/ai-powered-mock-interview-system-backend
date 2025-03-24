import axios, { Axios } from "axios";
import { CustomRequest } from "../types";
import { Response } from "express";
import { fetchAndStoreJobs } from "../services/jobs.service";
import jobsModel, { JobSchema } from "../models/jobs.model";

export const getJobs = async (req: CustomRequest, res: Response) => {
  const jobsData: JobSchema[] = await jobsModel.find();

  let jobs = [];

  for (const job of jobsData) {
    console.log("job", job);

    const { provider_id, ...rest } = job;

    jobs.push(rest);
  }
  res.json({
    success: true,
    data: jobs,
    message: "Jobs Inserted successfully",
  });

  return;
};
