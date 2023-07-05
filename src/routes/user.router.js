import { Router } from "express";
import * as userCrtl from "../controllers/user.controller.js";
import { authReq } from "../middleware/validateToken.js";

const router = Router();

router.post("/create", userCrtl.createUser);
router.post("/login",userCrtl.login)
router.post("/logout", userCrtl.logout)
router.get("/myprofile",authReq, userCrtl.myprofile)

export default router;
