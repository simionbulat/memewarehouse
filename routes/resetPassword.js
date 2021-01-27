const express = require("express");
const router = express.Router();
const pw = require('../controllers/pw')

router.route("/forgot")
    .get(pw.getForgot)
    .post(pw.postForgotPassword);

router.route("/reset/:token")
    .get(pw.getResetToken)
    .post(pw.postResetToken);


module.exports = router;