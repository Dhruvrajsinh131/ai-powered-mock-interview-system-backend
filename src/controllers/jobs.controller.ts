import { CustomRequest } from "../types";
import { Response } from "express";
import jobsModel, { JobSchema } from "../models/jobs.model";

export const getJobs = async (req: CustomRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const jobsData: JobSchema[] = await jobsModel
    .find()
    .skip(skip)
    .limit(10)
    .lean();

  const total = await jobsModel.countDocuments();
  const isNext = total > page * limit;

  let jobs = [];

  for (const job of jobsData) {
    const { provider_id, ...rest } = job;
    jobs.push(rest);
  }

  res.json({
    success: true,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    isNext,
    data: jobs,
    message: "Jobs Inserted successfully",
  });

  return;
};
