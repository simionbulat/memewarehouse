const express = require('express');
const router = express.Router();
const memes = require("../controllers/meme");
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const catchAsync = require('../utils/catchAsync');
const { storage } = require('../cloudinary');
const upload = multer({ storage });



const Meme = require('../models/meme');
const { isSchema } = require('joi');





router.route('/')

    .get(catchAsync(memes.index))
    .post(upload.single('image'), catchAsync(memes.createMemes))


router.get('/new', memes.renderNewForm)

router.route('/:id')
    .get(catchAsync(memes.showMemes))
    //validateMeme as a middlwware to be implemented as well as isAuthor, isLoggedIn
    .delete(catchAsync(memes.deleteMemes));



module.exports = router;