import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PFiles = new Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    sort: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`PFiles`, PFiles, `PFiles`);
