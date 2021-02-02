import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BackgroundType = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imagePath: {
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

export default mongoose.model(
  `BackgroundType`,
  BackgroundType,
  `BackgroundType`
);
