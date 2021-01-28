import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DefaultUserRight = new Schema(
  {
    rightKey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `UserRight`,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(
  `DefaultUserRight`,
  DefaultUserRight,
  `DefaultUserRight`
);
