// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dtqchgmqk', // Reemplaza con tu Cloud Name
  api_key: '124285347397634',       // Reemplaza con tu API Key
  api_secret: '34vwrZlZGaCaFcI_oywhMul3WKw'  // Reemplaza con tu API Secret
});

module.exports = cloudinary;
