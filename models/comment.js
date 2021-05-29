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
    createdTime: {
        type: 'Number'
    },
    postedOn: {
        type: Schema.Types.ObjectId,
        ref: 'Meme'
    }
});

module.exports = mongoose.model("Comment", commentSchema);



