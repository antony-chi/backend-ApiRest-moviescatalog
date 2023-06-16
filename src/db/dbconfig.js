import { connect } from "mongoose";
import {config} from "dotenv"
config()


export const dbconect = async () => {
    try {
        const DB_URI = process.env.MONGO_URI
        const dbcon = await connect(DB_URI)
        console.log("coneted to ", dbcon.connection.host)
        
    } catch (error) {
        console.error("Error not conenecct to BD: ")
    }
}
///---continuar con la conexion a la base
