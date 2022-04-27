const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers');
const Game = require('../model/game.model');
const mongooseEnpoint = 'mongodb://127.0.0.1:27017/yelpgames_app';

mongoose.connect(mongooseEnpoint, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Game.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const game = new Game({
            //YOUR USER ID
            // author: '5f5c330c2cd79d538f2c66d9',
            title: `${sample(places)}`,
            description: `${sample(descriptors)}`,
            price,
            
        })
        await game.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})