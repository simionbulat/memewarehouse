const { memeSchema, commentSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Meme = require('./models/meme');
const Comment = require('./models/comment');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateMeme = (req, res, next) => {
    const { error } = memeSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const errorMsg = error.details.map(el => el.message).join(',')
        throw new ExpressError(errorMsg, 400)
    } else {
        next();
    }
}




module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const meme = await Meme.findById(id);
    if (!meme.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/memes/${id}`);
    }
    next();

}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/memes/${id}`);
    }
    next();
}

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(el => el.message).join(',')
        throw new ExpressError(errorMsg, 400)
    } else {
        next()
    }
}