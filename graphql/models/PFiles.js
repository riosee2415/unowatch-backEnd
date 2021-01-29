import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PFiles = new Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`PFiles`, PFiles, `PFiles`);
