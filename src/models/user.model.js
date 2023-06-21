import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "insert your name"],
    },
    username: {
      type: String,
      require: [true, "insert your username"],
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: [true, "insert password"]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model("User", userSchema)