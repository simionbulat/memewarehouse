const express = require('express');
const { catchAsync } = require('../utils/catchAsync');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAuthor, validateMeme } = require("../middleware");
const votes = require('../controllers/votes');
const Meme = require('../models/meme');

router.route("/vote-up")
    .put(async (req, res) => {
        console.log("s a ajuns la upvote");
        const { id } = req.params;
        try {
            const newMeme = await Meme.findById(id);
            newMeme.upVotes.push(req.user._id);
            newMeme.voteScore++;
            await newMeme.save();
            res.status(200);
        } catch (e) {
            console.log('------------Error upvoting ------', e);
        }
    });

router.route("/vote-down")
    .put(async (req, res) => {
        console.log("s a ajuns la votedown");
        const { id } = req.params;
        try {
            const newMeme = await Meme.findById(id);
            newMeme.downVotes.push(req.user._id);
            newMeme.voteScore--;
            newMeme.save();
            res.status(200);
        } catch (e) {
            console.log('------------Error downvoting ------', e);
        }
    });

module.exports = router;


