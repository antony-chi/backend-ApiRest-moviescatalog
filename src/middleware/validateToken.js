import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

export const authReq = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  let tokenBearer;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      tokenBearer = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(tokenBearer, process.env.SECRET);

      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log("ocurrio un error token baearer", error);
    }
  } else {
    console.log("no token bearer, check cookie token");
    //validae que recibe el token por cookies
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.SECRET);
        if (decode) {
          req.user = await User.findById(decode.id).select("-password");
          next();
        } else {
          res.status(401).json({ menssage: "invalid token" });
        }
      } catch (error) {
        console.log("no token provider");
        res.status(401).json({ menssage: "no token provider" });
      }
    }else{
        res.json("no token cookie")
    }
  }
  //req.user = decode.id
});
