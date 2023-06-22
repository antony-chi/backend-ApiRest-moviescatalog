import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcrypt";

export const createUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res
      .status(400)
      .json({
        menssage: "campos no complet (name, username, email, password)",
      });
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

  if (userSave) {
    const token = await createAccessToken({ id: userSave._id });
    res.cookie("token", token);
    res.status(201).json({ username: userSave.username, token: token });
  } else {
    res.status(400).json({ menssage: "failed, user not created " });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email: email });

  if (!userFound) {
    res.status(404).json({ menssage: "user not found" });
  }

  const isMatch = await bcrypt.compare(password, userFound.password);
  console.log(isMatch)

  if (!isMatch) {
    res.status(400).json({ menssage: "Incorrect password" });
  }

  const token = await createAccessToken({ id: userFound._id });

  res.cookie("token", token);
  res.json({ username: userFound.username, token: token });
});

export const logout = (req, res) => {
  res.cookie("token", "",{
    expires: new Date(0)
  })
  res.status(200).json("logout")
}
