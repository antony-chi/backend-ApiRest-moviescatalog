import { Schema, model } from "mongoose";

const moviesSchema = Schema(
  {
    title: {
      type: String,
      require: true,
    },
    originalLanguage: {
      type: String,
      require: true,
    },
    overview: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("movie", moviesSchema);
