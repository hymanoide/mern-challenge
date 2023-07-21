/**
 * Exports environment variables from .env file.
 */

require('dotenv').config();

module.exports = {
    secretKey: process.env.JWT_SECRET_KEY,
};
