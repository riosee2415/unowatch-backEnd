import CollectionType from "../../../models/CollectionType";

export default {
  Query: {
    getCollectionType: async (_, args) => {
      try {
        const result = await CollectionType.find({ isDelete: false });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    createCollectionType: async (_, args) => {
      const { name } = args;

      try {
        const result = await CollectionType.create({
          name,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteCollectionType: async (_, args) => {
      const { id } = args;

      try {
        const result = await CollectionType.updateOne(
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
