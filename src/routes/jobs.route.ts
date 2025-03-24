import { Router } from "express";
import { getJobs } from "../controllers/jobs.controller";
import { auth } from "../middlewares/auth";

const jobsRoutes = Router();

jobsRoutes.get("/", auth, getJobs);

export default jobsRoutes;
