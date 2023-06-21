import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const createUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if(!name || !username || !email || !password){
    res.status(400).json({menssage: "campos no complet (name, username, email, password)"})
  }

  const userFound = await User.findOne({ email: email });

  if (userFound) {
    res.status(404).json({ menssage: "email registered, try email different" });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = {
    name: name,
    username: username,
    email: email,
    password: passwordHash,
  };

  const userSave = await User(user).save();

  if(userSave){
      res.status(201).json({ id: userSave._id, name: userSave.name, username: userSave.email });
  }else{
    res.status(400).json({menssage: "failed, user not created "})
  }
});
