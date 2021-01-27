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


const opts = { toJSON: { virtuals: true } };

const memeSchema = new Schema({
    title: String,
    image: ImageSchema,
    description: String,
    //author
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    //comments
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
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