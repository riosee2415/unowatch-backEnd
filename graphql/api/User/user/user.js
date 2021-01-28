import User from "../../../models/User";
import UserRight from "../../../models/UserRight";
import { CURRENT_TIME, sendSecretMail } from "../../../../utils/commonUtils";
import crypto from "crypto";

export default {
  Query: {
    getUserLoginResultForAdmin: async (_, args) => {
      const { userId, userPassword } = args;

      try {
        let cipher = crypto.createHash("sha512");

        cipher.update(userPassword);
        const encPassword = cipher.digest("hex");

        const result = await User.find({
          userId,
          userPassword: encPassword,
        }).populate({
          path: `right`,
          model: UserRight,
        });

        return result.length > 0 && result[0].right.isAdminLogin;
      } catch (e) {
        console.log(e);
        return null;
      }
    },

    getUserForId: async (_, args) => {
      const { id, password } = args;

      try {
        const result = await User.findOne({
          userId: id,
          userPassword: password,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },

    getUsersByBlack: async (_, args) => {
      const { searchValue } = args;

      try {
        const result = await User.find({
          username: {
            $regex: `.*${searchValue}.*`,
          },
          isBlack: true,
        }).sort({ createdAt: -1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getUsersByExit: async (_, args) => {
      const { searchValue } = args;

      try {
        const result = await User.find({
          username: {
            $regex: `.*${searchValue}.*`,
          },
          isExit: true,
        }).sort({ createdAt: -1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getAllUser: async (_, args) => {
      const { searchName } = args;

      try {
        const result = await User.find({
          username: {
            $regex: `.*${searchName}.*`,
          },
        })
          .populate({
            path: `right`,
            model: UserRight,
          })
          .sort({ createdAt: -1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    exitUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await User.updateOne(
          { _id: id },
          {
            isExit: true,
            exitAt: current,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    blackUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await User.updateOne(
          { _id: id },
          {
            isBlack: true,
            blackAt: current,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    cancelblackUser: async (_, args) => {
      const { id } = args;

      try {
        const result = await User.updateOne(
          { _id: id },
          {
            blackAt: "",
            isBlack: false,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    cancelExitUser: async (_, args) => {
      const { id } = args;

      try {
        const result = await User.updateOne(
          { _id: id },
          {
            exitAt: "",
            isExit: false,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    requestSecretId: async (_, args) => {
      const { name, email } = args;

      let randomCode = "";
      for (let i = 0; i < 5; i++) {
        randomCode += Math.floor(Math.random() * 10);
      }

      try {
        const result = await User.updateOne(
          {
            username: name,
            email,
          },
          {
            secretCode: randomCode,
          }
        );

        await sendSecretMail(email, randomCode);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    requestSecretPw: async (_, args) => {
      const { userId, name, email } = args;

      let randomCode = "";
      for (let i = 0; i < 5; i++) {
        randomCode += Math.floor(Math.random() * 10);
      }

      try {
        const result = await User.updateOne(
          {
            userId,
            username: name,
            email,
          },
          {
            secretCode: randomCode,
          }
        );

        await sendSecretMail(email, randomCode);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    confirmSecret: async (_, args) => {
      const { secret, email, name } = args;

      const user = await User.findOne({ email, username: name });

      if (user.secretCode === secret) {
        await User.updateOne(
          {
            username: name,
            email,
          },
          {
            secretCode: "",
          }
        );

        return user.userId;
      } else {
        throw Error("Wrong Email Sercet Conbination");
      }
    },

    updateUserPassword: async (_, args) => {
      const { password, userId } = args;

      try {
        const result = await User.update(
          { userId },
          { userPassword: password }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyExitUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await User.updateOne(
          { _id: id },
          {
            $set: {
              isExit: true,
              exitedAt: current,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    modifyBlackUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await User.updateOne(
          { _id: id },
          {
            $set: {
              isBlack: true,
              blackAt: current,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
