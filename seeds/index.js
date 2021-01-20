const mongoose = require("mongoose");
const Meme = require("../models/meme");

mongoose.connect('mongodb://localhost:27017/warehouse', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    //delete all memes.
    const meme = await Meme.deleteMany({});

    for (let i = 0; i < 10; i++) {
        const newMeme = new Meme({
            title: "Meme Test",
            description: "Aici este descriptionu pt meme",
            image:
            {
                url: "https://res.cloudinary.com/decb6hftv/image/upload/v1610997692/MemeWarehouse/zobfjftxuj6wcwufgmvd.jpg",
                filename: 'MemeWarehouse/zobfjftxuj6wcwufgmvd'
            }
        })
        await newMeme.save();
    }




}



seedDB().then(() => {
    mongoose.connection.close();
})