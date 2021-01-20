const express = require('express');
const router = express.Router({ mergeParams: true });

const comments = require('../controllers/comments');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', catchAsync(comments.createComment))

router.delete('/:commentId', catchAsync(comments.deleteComment))

module.exports = router;


