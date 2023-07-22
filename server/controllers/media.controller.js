/**
 * media.controller.js
 * @author Cesar Benítez [cesar.beni@gmail.com]
 */
const {attachImagePost} = require("./post.controller");

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
 *  Upload File to Cloudinary service
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
uploadFile = async (req, res) => {
    try {
        const data = Buffer.from(req.body.file.content, 'base64');

        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {upload_preset: 'ml_default'}, // Preset name in Cloudinary
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );

            uploadStream.write(data);
            uploadStream.end();
        });

        // Check and returns the image URL from Cloudinary to attach in the post also in database
        if (result.secure_url) {
            // Call attachImagePost and pass the postId and image URL
            const attachResult = await attachImagePost(req.body.file.cuid, result.secure_url);

            if (attachResult === "Image attached") {
                return res.json({imageUrl: result.secure_url});
            } else {
                return res.status(500).json({error: 'An error occurred attaching image url'});
            }
        } else {
            return res.status(500).json({error: 'An error occurred getting Cloudinary image url'});
        }
    } catch (error) {
        return res.status(500).json({error: 'An error occurred'});
    }
};


module.exports = {
    uploadFile
};
