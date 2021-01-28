import { CURRENT_TIME } from "../../../../utils/commonUtils";
import DirectRequest from "../../../models/DirectRequest";

export default {
  Query: {
    getDirectRequest: async (_, args) => {
      const { isComplete } = args;

      try {
        const result = await DirectRequest.find({ isComplete }).sort({
          createdAt: 1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    modifyDirectRequestComplete: async (_, args) => {
      const { id, memo } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await DirectRequest.updateOne(
          { _id: id },
          {
            memo,
            isComplete: true,
            completedAt: current,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    createDirectRequest: async (_, args) => {
      const { name, mobile, email, description } = args;

      try {
        const createdAt = await CURRENT_TIME();
        const result = await DirectRequest.create({
          name,
          mobile,
          email,
          description,
          createdAt,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
