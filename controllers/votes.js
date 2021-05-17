const Meme = require('../models/meme');



module.exports.voteUp = async (req, res) => {
    const { id } = req.params;
    try {
        const newMeme = await Meme.findById(id);
        newMeme.upVotes.push(req.user._id);
        newMeme.voteScore++;
        newMeme.save();
        res.status(200);
    } catch (e) {
        console.log('------------Error upvoting ------', e);
    }
}


module.exports.voteDown = async (req, res) => {

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
}