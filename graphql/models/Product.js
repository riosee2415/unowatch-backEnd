import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Teacher = new Schema(
  {
    thumbnailPath1: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    explain: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    modelCase: {
      type: String,
      required: true,
    },
    bezel: {
      type: String,
      required: true,
    },
    waterproof: {
      type: String,
      required: true,
    },
    movement: {
      type: String,
      required: true,
    },
    caliber: {
      type: String,
      required: true,
    },
    power: {
      type: String,
      required: true,
    },
    bracelet: {
      type: String,
      required: true,
    },
    dials: {
      type: String,
      required: true,
    },
    certification: {
      type: String,
      required: true,
    },
    thumbnailPath2: {
      type: String,
      required: true,
    },
    thumbnailPath3: {
      type: String,
      required: true,
    },
    thumbnailPath4: {
      type: String,
      required: true,
    },
    thumbnailPath5: {
      type: String,
      required: true,
    },
    thumbnailPath6: {
      type: String,
      required: true,
    },
    thumbnailPath7: {
      type: String,
      required: true,
    },
    title1: {
      type: String,
      required: true,
    },
    desc1: {
      type: String,
      required: true,
    },
    title2: {
      type: String,
      required: true,
    },
    desc2: {
      type: String,
      required: true,
    },
    title3: {
      type: String,
      required: true,
    },
    desc3: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    uTitle: {
      type: String,
      required: true,
    },
    isDelete: {
      type: String,
      required: true,
      default: false,
    },
    isFestive: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: String,
      required: true,
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `PFiles`,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`Teacher`, Teacher, `Teacher`);
