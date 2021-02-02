import Product from "../../../models/Product";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import PFiles from "../../../models/PFiles";
import mongoose from "mongoose";

export default {
  Query: {
    getProduct: async (_, args) => {
      const { searchName } = args;

      try {
        const result = await Product.find({
          name: {
            $regex: `.*${searchName}.*`,
          },
        }).populate({
          model: PFiles,
          path: "files",
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductBySelection: async (_, args) => {
      try {
        const result = await Product.find({
          isFestive: "페스티브",
        }).populate({
          model: PFiles,
          path: "files",
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getOneProduct: async (_, args) => {
      const { id } = args;

      try {
        const result = await Product.findOne({ _id: id }).populate({
          model: PFiles,
          path: "files",
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
  },

  Mutation: {
    modifyProduct: async (_, args) => {
      const {
        id,
        thumbnailPath1,
        brand,
        name,
        explain,
        price,
        reference,
        modelCase,
        bezel,
        waterproof,
        movement,
        caliber,
        power,
        bracelet,
        dials,
        certification,
        thumbnailPath2,
        thumbnailPath3,
        thumbnailPath4,
        thumbnailPath5,
        thumbnailPath6,
        title1,
        desc1,
        title2,
        desc2,
        title3,
        desc3,
        content,
        uTitle,
        styleType,
        sizeType,
        materialType,
        dialType,
        collectionType,
        videoLink,
        isNew2020,
        isFestive,
        backgroundType,
      } = args;

      try {
        const result = await Product.updateOne(
          { _id: id },
          {
            $set: {
              thumbnailPath1,
              brand,
              name,
              explain,
              price,
              reference,
              modelCase,
              bezel,
              waterproof,
              movement,
              caliber,
              power,
              bracelet,
              dials,
              certification,
              thumbnailPath2,
              thumbnailPath3,
              thumbnailPath4,
              thumbnailPath5,
              thumbnailPath6,
              title1,
              desc1,
              title2,
              desc2,
              title3,
              desc3,
              content,
              uTitle,
              styleType,
              sizeType,
              materialType,
              dialType,
              collectionType,
              videoLink,
              isNew2020,
              isFestive,
              backgroundType,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteProduct: async (_, args) => {
      const { id } = args;

      try {
        const result = await Product.deleteOne({ _id: id });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    createProduct: async (_, args) => {
      const {
        thumbnailPath1,
        brand,
        name,
        explain,
        price,
        reference,
        modelCase,
        bezel,
        waterproof,
        movement,
        caliber,
        power,
        bracelet,
        dials,
        certification,
        innerImageList,
        thumbnailPath2,
        thumbnailPath3,
        thumbnailPath4,
        thumbnailPath5,
        thumbnailPath6,
        title1,
        desc1,
        title2,
        desc2,
        title3,
        desc3,
        content,
        uTitle,
        styleType,
        sizeType,
        materialType,
        dialType,
        collectionType,
        videoLink,
        isNew2020,
        isFestive,
        backgroundType,
      } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await Product.create({
          thumbnailPath1,
          brand,
          name,
          explain,
          price,
          reference,
          modelCase,
          bezel,
          waterproof,
          movement,
          caliber,
          power,
          bracelet,
          dials,
          certification,
          thumbnailPath2,
          thumbnailPath3,
          thumbnailPath4,
          thumbnailPath5,
          thumbnailPath6,
          title1,
          desc1,
          title2,
          desc2,
          title3,
          desc3,
          content,
          uTitle,
          styleType,
          sizeType,
          materialType,
          dialType,
          collectionType,
          videoLink,
          isNew2020,
          isFestive,
          backgroundType,
          createdAt: current,
          isDelete: false,
        });

        await Promise.all(
          innerImageList.map(async (data, idx) => {
            const innerResult = await PFiles.create({
              filePath: data,
              sort: idx + 1,
            });

            const saveId = mongoose.Types.ObjectId(innerResult._id);

            const product = await Product.findOne({ _id: result._id });

            if (product === null) {
              console.log("Error!");
              return;
            }

            product.files.push(saveId);
            product.save();
          })
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteImageProduct: async (_, args) => {
      const { pId, id } = args;

      try {
        const parent = await Product.findOne({ _id: pId });
        const seId = mongoose.Types.ObjectId(id);

        parent.files.remove(seId);
        parent.save();

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    modifyProductImage: async (_, args) => {
      const { id, innerImageList } = args;

      try {
        const currentProduct = await Product.findOne({
          _id: id,
        });

        await Promise.all(
          currentProduct.files.map(async (data) => {
            await PFiles.deleteOne({
              _id: data._id,
            });
          })
        );

        currentProduct.files = [];

        await Promise.all(
          innerImageList.map(async (data, idx) => {
            const result = await PFiles.create({
              filePath: data,
              sort: idx + 1,
            });

            currentProduct.files.push(result._id);
          })
        );
        currentProduct.save();

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    pushInnerImage: async (_, args) => {
      const { pid, path } = args;

      try {
        const parent = await Product.findOne({ _id: pid });

        const fileResult = await PFiles.create({
          filePath: path,
        });

        const obFileId = mongoose.Types.ObjectId(fileResult._id);

        parent.files.push(obFileId);
        parent.save();

        console.log(fileResult._id);
        console.log(path);

        return {
          _id: fileResult._id,
          filePath: path,
        };
      } catch (e) {
        console.log(e);

        return {
          _id: "none",
          filePath: "none",
        };
      }
    },

    sliceInnerImage: async (_, args) => {
      const { pid, fileId } = args;

      console.log(fileId);

      try {
        const parent = await Product.findOne({ _id: pid });

        let nextFiles;

        await Promise.all((nextFiles = parent.files.map((data) => data)));

        await Promise.all(
          (nextFiles = nextFiles.filter((data) => String(data) !== fileId))
        );

        await Product.updateOne(
          { _id: pid },
          {
            $set: {
              files: nextFiles,
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
