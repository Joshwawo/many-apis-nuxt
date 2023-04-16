import { Schema, model,models } from "mongoose";

import { Blog } from "../types/blog";

const BlogSchema = new Schema<Blog>(
  {
    title: {
      type: String,
      default: "No title",
    },
    descripcion: {
      type: String,
      default: 'No Description'
    },
    tech: {
      type: String,
    },
    image: {
      url: String,
      public_id: String,
    },
    github: {
      type: String,
    },
    proyectUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Blog", BlogSchema);

