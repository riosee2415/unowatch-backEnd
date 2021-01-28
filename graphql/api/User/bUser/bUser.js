import BUser from "../../../models/BUser";
import { CURRENT_TIME, sendSecretMail } from "../../../../utils/commonUtils";
import UserRight from "../../../models/UserRight";

export default {
  Query: {
    getUserForId: async (_, args) => {
      const { id, password } = args;

      try {
        const result = await BUser.findOne({
          userId: id,
          userPassword: password,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },

    getBUsersByBlack: async (_, args) => {
      const { searchValue } = args;

      try {
        const result = await BUser.find({
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

    getBUsersByExit: async (_, args) => {
      const { searchValue } = args;

      try {
        const result = await BUser.find({
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

    requestSecretId: async (_, args) => {
      const { ownerName, bCode } = args;

      try {
        const result = await BUser.findOne({
          b_chief: ownerName,
          b_number: bCode,
        });

        return result;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    getAllBUser: async (_, args) => {
      const { searchName } = args;

      try {
        const result = await BUser.find({
          b_name: {
            $regex: `.*${searchName}.*`,
          },
        }).sort({ createdAt: -1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    exitBUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await BUser.updateOne(
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

    blackBUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await BUser.updateOne(
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

    cancelblackBUser: async (_, args) => {
      const { id } = args;

      try {
        const result = await BUser.updateOne(
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

    cancelExitBUser: async (_, args) => {
      const { id } = args;

      try {
        const result = await BUser.updateOne(
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
    requestSecretPw: async (_, args) => {
      const { userId, name, email } = args;

      let randomCode = "";
      for (let i = 0; i < 5; i++) {
        randomCode += Math.floor(Math.random() * 10);
      }

      try {
        const result = await BUser.updateOne(
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

      const user = await BUser.findOne({ email, username: name });

      if (user.secretCode === secret) {
        await BUser.updateOne(
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
        const result = await BUser.update(
          { userId },
          { userPassword: password }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyExitBUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await BUser.updateOne(
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
    modifyBlackBUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await BUser.updateOne(
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
    modifyAssignMentBUser: async (_, args) => {
      const { id } = args;

      try {
        const result = await BUser.updateOne(
          { _id: id },
          {
            $set: {
              b_asignment: true,
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
