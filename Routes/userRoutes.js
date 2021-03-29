const express = require('express');
const upload = require('./multer');
const User = require('../Models/userModel');
const cloudinary = require('./cloudinary');
var fs = require('fs');
var bcrypt = require('bcryptjs');
const { jwtExpire, jwtSecret } = require('../config/keys');
const jwt = require('jsonwebtoken');
const cloudinaryCon = require('./cloudinaryConfig');
const {AuthenticatorJWT} = require('./authenticator');
const {isAdmin} = require('./authenticator');

const router  = express.Router();


router.get('/get', async (req, res) => {
    const findUsers = await User.find();
    if(findUsers) {
        res.status(200).json(findUsers);
    } else {
        res.status(404).json({errorMessage: 'No Users Found'});
    }
});
router.get('/get/:id', async (req, res) => {
    const findUser = await User.findOne({_id: req.params.id});
    if(findUser) {
        res.status(200).json(findUser);
    } else {
        res.status(404).json({errorMessage: 'No Users Found'});
    }
})
router.post('/signup', upload.single('file'), async(req, res) => {
    
    const ifEmailAlreadyPresent = await User.findOne({email: req.body.email});
    const ifUsernameAlreadyPresent = await User.findOne({username: req.body.username});
    if(ifEmailAlreadyPresent) {
        res.status(201).json({errorMessage: 'Email already exists. Please try another one.'});
    }
    else if(ifUsernameAlreadyPresent) {
        res.status(201).json({errorMessage: 'Username already exists. Please try another one.'});
    } else {
        
        if(req.body.password !== req.body.confirm){
            res.status(202).json({errorMessage: "The two passwords you entered don't match."})
        }
        const { path } = req.file;
        const uploader =  await cloudinary.uploads(path, 'UserImages');
        fs.unlinkSync(path);
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: hash,
        phone: req.body.prefix + req.body.phone,
        agreement: req.body.agreement,
        city: req.body.city,
        DOB: req.body.DOB,
        country: req.body.country,
        userPicture: uploader.url,
        cloudinary_id: uploader.id
    });

    const saveUser = await user.save();
    if(saveUser) {
        res.status(200).json({successMessage: 'Account created successfuly!. Please Sign in.'});
    } else {
        res.status(400).json({errorMessage: 'Account not created. Please try again'});
    }
  }
});

router.post('/login', upload.any(), async(req, res) => {
    const findUser = await User.findOne({
        $or:[{email: req.body.email},{username:req.body.email}]
    });

    if(findUser) {
        const checkPassword =  bcrypt.compareSync(req.body.password, findUser.password);
        if(checkPassword){
            const payload = {
                findUser: {
                    _id: findUser._id
                }
            }
            jwt.sign(payload, jwtSecret, {expiresIn: jwtExpire}, (err, token) => {
                if(err)  res.status(400).json({errorMessage: 'Jwt Error'})
    
            const {_id, firstName, role, lastName, username, phone, email, userPicture} = findUser;
            res.status(200).json({
                _id,
                role,
                firstName, 
                lastName, 
                username, 
                phone, 
                email, 
                userPicture, 
                token,
                successMessage: 'Logged In Successfully'
            });
        });
        } else {
            res.status(201).json({errorMessage: 'Incorrect username or password.'})
        }

    } else {
        res.status(201).json({errorMessage: 'Incorrect username or password.'})
    }
    
   
   
});

router.post('/edit/:id', AuthenticatorJWT, isAdmin ,upload.single('file'), async(req, res) => {
    console.log(req.body.firstName);
    console.log(req.params.id);
    const findUser = await User.findOne({_id : req.params.id});
    if(req.file) {
        const imgUrl = findUser.cloudinary_id;
        const del =  cloudinaryCon.uploader.destroy(imgUrl);
        const { path } = req.file;
        const uploading =  await cloudinary.uploads(path, 'UserImages');
        uploader = uploading.url;
        cloudinary_id = uploading.id
        fs.unlinkSync(path);
    } 
    else if(req.body.image) {
         uploader = req.body.image;
         cloudinary_id = findUser.cloudinary_id;

    }
    if(findUser) {
        findUser.firstName = req.body.firstName,
        findUser.lastName = req.body.lastName,
        findUser.email = req.body.email,
        findUser.username = req.body.username,
        findUser.phone = req.body.phone,
        findUser.city = req.body.city,
        findUser.country = req.body.country,
        findUser.DOB = req.body.DOB,
        findUser.userPicture = uploader,
        findUser.cloudinary_id = cloudinary_id

        const saveUser = await findUser.save();
        if(saveUser) {
            res.status(200).json({successMessage: 'Product Updated Successfully'})
        } else (
            res.status(400).json({errorMessage: 'Product could not be Updated.'})
        )
    } else {
        res.status(404).json({errorMessage: 'Product not found.'})
    }
})

module.exports = router;