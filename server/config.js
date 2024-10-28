const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

const app = express();

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'di7aei0j7',
  api_key: '351897992798256',
  api_secret: 'i-m3W5WCfwUgVNlRmSyhRHZXBDs'
});

// Multer setup
const storage = multer.memoryStorage();

const handleImageUpload=async (file)=>{
    const result=await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })

    return result;
}
const upload = multer({ storage: storage });

module.exports={upload,handleImageUpload}