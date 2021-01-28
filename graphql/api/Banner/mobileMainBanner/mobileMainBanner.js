import MobileMainBanner from "../../../models/MobileMainBanner";

export default {
  Query: {
    getMobileMainBanner: async (_, args) => {
      try {
        const result = await MobileMainBanner.find().sort({ sort: 1 });

        return result;
      } catch (e) {
        return [];
      }
    },
  },

  Mutation: {
    modifyMobileMainBanner: async (_, args) => {
      const { id, title, content, link } = args;

      try {
        const newContent = content.replace(/\n/g, "<br />");

        const result = await MobileMainBanner.update(
          { _id: id },
          { title, content: newContent, link }
        );

        return true;
      } catch (e) {
        return false;
      }
    },

    modifyMobileMainBannerImagePath: async (_, args) => {
      const { id, imagePath } = args;

      try {
        const result = await MobileMainBanner.update(
          { _id: id },
          { imagePath }
        );

        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
