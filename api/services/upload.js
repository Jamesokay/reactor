const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const dotenv = require('dotenv')

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_HOST,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
  
  const storage = new CloudinaryStorage({

    cloudinary: cloudinary,
    folder: 'user-images',
    allowedFormats: ['jpg', 'png', 'jpeg']
    // params: {
    //   folder: 'user-images',
    //   format: async () => 'png',
    //   public_id: (req, file) => file.filename
    // }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload