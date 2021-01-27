const User = require('../models/user');
const Meme = require('../models/meme');

module.exports.renderRegister = (req, res) => {
    res.render("users/register")
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to your meme warehouse");
            res.redirect("/memes");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login")
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || '/memes';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}


module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Goodbye");
    res.redirect("/memes");
}

module.exports.showUser = function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            req.flash("error", "Something went wrong.");
            res.redirect("/");
        }
        const foundMeme = Meme.find().where('author.id').equals(foundUser._id).exec(function (err, memes) {
            if (err) {
                req.flash("error", "Something went wrong.");
                res.redirect("/");
            }
            res.render("users/user", { user: foundUser, memes: memes });

        }
        )

    })
}




