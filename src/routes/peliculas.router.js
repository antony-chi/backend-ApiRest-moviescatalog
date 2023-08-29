import { Router } from "express";
import {authReq} from "../middleware/validateToken.js"
import * as MoviesCtrl from "../controllers/peliculas.controller.js";

const router = Router();

router.get("/", authReq, MoviesCtrl.getMovies);
router.get("/moviuser", authReq, MoviesCtrl.getMoviesUser);
router.get("/like",authReq, MoviesCtrl.getMoviesLike)
router.post("/create/", authReq, MoviesCtrl.createMovie);
router.put("/id/:id", authReq, MoviesCtrl.updateMovie);
router.delete("/delet/:id",authReq, MoviesCtrl.deleteMovie);
//router.delete("/deletOne/:id", authReq, MoviesCtrl.DeleteMovieId)

export default router;
