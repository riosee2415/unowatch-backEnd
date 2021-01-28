import MaterialType from "../../../models/MaterialType";

export default {
  Query: {
    getMaterialType: async (_, args) => {
      try {
        const result = await MaterialType.find({ isDelete: false });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    createMaterialType: async (_, args) => {
      const { name } = args;

      try {
        const result = await MaterialType.create({
          name,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteMaterialType: async (_, args) => {
      const { id } = args;

      try {
        const result = await MaterialType.updateOne(
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
