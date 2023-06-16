import express from "express";
const app = express();
import morgan from "morgan";

//---importamos routes -----
import MoviesRoouter from "./routes/peliculas.router.js"

//--global setting---
app.use(morgan("dev"))//    use morgan para ver las peticiones en consola
app.use(express.urlencoded({ extended: false}))//para usar urlencode que enviamos desd api client (portman)
app.use(express.json())//indicamos que use json que envian api client

//---usamos router-----
app.use("/api/", MoviesRoouter)

export default app;