const admin = require('../models/adminmodel');

const jwtData = require('jsonwebtoken');

const fs = require('fs');

const path = require('path');

module.exports.register = (req,res) => {
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    admin.uploadimg(req,res,(err)=>{
        if(err){
            res.status(400).json({"messege" : "something wrong"});
        }
        let avatar =""; 

        console.log(req.file);
        console.log(req.file.filename);
        if(req.file){
            avatar = admin.avatar_path+"/"+req.file.filename;
        }
        if(password == cpassword){
            admin.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                cpassword : req.body.cpassword,
                avatar : avatar
            },(err,data)=> {
                if(err){
                    res.status(400).json({"messege" : "admin not insert"});
                }
                res.status(200).json({"data" : data, "messege" : "admin is insert"});
            });
        }else{
            res.status(400).json({"messege" : "password not match"});
        }
    });
}

module.exports.login = (req,res) => {
    admin.findOne({email : req.body.email},(err,data)=>{
        if(err){
            res.status(400).json({"messege" : "something wrong"});
        }
        if(!data || data.password != req.body.password){
            res.status(400).json({"messege" : "Email and Password are incorrected"});
        }
        const token = jwtData.sign(data.toJSON(),'admin',{expiresIn : 1000*60*60});
        res.status(200).json({"token" : token});
    });
}

module.exports.viewadmin = (req,res) => {
    admin.find({},(err,data)=>{
        if(err){
            res.status(400).json({"messege" : "datas not found"});
        }
        res.status(200).json({"admins" : data});
    });
};

module.exports.updatedata = (req,res) => {
    admin.uploadimg(req,res,(err)=>{
        if(err){
            res.status(400).json({"messege" : "something wrong"})
            return false;
        }
        let id = req.query.id;
        admin.findById(id,(err,data)=>{
            if(err){
                console.log("image not found");
                return false;
            }
            console.log(data.avatar);
            if(data.avatar){
                fs.unlinkSync(path.join(__dirname,'../',data.avatar));
            }
            let avatar = admin.avatar_path+"/"+req.file.filename;
            admin.findByIdAndUpdate(id,{
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                cpassword : req.body.cpassword,
                avatar : avatar
            },(err,data)=>{
                if(err){
                    res.status(400).json({"messege" : "data not update"});
                }
                res.status(200).json({"messege" : "data update sucessfuly"});
            });
        });
    });
}

module.exports.deletedata = (req,res) => {
    let id = req.query.id;
    admin.findById(id,(err,data)=>{
        if(err){
            res.status(400).json({"messege" : "data not delete"});
        }else{
            if(data){
                if(data.avatar){
                    fs.unlinkSync(path.join(__dirname,'../',data.avatar));
                }
                admin.findByIdAndDelete(id,(err,data)=>{
                    if(err){
                        res.status(400).json({"messege" : "data not delete"});
                        return false;
                    }
                    res.status(400).json({"messege" : "data successfully delete"});
                });
            }
        }
    });
}