const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});


//======virtual to make it look like a thumbnail
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});


const opts = { toJSON: { virtuals: true } };

const MemeSchema = new Schema({
    title: String,
    image: ImageSchema,
    description: String,
    //author

    //comments
});



//====remove associated comments

// memeSchema.post('findOneAndDelete', async function (doc) {
//     if (doc) {
//         await Comment.deleteMany({
//             _id: {
//                 $in: doc.reviews
//             }
//         })
//     }
// })



module.exports = mongoose.model('Meme', MemeSchema);