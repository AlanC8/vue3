import { Router } from "express";
import router from "./habits";

const router_v1 = Router()

router_v1.use("/habits", router)

export default router_v1;