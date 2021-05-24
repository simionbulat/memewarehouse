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

    // for (let meme of foundMeme) {
    //     console.log(meme.voteScore);
    // }

    return foundMeme;
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

module.exports.getPostAge = (time) => {
    console.log('s-a ajuns aici', time);
    return time;
    // var reminderTime = new Date(this.getDate() - time);
    // var hours = reminderTime.getHours();
    // var days = hours % 24;
    // return { hours, days };
}

module.exports.transformDate = (arg) => {
    let text = ""
    let time = arg / 1000;
    let seconds = time;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600) % 24;
    let days = Math.floor(time / 86400);
    console.log("seconds ", seconds);
    console.log("minutes ", minutes);
    console.log("hours ", hours);
    console.log("days ", days);

    if (days != 0) {
        text = days + ` Days ago`
    } else if (hours != 0) {
        text = hours` Hours ago`
    } else if (minutes != 0) {
        text = minutes + ` Minutes ago`
    } else if (seconds != 0) {
        text = seconds + ' Seconds ago'
    }
    return text;
}