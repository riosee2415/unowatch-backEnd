import StyleType from "../../../models/StyleType";

export default {
  Query: {
    getStyleType: async (_, args) => {
      try {
        const result = await StyleType.find({ isDelete: false });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    createStyleType: async (_, args) => {
      const { name } = args;

      try {
        const result = await StyleType.create({
          name,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteStyleType: async (_, args) => {
      const { id } = args;

      try {
        const result = await StyleType.updateOne(
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
