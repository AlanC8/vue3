import { Router } from 'express';
import router_v1 from "./routers/index"

const globalRouter = Router();

globalRouter.use("/api/v1/", router_v1);

export default globalRouter;
