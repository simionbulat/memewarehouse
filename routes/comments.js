const express = require('express');
const router = express.Router({ mergeParams: true });

const comments = require('../controllers/comments');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isCommentAuthor, validateComment } = require("../middleware");

router.post('/', isLoggedIn, validateComment, catchAsync(comments.createComment))

router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment))

module.exports = router;


