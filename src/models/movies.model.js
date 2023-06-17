import { Schema, model } from "mongoose";

const moviesSchema = Schema(
  {
    title: {
      type: String,
      unique: [true,"title duplicaded"],
      require: true,
    },
    original_language: {
      type: String,
      require: true,
    },
    overview: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false, //para ocultar el __v en la bd
    timestamps: true,
  }
);

export default model("movie", moviesSchema);
