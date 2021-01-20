const Meme = require('../models/meme');
const { cloudinary } = require("../cloudinary");


//index ..show all memes on page
module.exports.index = async (req, res) => {
    const memes = await Meme.find({});
    res.render('memes/index', { memes });
}

//render view to create new meme page
module.exports.renderNewForm = (req, res) => {
    res.render('memes/new');
}


//actually create new page 
module.exports.createMemes = async (req, res) => {

    try {
        const newMeme = new Meme(req.body.meme);
        const { path, filename } = req.file;
        newMeme.image = { url: path, filename }
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
    const newMeme = await Meme.findById(id).populate("comments");
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
    console.log("deleted meme is", deletedMeme)
    req.flash("success", "Succesfully deleted meme");
    res.redirect("/memes");
}

