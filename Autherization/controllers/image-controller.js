const Image = require('../model/image'); // Model ka sahi naam
const { uploadToCloudinary } = require('../Helper/cloudinary-helper');
const fs = require('fs');
const path = require('path');

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload a file."
      });
    }

    // ✅ Cloudinary pe upload
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // ✅ Database save
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId
    });
    await newlyUploadedImage.save();

    // ✅ Local file delete after upload
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again"
    });
  }
};

const fetchImageController = async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = 10;
    // const skip = (page - 1) * limit;

    // const totalImages = await Image.countDocuments();
    // const images = await Image.find()
    //   .skip(skip)
    //   .limit(limit)
    //   .sort({ createdAt: -1 });

    // const totalPages = Math.ceil(totalImages / limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalImages,
      data: images
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again"
    });
  }
};

    module.exports = {uploadImageController,fetchImageController};
