import BackgroundType from "../../../models/BackgroundType";

export default {
  Query: {
    getBackgroundType: async (_, args) => {
      try {
        const result = await BackgroundType.find({ isDelete: false });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    createBackgroundType: async (_, args) => {
      const { name, imagePath } = args;

      try {
        const result = await BackgroundType.create({
          name,
          imagePath,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteBackgroundType: async (_, args) => {
      const { id } = args;

      try {
        const result = await BackgroundType.updateOne(
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
