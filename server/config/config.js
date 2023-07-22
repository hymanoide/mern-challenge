/**
 * Exports environment variables from .env file.
 */

require('dotenv').config();

module.exports = {
    secretKey: process.env.JWT_SECRET_KEY,
    mongoDBConnectionString: process.env.MONGODB_CONNECTION_STRING,
    // Cloudinary
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};
