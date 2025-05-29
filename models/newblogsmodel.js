import mongoose from "mongoose";

const newblogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    Color: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("newblogs", newblogsSchema);