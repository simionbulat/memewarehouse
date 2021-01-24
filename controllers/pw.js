
const async = require("async");
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const User = require('../models/user');


module.exports.getForgot = (req, res) => {
    res.render("passwordReset/forgot");
}

module.exports.postForgotPassword = (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            })
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists');
                    return res.redirect('passwordReset/forgot');
                }

                user.resetPasswordToken = token;
                user.restePasswordExpires = Date.now() + 3600000; //1hour

                user.save(function (err) {
                    done(err, token, user);
                });

            });

        },
        function (token, user, done) {
            const smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: 'basorocka@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            const mailOptions = {
                to: user.email,
                from: 'basorocka@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }

    ], function (err) {
        res.redirect("/memes")
    })
}