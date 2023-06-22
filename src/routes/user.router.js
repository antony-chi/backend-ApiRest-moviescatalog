import { Router } from "express";
import * as userCrtl from "../controllers/user.controller.js";

const router = Router();

router.post("/create", userCrtl.createUser);
router.post("/login",userCrtl.login)
router.post("/logout", userCrtl.logout)

export default router;
