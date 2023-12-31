import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const moviesSchema = Schema(
  {
    title: {
      type: String,
      unique: [true,"title duplicaded"],
      require: true,
      trim: true
    },
    original_language: {
      type: String,
      require: true,
      default: "es",
    },
    overview: {
      type: String,
      require: true,
      trim: true
    },
    like: {
      type: Boolean,
      default: false
    }, user:{
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    versionKey: false, //para ocultar el __v en la bd
    timestamps: true,
  }
);
moviesSchema.plugin(mongoosePaginate)
export default model("movie", moviesSchema);
