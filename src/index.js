import { config } from "dotenv";
config()
import app from "./app.js";

const port = process.env.PORT //variable de entorno asignamos el puerto

//puerto escuha del servidor
app.listen(port)
console.log("server listen port ", port)
