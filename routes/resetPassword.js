const express = require("express");
const router = express.Router();
const pw = require('../controllers/pw')

router.route("/forgot")
    .get(pw.getForgot)
    .post(pw.postForgotPassword);


module.exports = router;