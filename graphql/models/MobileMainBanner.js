import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MobileMainBanner = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    imagePath: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
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

export default mongoose.model(
  `MobileMainBanner`,
  MobileMainBanner,
  `MobileMainBanner`
);
