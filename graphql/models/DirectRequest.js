import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DirectRequest = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    memo: {
      type: String,
      required: true,
      default: "-",
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: String,
      required: true,
    },
    completedAt: {
      type: String,
      required: true,
      default: "-",
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`DirectRequest`, DirectRequest, `DirectRequest`);
