import express from "express";
const app = express();
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser";

//---importamos routes -----
import MoviesRoouter from "./routes/peliculas.router.js";
import userRouter from "./routes/user.router.js";

//--global setting---
app.use(morgan("dev"));
app.use(cors())
//    use morgan para ver las peticiones en consola
app.use(express.urlencoded({ extended: false })); //para usar urlencode que enviamos desd api client (portman)
app.use(express.json()); //indicamos que use json que envian api client
app.use(cookieParser()); //para usar cookie de los headers

//---usamos router-----
app.use("/api/movie", MoviesRoouter);
app.use("/api/user", userRouter);

export default app;
