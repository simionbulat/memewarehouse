const Meme = require('../models/meme');
const Comment = require('../models/comment');

module.exports.createComment = async (req, res) => {
    const { id } = req.params;
    const meme = await Meme.findById(id);
    const comment = new Comment(req.body.comment);

    meme.comments.push(comment);
    await comment.save();
    await meme.save();
    req.flash('success', 'Created new comment!');
    res.redirect(`/memes/${meme._id}`);
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    await Meme.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Successfully deleted comment')
    res.redirect(`/memes/${id}`);
}
