import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserRight = new Schema(
  {
    rightName: {
      type: String,
      required: true,
    },
    isAdminLogin: {
      type: Boolean,
      required: true,
      default: false,
    },
    sort: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`UserRight`, UserRight, `UserRight`);
