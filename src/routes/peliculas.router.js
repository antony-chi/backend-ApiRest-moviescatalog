import { Router } from "express";
import * as MoviesCtrl from "../controllers/peliculas.controller.js"

const router = Router();

router.get("/", MoviesCtrl.getMovies)
router.post("/", MoviesCtrl.createMovie)
router.put("/", MoviesCtrl.updateMovie)

export default router;