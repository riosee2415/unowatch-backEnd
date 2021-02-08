import Product from "../../../models/Product";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import PFiles from "../../../models/PFiles";
import StyleType from "../../../models/StyleType";
import SizeType from "../../../models/SizeType";
import MaterialType from "../../../models/MaterialType";
import DialType from "../../../models/DialType";
import CollectionType from "../../../models/CollectionType";
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
        })
          .populate({
            model: PFiles,
            path: "files",
          })
          .sort({ sort: 1, name: 1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    getProductAll: async (_, args) => {
      const {
        style,
        size,
        material,
        dial,
        collection,
        limit,
        currentPage,
      } = args;

      try {
        const result = await Product.find({})
          .populate({
            model: PFiles,
            path: "files",
          })
          .populate({
            model: StyleType,
            path: "styleType",
          })
          .populate({
            model: SizeType,
            path: "sizeType",
          })
          .populate({
            model: MaterialType,
            path: "materialType",
          })
          .populate({
            model: DialType,
            path: "dialType",
          })
          .populate({
            model: CollectionType,
            path: "collectionType",
          });

        const realResult = result.filter(
          (data) =>
            (style.length === 0 || style.indexOf(data.styleType.name) !== -1) &&
            (size.length === 0 || size.indexOf(data.sizeType.name) !== -1) &&
            (material.length === 0 ||
              material.indexOf(data.materialType.name) !== -1) &&
            (dial.length === 0 || dial.indexOf(data.dialType.name) !== -1) &&
            (collection === "-" || collection === data.collectionType.name)
        );

        return realResult.slice(
          currentPage * limit,
          currentPage * limit + limit
        );
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductAllTotalPage: async (_, args) => {
      const {
        style,
        size,
        material,
        dial,
        collection,
        limit,
        currentPage,
      } = args;

      try {
        const result = await Product.find()
          .populate({
            model: PFiles,
            path: "files",
          })
          .populate({
            model: StyleType,
            path: "styleType",
          })
          .populate({
            model: SizeType,
            path: "sizeType",
          })
          .populate({
            model: MaterialType,
            path: "materialType",
          })
          .populate({
            model: DialType,
            path: "dialType",
          })
          .populate({
            model: CollectionType,
            path: "collectionType",
          });

        const realResult = result.filter(
          (data) =>
            (style.length === 0 || style.indexOf(data.styleType.name) !== -1) &&
            (size.length === 0 || size.indexOf(data.sizeType.name) !== -1) &&
            (material.length === 0 ||
              material.indexOf(data.materialType.name) !== -1) &&
            (dial.length === 0 || dial.indexOf(data.dialType.name) !== -1) &&
            (collection === "-" || collection === data.collectionType.name)
        );

        const cnt = realResult.length;

        const realTotal = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

        return parseInt(realTotal);
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

    getProductBySort: async (_, args) => {
      try {
        const result = await Product.find({})
          .populate({
            model: PFiles,
            path: "files",
          })
          .sort({ sort: -1 })
          .limit(15);

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductByNew: async (_, args) => {
      try {
        const result = await Product.find({
          isNew2020: "신상",
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

    getProductDetail: async (_, args) => {
      const { id } = args;
      try {
        const result = await Product.findOne({
          _id: id,
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
        const result = await Product.findOne({ _id: id })
          .populate({
            model: PFiles,
            path: "files",
          })
          .populate({
            path: "styleType",
            model: StyleType,
          })
          .populate({
            path: "sizeType",
            model: SizeType,
          })
          .populate({
            path: "materialType",
            model: MaterialType,
          })
          .populate({
            path: "dialType",
            model: DialType,
          })
          .populate({
            path: "collectionType",
            model: CollectionType,
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
        backImg,
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
        code,
      } = args;

      try {
        const result = await Product.updateOne(
          { _id: id },
          {
            $set: {
              thumbnailPath1,
              brand,
              name,
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
              backImg,
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
              code,
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
        backImg,
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
        code,
        sort,
      } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await Product.create({
          thumbnailPath1,
          brand,
          name,
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
          backImg,
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
          code,
          createdAt: current,
          isDelete: false,
          sort,
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

    updateProductSort: async (_, args) => {
      const { id, sort } = args;

      try {
        const result = await Product.updateOne(
          { _id: id },
          {
            $set: {
              sort: parseInt(sort),
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
