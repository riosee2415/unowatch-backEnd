import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventBoard = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    eventTerm: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: String,
      required: true,
      default: "-",
    },
    hit: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`EventBoard`, EventBoard, `EventBoard`);
