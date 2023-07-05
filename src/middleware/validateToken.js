import jwt from "jsonwebtoken"
import {config} from "dotenv"
config()

export const authReq = (req, res, next) => {
    const {token} = req.cookies
    //validae que recibe el token
    if(!token) return res.status(401).json({menssage:"No token provided"})

    const decode = jwt.verify(token, process.env.SECRET)

    if(!decode){
        res.status(401).json({menssage: "invalid token"})
    }
    req.user = decode.id
    
    next()
}