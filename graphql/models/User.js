import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userPassword: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    zoneCode: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    detailAddress: {
      type: String,
      required: true,
    },

    tel: {
      type: String,
      required: true,
      default: "-",
    },

    mobile: {
      type: String,
      required: true,
      default: "-",
    },

    email: {
      type: String,
      required: true,
      default: "-",
    },

    createdAt: {
      type: String,
      required: true,
    },

    updatedAt: {
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

    isExit: {
      type: Boolean,
      required: true,
      default: false,
    },

    exitedAt: {
      type: String,
      required: true,
      default: "-",
    },

    secretCode: {
      type: String,
      required: false,
      default: "-",
    },

    isBlack: {
      type: Boolean,
      required: true,
      default: false,
    },

    blackAt: {
      type: String,
      required: true,
      default: "-",
    },
    right: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `UserRight`,
    },
    isAgreement1: {
      type: Boolean,
      required: true,
      default: false,
    },

    isAgreement2: {
      type: Boolean,
      required: true,
      default: false,
    },

    isAgreement3: {
      type: Boolean,
      required: true,
      default: false,
    },

    isAgreement4: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`User`, User, `User`);
