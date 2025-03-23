import { Router } from "express";
import { getJobs } from "../controllers/jobs.controller";

const jobsRoutes = Router();

jobsRoutes.get("/", getJobs);

export default jobsRoutes;
