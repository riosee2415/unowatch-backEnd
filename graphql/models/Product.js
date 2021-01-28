import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Teacher = new Schema(
  {
    thumbnailPath: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`Teacher`, Teacher, `Teacher`);
