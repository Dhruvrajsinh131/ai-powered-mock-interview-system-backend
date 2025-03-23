import { Router } from "express";
import userRoutes from "./user.route";
import { auth } from "../middlewares/auth";
import jobsRoutes from "./jobs.route";

const routerFactory = Router();

routerFactory.use("/user", userRoutes);
routerFactory.use("/jobs", auth, jobsRoutes);

export default routerFactory;
