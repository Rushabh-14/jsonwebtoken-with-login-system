const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const avatar_path = path.join('/upload/images');

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }
});

const userstorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'..',avatar_path))
    },
    filename : (req,file,cb) => {
        cb(null,file.fieldname + '-' + Date.now());
    }
})

let avatar = multer({storage : userstorage,}).single('avatar');

adminSchema.statics.uploadimg = avatar;
adminSchema.statics.avatar_path = avatar_path;

const admin = mongoose.model('Finalapis',adminSchema);
module.exports = admin;