const Meme = require('../models/meme');
const { cloudinary } = require("../cloudinary");


//index ..show all memes on page
module.exports.index = async (req, res) => {
    const memes = await Meme.find({});
    const topCommentMemes = await Meme.find({}).sort({ points: -1 }).limit(10);
    res.render('memes/index', { memes, topCommentMemes });
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
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: 'author' }
    })



    if (!newMeme) {
        req.flash("error", "Cannot find that ting done(meme)");
        return res.redirect("/memes");
    }
    console.log(newMeme);

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

