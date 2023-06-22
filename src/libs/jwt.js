import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) =>{
    jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: "3600",
        },
        (err, token) => {
          if (err) reject(err)
          resolve(token)
        }
      );
  })
};
