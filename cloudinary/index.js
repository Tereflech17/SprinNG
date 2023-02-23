const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

// configure cloudinary
cloudinary.config({
    cloud_name: 'a11yrecruiter',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'sprinNG-profile-users',
    allowedFormats: ['jpeg', 'jpg', 'png'],
    filename: function (req, file, cb) {
        let buf = crypto.randomBytes(16);
        buf = buf.toString('hex');
  	    let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
  	    uniqFileName += buf;
        cb(undefined, uniqFileName );
    }
});

module.exports = {
    cloudinary,
    storage
}