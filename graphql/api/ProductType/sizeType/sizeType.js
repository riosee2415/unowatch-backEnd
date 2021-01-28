import SizeType from "../../../models/SizeType";

export default {
  Query: {
    getSizeType: async (_, args) => {
      try {
        const result = await SizeType.find({ isDelete: false });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    createSizeType: async (_, args) => {
      const { name } = args;

      try {
        const result = await SizeType.create({
          name,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteSizeType: async (_, args) => {
      const { id } = args;

      try {
        const result = await SizeType.updateOne(
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
