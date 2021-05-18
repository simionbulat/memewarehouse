const express = require('express');
const { catchAsync } = require('../utils/catchAsync');
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");
const votes = require('../controllers/votes');
const Meme = require('../models/meme');

router.route("/vote-up")
    .put(isLoggedIn, votes.voteUp);

router.route("/vote-down")
    .put(isLoggedIn, votes.voteDown);

module.exports = router;


