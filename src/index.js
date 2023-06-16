import app from "./app.js";
import { config } from "dotenv";
import {dbconect} from "./db/dbconfig.js";

config()
const port = process.env.PORT || 3000 //variable de entorno asignamos el puerto
dbconect()

//puerto escuha del servidor
app.listen(port)
console.log("server listen port ", port)
