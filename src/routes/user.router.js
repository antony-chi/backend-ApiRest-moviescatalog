import { Router } from "express";
import * as userCrtl from "../controllers/user.controller.js";

const router = Router();

router.post("/create", userCrtl.createUser);

export default router;
