const express = require('express');
const router = express.Router();
const memes = require("../controllers/meme");
const multer = require('multer')

const catchAsync = require('../utils/catchAsync');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, isAuthor, validateMeme } = require("../middleware");

const { isSchema } = require('joi');





router.route('/')

    .get(catchAsync(memes.index))
    .post(isLoggedIn, validateMeme, upload.single('image'), catchAsync(memes.createMemes))


router.get('/new', isLoggedIn, memes.renderNewForm)

router.route('/:id')
    .get(catchAsync(memes.showMemes))
    //validateMeme as a middlwware to be implemented as well as isAuthor, isLoggedIn
    .delete(isLoggedIn, isAuthor, catchAsync(memes.deleteMemes));



module.exports = router;