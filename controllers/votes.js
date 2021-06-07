const Meme = require('../models/meme');
const User = require('../models/user');




module.exports.voteUp = async (req, res) => {
    const { id } = req.params;
    try {
        const newMeme = await Meme.findById(id);
        const user = await User.findById(newMeme.author.id);
        newMeme.upVotes.push(req.user._id);
        newMeme.voteScore++;
        user.reputationPoints++;

        try {
            await user.save();
        } catch (e) {
            console.log('Error saving the user after voteUp', e);
        }

        await newMeme.save();
        res.status(200);
    } catch (e) {
        console.log('------------Error upvoting ------', e);
    }
}


module.exports.voteDown = async (req, res) => {
    const { id } = req.params;
    try {
        const newMeme = await Meme.findById(id);
        const user = await User.findById(newMeme.author.id);
        newMeme.downVotes.push(req.user._id);
        newMeme.voteScore--;
        user.reputationPoints--;

        try {
            await user.save();
        } catch (e) {
            console.log('Error saving the user after voteDown', e);
        }

        await newMeme.save();
        res.status(200);

    } catch (e) {
        console.log('------------Error downvoting ------', e);
    }
}