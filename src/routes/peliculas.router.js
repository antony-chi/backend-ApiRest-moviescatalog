import { Router } from "express";
import {authReq} from "../middleware/validateToken.js"
import * as MoviesCtrl from "../controllers/peliculas.controller.js";

const router = Router();

router.get("/", authReq, MoviesCtrl.getMovies);
router.get("/moviuser", authReq, MoviesCtrl.getMoviesUser);
router.post("/", authReq, MoviesCtrl.createMovie);
router.put("/:id", MoviesCtrl.updateMovie);
router.delete("/delet/:id",authReq, MoviesCtrl.deleteMovie);
//router.delete("/deletOne/:id", authReq, MoviesCtrl.DeleteMovieId)

export default router;
