const { memeSchema, commentSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Meme = require('./models/meme');
const Comment = require('./models/comment');
const User = require('./models/user');


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
    const author = {
        id: req.params.id,
        username: req.params.username
    }
    const meme = await Meme.findById(id);

    if (!meme.author.id.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/memes/${id}`);
    }
    next();

}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);

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

module.exports.getTopComments = async () => {
    const foundMeme = await Meme.find().sort({ 'voteScore': -1 }).limit(10);

    return foundMeme;
}

module.exports.getLatestComments = async () => {
    const foundComments = await Comment.find().sort({ 'createdTime': -1 }).limit(10).populate('author');
    return foundComments;
}




module.exports.getAllPosts = async () => {
    return await Meme.find({}).populate({
        path: 'comments',
        populate: { path: 'author' }
    });
}

module.exports.getDate = () => {

    return Date.now();
}


module.exports.transformDate = (arg) => {
    let text = ""
    let time = arg / 1000;
    let seconds = time;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600) % 24;
    let days = Math.floor(time / 86400);


    if (days != 0) {
        text = days + ` Days ago`
    } else if (hours != 0) {
        text = hours + ` Hours ago`
    } else if (minutes != 0) {
        text = minutes + ` Minutes ago`
    } else if (seconds != 0) {
        text = Math.floor(seconds) + ' Seconds ago'
    }
    return text;
}

module.exports.getTopUsers = async () => {
    return User.find().sort({ 'reputationPoints': -1 }).limit(10);

}

module.exports.getReputationPoints = async (userId) => {
    const postToGetPointsFrom = await Meme.find({ 'author.id': userId });
    let totalPoints = 0;
    for (let post of postToGetPointsFrom) {
        totalPoints += post.voteScore;
    }
    return totalPoints;
}