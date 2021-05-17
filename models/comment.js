const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});

module.exports = mongoose.model("Comment", commentSchema);



//termina de facut formu de trimis post request sa updatezi punctaju memeului. 

//apoi useru cand da refresh ,primeste punctele 