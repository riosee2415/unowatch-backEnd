import DialType from "../../../models/DialType";

export default {
  Query: {
    getDialType: async (_, args) => {
      try {
        const result = await DialType.find({ isDelete: false });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    createDialType: async (_, args) => {
      const { name } = args;

      try {
        const result = await DialType.create({
          name,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteDialType: async (_, args) => {
      const { id } = args;

      try {
        const result = await DialType.updateOne(
          { _id: id },
          {
            $set: {
              isDelete: true,
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
