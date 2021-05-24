const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require("./comment")

const ImageSchema = new Schema({
    url: String,
    filename: String
});


//======virtual to make it look like a thumbnail
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});




const memeSchema = new Schema({
    title: String,
    image: ImageSchema,
    //author
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    voteScore: {
        type: Number,
        default: 0
    },
    upVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    //comments
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    createdDate: {
        type: Number,
    },
    elapsedTime: {
        type: String,
        default: ''
    }
});



//====remove associated comments

memeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})



module.exports = mongoose.model('Meme', memeSchema);