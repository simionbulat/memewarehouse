const Meme = require('../models/meme');
const { cloudinary } = require("../cloudinary");
const { getTopComments, getAllPosts, getDate, transformDate, getReputationPoints, getLatestComments, getTopUsers } = require('../middleware');
const meme = require('../models/meme');


//index ..show all memes on page
module.exports.index = async (req, res) => {
    const memes = await getAllPosts();
    const topCommentMemes = await getTopComments();
    const topUsers = await getTopUsers();
    let date = Date.now();
    const comments = await getLatestComments();



    for (let meme of memes) {
        meme.elapsedTime = transformDate(date - meme.createdDate);
    }
    res.render('memes/index', { memes, topCommentMemes, comments, topUsers });
}

//render view to create new meme page
module.exports.renderNewForm = (req, res) => {
    res.render('memes/new');
}


//actually create new page 
module.exports.createMemes = async (req, res) => {

    try {
        const author = {
            id: req.user.id,
            username: req.user.username
        }
        const newMeme = new Meme(req.body.meme);
        const { path, filename } = req.file;
        newMeme.image = { url: path, filename }
        newMeme.author = author;
        newMeme.upVotes = [];
        newMeme.downVotes = [];
        newMeme.voteScore = 0;
        newMeme.createdDate = getDate();

        await newMeme.save();

        req.flash("success", "Succesfully created a piece of history!");
        res.redirect(`/memes/${newMeme._id}`);

    }

    catch (e) {
        console.error(e);
    }




}
//show individual memes page 
module.exports.showMemes = async (req, res) => {
    const { id } = req.params;
    const newMeme = await Meme.findById(id).populate({
        path: 'comments',
        populate: { path: 'author' }
    })
    let date = Date.now();

    newMeme.elapsedTime = transformDate(date - newMeme.createdDate);


    if (!newMeme) {
        req.flash("error", "Cannot find that meme page");
        return res.redirect("/memes");
    }
    res.render("memes/show", { meme: newMeme });

}


//delete individual meme page
module.exports.deleteMemes = async (req, res) => {
    const { id } = req.params;

    const deletedMeme = await Meme.findByIdAndDelete(id);
    await cloudinary.uploader.destroy(deletedMeme.image.filename);
    req.flash("success", "Succesfully deleted meme");
    res.redirect("/memes");
}

