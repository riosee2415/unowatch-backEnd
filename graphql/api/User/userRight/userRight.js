import mongoose from "mongoose";
import DefaultUserRight from "../../../models/DefaultUserRight";
import UserRight from "../../../models/UserRight";
import User from "../../../models/User";

export default {
  Query: {
    getUserRight: async (_, args) => {
      try {
        const result = await UserRight.find().sort({ sort: 1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getDefaultUserRight: async (_, args) => {
      try {
        const result = await DefaultUserRight.find().populate({
          path: `rightKey`,
          model: UserRight,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    modifyRight: async (_, args) => {
      const { id, rightName, isAdminLogin } = args;

      try {
        const result = await UserRight.updateOne(
          { _id: id },
          {
            rightName,
            isAdminLogin,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    rightSortChange: async (_, args) => {
      const { id, sort } = args;

      try {
        const result = await UserRight.updateOne(
          {
            _id: id,
          },
          {
            sort: parseInt(sort),
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteUserRight: async (_, args) => {
      const { id } = args;

      try {
        const result = await UserRight.deleteOne({ _id: id });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    createUserRight: async (_, args) => {
      const { rightName, isAdminLogin, sort } = args;

      try {
        const result = await UserRight.create({
          rightName,
          isAdminLogin,
          sort,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyDefaultUserRight: async (_, args) => {
      const { id, rightId } = args;

      try {
        const newId = mongoose.Types.ObjectId(rightId);

        const result = await DefaultUserRight.updateOne(
          { _id: id },
          {
            $set: {
              rightKey: newId,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyUserCurrentRight: async (_, args) => {
      const { userId, rightId } = args;

      try {
        const nextId = mongoose.Types.ObjectId(rightId);

        const result = await User.updateOne(
          { _id: userId },
          {
            $set: {
              right: nextId,
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
