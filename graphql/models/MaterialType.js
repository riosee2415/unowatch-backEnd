import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MaterialType = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`MaterialType`, MaterialType, `MaterialType`);
